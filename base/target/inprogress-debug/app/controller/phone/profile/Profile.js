Ext.define('Personify.controller.phone.profile.Profile', {
	extend : 'Personify.base.Controller',

	requires : ['Personify.view.phone.directory.contactinfo.ContactInfoEditForm', 'Personify.view.phone.profile.ProfileManagement'],

	control : {
           profileNavigationView : {},
		profileManagementPanel : {
			listeners : {
				back : 'onBack',
				requestchangeview : 'onRequestChangeView',
				loggedout : 'onLoggedOut',
				editViewInBackground : 'onEditViewInBackground',
				loadEditView : 'onLoadEditView',
			}
		}
	},

	onLoadData : function() {
		console.log(new Date().getTime() + ' Profile.onLoadData');
		this.getProfileManagementPanel().getController().onGetData();
	},

	onBack : function() {
		var me = this;
		var thisView = me.getView();
		thisView.fireEvent('back', this);
	},

	onRequestChangeView : function(view, config) {
		this.openView(view, config);
	},

	openView : function(view, config, title, css) {
		if ( typeof view == 'string') {
			view = Ext.create(view, config);
		}
		view.addListener('back', this.onBackProfile, this);
		view.addListener('backtomain', this.onBackProfile, this);
		view.addListener('requestchangeview', this.onRequestChangeView, this);
		view.addListener('loggedout', this.onLoggedOut, this);

		if (config && config.record) {
			var listeners = config.record.get('listeners');

			if (listeners) {
				for (var event in listeners) {
					this.getView().addListener(event, listeners[event], view);
				}
			}
		}

		var profileNavigationView = this.getProfileNavigationView();
		if (profileNavigationView.getActiveItem().xtype != view.xtype) {
			profileNavigationView.push(view);
		}
	},
	onLoadEditView : function(view) {
		this.launchEditView(view);
	},
	launchEditView : function(view) {
		var profileNavigationView = this.getProfileNavigationView();
		if (view != null) {
			if (profileNavigationView.getActiveItem().xtype != view.xtype) {
				profileNavigationView.push(view);
			}
		}
	},

	onEditViewInBackground : function(view, config) {
		if ( typeof view == 'string') {
			view = Ext.create(view, config);
		}
		Ext.Viewport.setMasked(false);
		view.addListener('back', this.onBackProfile, this);
		view.addListener('backtomain', this.onBackProfile, this);
		view.addListener('requestchangeview', this.onRequestChangeView, this);
		view.addListener('loggedout', this.onLoggedOut, this);

		if (config && config.record) {
			var listeners = config.record.get('listeners');

			if (listeners) {
				for (var event in listeners) {
					this.getView().addListener(event, listeners[event], view);
				}
			}
		}

		this.getProfileManagementPanel().getController().setBackgroundEditView(view);

	},
	onBackProfile : function(arg1, newInfoObject) {
		var me = this, profileNavigationView = me.getProfileNavigationView();
		profileNavigationView.pop();
		this.getProfileManagementPanel().getController().refreshRecordAfterEditing( newInfoObject ? newInfoObject : null);
	},

	onLoggedOut : function() {
		this.getView().fireEvent('loggedout');
	}
});

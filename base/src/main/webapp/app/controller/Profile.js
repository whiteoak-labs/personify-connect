Ext.define('Personify.controller.Profile', {
	extend : 'Personify.base.Controller',
	inject : ['countryListStore', 'currentUser'],

	requires : ['Personify.view.profile.ContactInfo', 'Personify.view.profile.PurchaseHistory', 'Personify.view.profile.ParticipationHistory', 'Personify.view.profile.Logout', 'Personify.store.base.profile.ProfileDisplayOption', 'Personify.view.profile.ConnectTwitter', 'Personify.view.profile.ConnectedTwitter', 'Personify.utils.storemanager.StoreOfflineManager'],

	config : {
		countryListStore : null,
		currentRecord : null,
		currentUser : null
	},

	control : {
		displayOptionPanel : {
			tapOnDisplayOptionItem : 'onTapOnDisplayOptionItem'
		},

		contactInfoPanel : {
			changeview : 'onChangeView'
		},

		contactInfoManagement : {
			live : true,
			listeners : {
				'updateContactFail' : 'onUpdateContactFail',
				'editRecord' : 'onEditRecord',
				'updatedContact' : 'onUpdatedContact'
			}
		},

		view : {
			painted : 'onPainted'
		},

		optionList : {}
	},

	init : function() {
		if (navigator.onLine && window.plugins.app47) {
			window.plugins.app47.sendGenericEvent('My Profile');
		}
		var me = this;
		this.getCountryList(function() {
			var contactInfo = me.getContactInfoManagement();
			contactInfo.getController().updateEnableEditToolBox(true);
			contactInfo.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'));
			contactInfo.setCanedit(true);
		});
	},

	onTapOnDisplayOptionItem : function(record) {
		if (!Personify.utils.PhoneGapHelper.checkConnection()) {
			Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
			return;
		}
		var view = record.get('view');
		nameView = record.get('name');

		if (nameView == 'Change Password') {
			Ext.Msg.alert("Personify", "Please contact your association representative for assistance in changing your password", Ext.emptyFn());
			return;
		}

		if (nameView == 'Connect Twitter') {
			if (TMA.Twitter.isAuthorized()) {
				view = 'Personify.view.profile.ConnectedTwitter';
			}
		}

		if (view && view != '') {
			this.getContactInfoPanel().removeAll(true, true);
			var subView = Ext.create(view);
			if (nameView == 'Contact Information') {
				subView.getController().updateEnableEditToolBox(true);
				var dataCountryList = this.getCountryListStore();
				subView.setCountryListStore(dataCountryList);
				subView.getController().setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'));
				if (this.getView().getStore()) {
					var currentRecord = this.getCurrentRecord();
					if (currentRecord) {
						subView.setRecord(currentRecord);
					} else {
						subView.setRecord(this.getView().getStore().getAt(0));
					}
				}
               else
               {
                   this.getData();
               }
			} else {
				if (nameView != 'Connect Twitter')
					subView.getController().loadContactData(Personify.utils.Configuration.getCurrentUser());
				//this.getContactInfoPanel().setStyle('margin-top: 45px;');
			}

			this.getContactInfoPanel().animateActiveItem(subView, {
				type : 'slide',
				direction : 'left'
			});
		}
	},

	onPainted : function() {
	},

	getData : function(online) {
		var me = this, profileView = me.getView(), contactInfoView = me.getContactInfoManagement(), offlineStoreManager = Ext.create('Personify.utils.storemanager.StoreOfflineManager'), offlineProfileStore = Ext.create(offlineStoreManager.getProfileStore()), currentUser = Personify.utils.Configuration.getCurrentUser(), profileDisplayOptionStore = currentUser.getProfileDisplayOptionStore(), optionList = me.getOptionList();

		/*
		 * set data for display option
		 */

		optionList.setStore(profileDisplayOptionStore);

		var isStaff = currentUser.isStaffMember(), attributes = {
			"MasterCustomerId" : currentUser.get('masterCustomerId'),
			"SubCustomerId" : currentUser.get('subCustomerId'),
			"ReqMasterCustomerId" : currentUser.get('masterCustomerId'),
			"ReqSubCustomerId" : currentUser.get('subCustomerId'),
			"IsStaff" : isStaff,
			"RecordType" : ""
		};

		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		offlineProfileStore.setDataRequest(attributes);
		offlineProfileStore.on('load', function(store, records) {
			if (store.getCount() == 0 || online) {
				var storeManager = Personify.utils.ServiceManager.getStoreManager(), profileStore = Ext.create(storeManager.getProfileStore());
				/*
				 * set data for contactinfo
				 */
				if (profileStore.getCount() == 0) {
					profileStore.setDataRequest(attributes);
					Ext.Viewport.setMasked({
						xtype : 'loadmask'
					});
					profileStore.on('load', function(store, records) {
						if (store.getCount()) {
							var record = store.first();
							contactInfoView.setRecord(record);

							if (record.EntryProfile.getCount()) {
								me.getDisplayOptionPanel().getController().setRecord(record.EntryProfile.first());
							} else {
								me.getDisplayOptionPanel().getController().setRecord(null);
							}
						} else {
							me.getDisplayOptionPanel().getController().setRecord(null);
						}

						profileView.setStore(store);
						me.setSelectDisplayOption(0);
                        Ext.Viewport.setMasked(false);
					});

					profileStore.load();
				} else {
					me.setSelectDisplayOption(0);
					contactInfoView.setRecord(profileStore.getAt(0));
				}
			} else {
				var record = store.first();
				contactInfoView.setRecord(record);

				if (record.EntryProfile.getCount()) {
					me.getDisplayOptionPanel().getController().setRecord(record.EntryProfile.first());
				} else {
					me.getDisplayOptionPanel().getController().setRecord(null);
				}
				profileView.setStore(store);
				me.setSelectDisplayOption(0);

				Ext.Viewport.setMasked(false);
			}
		});
		offlineProfileStore.load();
	},

	setSelectDisplayOption : function(index) {
		var me = this, optionList = me.getOptionList();

		optionList.select(index);
	},

	onUpdateContactFail : function() {
		this.getData();
	},

	onEditRecord : function() {
		if (navigator.onLine && window.plugins.app47) {
			window.plugins.app47.sendGenericEvent('Profile Edit');
		}
	},

	getCountryList : function(callback) {
		var me = this;

		if (me.getView() && !me.getView().isDestroyed) {
			if (this.getCountryListStore().getCount() > 0) {
				me.getContactInfoManagement().setCountryListStore(this.getCountryListStore());
				Ext.Viewport.setMasked(false);
				me.getData();
				if ( typeof callback == 'function') {

					callback();
				}
			} else {
				Personify.utils.Configuration.loadCountryList().then({
					success : function(countryStore) {
						me.getContactInfoManagement().setCountryListStore(countryStore);
						Ext.Viewport.setMasked(false);
						me.getData();
						if ( typeof callback == 'function') {
							callback();
						}
					},
					failure : function() {
						Ext.Viewport.setMasked(false);
					}
				});
			}
		}
	},

	onUpdatedContact : function(record) {
           this.getData();
           this.setCurrentRecord(record);
	},

	onChangeView : function(view) {
		if (view && view != '') {
			this.getContactInfoPanel().removeAll(true, true);
			var subView = Ext.create(view);

			this.getContactInfoPanel().animateActiveItem(subView, {
				type : 'slide',
				direction : 'left'
			});
		}
	}
});

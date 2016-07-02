Ext.define('Personify.controller.phone.profile.ProfileManagement', {
	extend : 'Personify.controller.Profile',
	inject : ['countryListStore'],

	requires : ['Personify.view.phone.directory.contactinfo.ContactInfoEditForm', 'Personify.view.phone.profile.Logout', 'Personify.view.phone.profile.ProfileSetting', 'Personify.utils.storemanager.StoreOfflineManager'],

	control : {
		profileToolbar : {
			onNavigationButtonTap : 'onBack',
			actionButtonTap : 'onEditButtonTap'
		},
		contactinfo : {

		},
		viewMySettingButton : {
			tap : 'onViewMySettingButtonTap'
		},
		logOutButton : {
			tap : 'onLogOutButtonTap'
		}
	},

	config : {
		countryListStore : null,
		currentRecord : null,
		displayOptionPanelRecord : null,
		loadedOneData : null,
		backgroundEditView : null,
	},

	init : function() {
		console.log(new Date().getTime() + " Profile View Start");
		if (window.plugins.app47) {
			window.plugins.app47.sendGenericEvent('My Profile');
		}
		this.getDataCountryList();
		var me = this, contactInfo = me.getContactinfo();
		contactInfo.getController().showListInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo'));
	},

	onGetData : function() {
		this.getData();
	},

	getDataCountryList : function() {
		var me = this;
		if (me.getView() && !me.getView().isDestroyed) {
			Ext.Viewport.setMasked({
				xtype : 'loadmask'
			});
			if (me.getCountryListStore().getCount() > 0) {
				var loadedOtherData = me.getLoadedOneData();
				if (loadedOtherData == null) {
					me.setLoadedOneData(1);
				} else {
					Ext.Viewport.setMasked(false);
				}
			} else {
				me.loadContryList(function() {
					var loadedOtherData = me.getLoadedOneData();
					if (loadedOtherData == null) {
						me.setLoadedOneData(1);
					} else {
						Ext.Viewport.setMasked(false);
					}
				});
			}
		}
	},

	loadContryList : function(callback) {
		var me = this;
		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var countryStoreName = storeManager.getCountryStore();
		var store = Ext.create(countryStoreName);
		var countryList = new Array();
		store.load({
			callback : function(records, operation, success) {
				var profileTypeStore = storeManager.getProfileTypeStore();
				var storeProfileType = Ext.create(profileTypeStore);
				for (var i = 0; i < records.length; i++) {
					var country = records[i];
					if ((country.get('countryCode') !== 'ALL') && (country.get('countryCode') !== '[ALL]')) {
						countryList.push({
							text : country.get('countryDescription'),
							value : country.get('countryCode')
						});
					}
				}
				storeProfileType.setData(countryList);
				storeProfileType.sort('text', 'ASC');
				me.setCountryListStore(storeProfileType);
				if ( typeof callback == 'function') {
					callback();
				}
				Deft.Injector.configure({
					countryListStore : {
						value : storeProfileType
					}
				});
			}
		});
	},

	getData : function(callback, fromOnline) {
		var me = this, profileView = me.getView(), contactInfoView = me.getContactinfo(), offlineStoreManager = Ext.create('Personify.utils.storemanager.StoreOfflineManager'), offlineProfileStore = Ext.create(offlineStoreManager.getProfileStore()), currentUser = Personify.utils.Configuration.getCurrentUser();

		var isStaff = currentUser.isStaffMember(), attributes = {
			"MasterCustomerId" : currentUser.get('masterCustomerId'),
			"SubCustomerId" : currentUser.get('subCustomerId'),
			"ReqMasterCustomerId" : currentUser.get('masterCustomerId'),
			"ReqSubCustomerId" : currentUser.get('subCustomerId'),
			"IsStaff" : isStaff,
			"RecordType" : ""
		};

		offlineProfileStore.setDataRequest(attributes);
		offlineProfileStore.on('load', function(store, records) {
			if (store.getCount() == 0 || fromOnline) {
				var storeManager = Personify.utils.ServiceManager.getStoreManager(), profileStore = Ext.create(storeManager.getProfileStore()), profileDisplayOptionStore = currentUser.getProfileDisplayOptionStore();
				profileStore.setDataRequest(attributes);
				profileStore.on('load', function(store, records) {
					if (store.getCount()) {
						var record = store.first();
						me.getView().on('painted', Ext.callback(function() {
							me.getView().fireEvent('editViewInBackground', 'Personify.view.phone.directory.contactinfo.ContactInfoEditForm', {
								record : record,
								countryListStore : me.getCountryListStore(),
								listOfInfo : Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo')
							});
						}, me, [], 1000));

						contactInfoView.setRecord(record);
						if (record.EntryProfile.getCount()) {
							me.setDisplayOptionPanelRecord(record.EntryProfile.first());
						} else {
							me.setDisplayOptionPanelRecord(null);
						}
					} else {
						me.setDisplayOptionPanelRecord(null);
					}
					profileView.setStore(profileStore);
					var loadedOtherData = me.getLoadedOneData();
					if (loadedOtherData == null) {
						me.setLoadedOneData(1);
					} else {
						Ext.Viewport.setMasked(false);
					}
					if (callback) {
						callback();
					}
				});
				profileStore.load();
			} else {
				if (store.getCount()) {
					var record = store.first();
					me.getView().on('painted', Ext.callback(function() {
						me.getView().fireEvent('editViewInBackground', 'Personify.view.phone.directory.contactinfo.ContactInfoEditForm', {
							record : record,
							countryListStore : me.getCountryListStore(),
							listOfInfo : Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo')
						});
					}, me, [], 1000));

					contactInfoView.setRecord(record);
					if (record.EntryProfile.getCount()) {
						me.setDisplayOptionPanelRecord(record.EntryProfile.first());
					} else {
						me.setDisplayOptionPanelRecord(null);
					}
				} else {
					me.setDisplayOptionPanelRecord(null);
				}

				profileView.setStore(offlineProfileStore);
				var loadedOtherData = me.getLoadedOneData();
				if (loadedOtherData == null) {
					me.setLoadedOneData(1);
				} else {
					Ext.Viewport.setMasked(false);
				}
				if (callback) {
					callback();
				}
			}
		});

		offlineProfileStore.load();

	},

	onBack : function() {
		var me = this;
		var thisView = me.getView();
		thisView.fireEvent('back', this, null);
	},

	onEditButtonTap : function() {
		var me = this;
       Ext.Viewport.setMasked({
                              xtype : 'loadmask'
                              });
		if (me.getBackgroundEditView() == null) {

			Ext.callback(function() {
				var record = me.getContactinfo().getRecord();
				me.getView().fireEvent('requestchangeview', 'Personify.view.phone.directory.contactinfo.ContactInfoEditForm', {
					record : record,
					countryListStore : me.getCountryListStore(),
					listOfInfo : Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listInfo')
				});
				Ext.Viewport.setMasked(false);
			}, me, [], 0);
		} else {
			Ext.callback(function()
                         {
                         me.getView().fireEvent('loadEditView', me.getBackgroundEditView());
                         Ext.Viewport.setMasked(false);
                         }, me, [], 10);
		}
	},

	onViewMySettingButtonTap : function() {
		var me = this;
		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		/*this.getData(function() {
		 Ext.Viewport.setMasked(false);*/
		me.getView().fireEvent('requestchangeview', 'Personify.view.phone.profile.ProfileSetting', {
			record : me.getContactinfo().getRecord(),
			displayOptionPanelRecord : me.getDisplayOptionPanelRecord()
		});
		Ext.Viewport.setMasked(false);
		// }, false);
	},

	onLogOutButtonTap : function() {
		var view = Ext.Viewport.add({
			xtype : 'logoutphone',
			centered : true,
			modal : true,
			hideOnMaskTap : true
		});
		view.addListener('loggedout', this.onLoggedOut, this);
		view.show();
	},

	onLoggedOut : function() {
		this.getView().fireEvent('loggedout');
	},

	refreshRecordAfterEditing : function(onBackParams) {
		if (onBackParams) {
			if (onBackParams['updatedContact']) {
//				var record = onBackParams['updatedContact'];
//				this.getView().getStore().removeAt(0);
//				this.getView().getStore().add(record);
//				this.getContactinfo().setRecord(record);
               this.getData(false);
			} else {
				this.getData(true);
			}
		} else
			this.getData(false);
	},
});

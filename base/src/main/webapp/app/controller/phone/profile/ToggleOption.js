Ext.define('Personify.controller.phone.profile.ToggleOption', {
	extend : 'Personify.controller.profile.ToggleOption',

	control : {
		toggleDirectory : {
			change : 'onUpdateOption'
		},

		toggleMobileDirectory : {
			change : 'onUpdateOption'
		},
		view : {
			painted : 'onPainted'
		}
	},

	config : {
		record : null,
		flagUpdatingRecord : false,
		tempRecord : null,
		flagInitToggle : true
	},
	onPainted : function() {
		var me = this;
		if (me.getFlagInitToggle()) {
			window.setTimeout(function() {
				var newRecord = me.getTempRecord();
				var toggleDirectory = me.getToggleDirectory(), toggleMobileDirectory = me.getToggleMobileDirectory();

				if (newRecord) {
					me.setFlagUpdatingRecord(true);
					toggleDirectory.setValue(newRecord.get('includeInDirectory'));
					toggleMobileDirectory.setValue(newRecord.get('includeInMobileDirectory'));
					me.setFlagUpdatingRecord(false);
				} else {
					toggleDirectory.setValue(false);
					toggleMobileDirectory.setValue(false);
				}

				me.getView().setMasked(false);
				me.setFlagInitToggle(false);
			}, 500);
		}
	},
	init : function() {
		this.callParent(arguments);
	},

	updateRecord : function(newRecord) {
		if (this.getFlagInitToggle()) {
			this.setTempRecord(newRecord);
			return null;
		}

		var toggleDirectory = this.getToggleDirectory(), toggleMobileDirectory = this.getToggleMobileDirectory();

		if (newRecord) {
			this.setFlagUpdatingRecord(true);
			toggleDirectory.setValue(newRecord.get('includeInDirectory'));
			toggleMobileDirectory.setValue(newRecord.get('includeInMobileDirectory'));
			this.setFlagUpdatingRecord(false);
		} else {
			toggleDirectory.setValue(false);
			toggleMobileDirectory.setValue(false);
		}

		this.getView().setMasked(false);
	},

	onUpdateOption : function(toggle, slider, thumb, newValue, oldValue, eOpts) {
		if (!this.getFlagUpdatingRecord()) {
			var me = this, currentUser = Personify.utils.Configuration.getCurrentUser(), toggleDirectory = me.getToggleDirectory(), toggleMobileDirectory = me.getToggleMobileDirectory(), storeManager = Personify.utils.ServiceManager.getStoreManager(), customerStoreName = storeManager.getCustomerStore(), customerStore = Ext.create(customerStoreName), isDirectory = false, isMobileDirectory = false, isDirectoryValue = false, isMobileDirectoryValue = false;

			var params = {
				"Type" : this.getRecord().get('type') || 'I',
				"MasterCustomerId" : currentUser.get('masterCustomerId'),
				"SubCustomerId" : currentUser.get('subCustomerId'),
				"OrganizationId" : currentUser.get('organizationId'),
				"OrganizationUnitId" : currentUser.get('organizationUnitId'),
				"IncludeInDirectory" : (toggleDirectory.getValue() == 1),
				"IncludeInMobileDirectory" : (toggleMobileDirectory.getValue() == 1)
			};

			var storeManager = Personify.utils.ServiceManager.getStoreManager();
			var profileUpdatingStoreName = storeManager.getProfileUpdatingStore();
			var profileUpdatingStore = Ext.create(profileUpdatingStoreName, {
				dataRequest : params
			});

			var view = this.getView();
			view.setMasked({
				xtype : 'loadmask'
			});

			profileUpdatingStore.load({
				callback : function(records, operation, success) {
					if (success && records.length) {
						var profile = records[0];

						if (profile && profile.EntryProfile.getCount()) {
							view.setRecord(profile);
							me.setRecord(profile.EntryProfile.first());
						} else {
							toggle.setValue(oldValue);
						}
					} else {

					}

					view.setMasked(false);
				}
			});
		}
	}
});

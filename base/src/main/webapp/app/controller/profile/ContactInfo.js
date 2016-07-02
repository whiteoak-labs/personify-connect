Ext.define('Personify.controller.profile.ContactInfo', {
	extend : 'Personify.base.Controller',

	requires : ['Personify.utils.ItemUtil', 'Personify.utils.updateparams.Jsonp'],

	control : {
		infoPanelsContainer : true,
		closeContactPanel : {
			tap : 'onCloseInfoPanel'
		}
	},

	config : {
		mapping : {
			'photoAndRelated' : 'Personify.view.profile.contactinfo.PhotoAndRelated',
			'phone' : 'Personify.view.profile.contactinfo.Phone',
			'email' : 'Personify.view.profile.contactinfo.Email',
			'address' : 'Personify.view.profile.contactinfo.Address',
			'website' : 'Personify.view.profile.contactinfo.Website',
			'bio' : 'Personify.view.profile.contactinfo.Bio',
			'session' : 'Personify.view.profile.contactinfo.Session'
		},
		countryListStore : null,
		contactInfoRecord : null,
		errorMessage : "",
		screenHeight : 0
	},

	init : function() {

		this.setRecord(null);

		if (Ext.os.is.Android) {
			this.setScreenHeight(Ext.getBody().getHeight());
			Ext.Viewport.element.on('touchstart', this.onTouchStart, this);
		}

	},

	onTouchStart : function(event) {

		var height = this.getScreenHeight() - Ext.getBody().getHeight();
		this.getInfoPanelsContainer().setPadding('0 0 ' + height + ' 0');

	},

	destroy : function() {

		if (Ext.os.is.Android) {
			Ext.Viewport.element.un('touchstart', this.onTouchStart, this);
		}
		return this.callParent(arguments);
	},

	showListInfo : function(listInfo) {
		var me = this;
		if (me.getView() && listInfo && listInfo.length != 0) {
			var mapping = me.getMapping(), infoContainer = me.getInfoPanelsContainer();
			infoContainer.removeAll(true, true);
			for (var j = 0; j < listInfo.length; j++) {
				var view = mapping[listInfo[j]];
				if (view) {
					infoContainer.add(Ext.create(view));
				}
			}
			infoContainer.setHidden(false);

			var listInfoPanels2 = this.getInfoPanelsContainer().getItems().items;
			if (this.getContactInfoRecord() != null && (listInfoPanels2 != null) && (listInfoPanels2.length != 0)) {
				this.setRecord(this.getContactInfoRecord());
				this.setContactInfoRecord(null);
			}
		}
	},

	setRecord : function(record) {
		if (record) {

			var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
			if ((listInfoPanels != null) && (listInfoPanels.length > 0)) {
				for (var i = 0; i < listInfoPanels.length; i++) {

					listInfoPanels[i].setRecord(record);
				}
			} else {
				this.setContactInfoRecord(record);
			}
		}

	},

	setPresenterRecord : function(presenter) {

		if (presenter) {
			var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
			if ((listInfoPanels != null) && (listInfoPanels.length != 0)) {
				for (var i = 0; i < listInfoPanels.length; i++) {
					listInfoPanels[i].getController().setPresenterRecord(presenter);
				}
			}
		}

	},

	saveData : function() {

		if (this.validateData() == false) {
			return;
		}
		var entry = this.getView().getRecord().EntryProfile.getAt(0);
		Personify.utils.Configuration.setCurrentProfileUser(entry);
		var params = {
			"InternalKey" : entry.get('internalKey'),
			"NavigationKey" : entry.get('navigationKey'),
			"Credentials" : entry.get('credentials'),
			"Type" : entry.get('type'),
			"Id" : entry.get('entryId'),
			"MasterCustomerId" : entry.get('masterCustomerId'),
			"SubCustomerId" : entry.get('subCustomerId'),
			"EncrMasterCustomerId" : entry.get('encrMasterCustomerId'),
			"EncrSubCustomerId" : entry.get('encrSubCustomerId'),
			"DisplayName" : entry.get('displayName'),
			"OrganizationId" : entry.get('organizationId'),
			"OrganizationUnitId" : entry.get('organizationUnitId'),
			"PreferredCurrency" : entry.get('preferredCurrency'),
			"JobTitle" : entry.get('jobTitle'),
			"CCType" : entry.get('ccType'),
			"CCNumber" : entry.get('ccNumber'),
			"ModOper" : entry.get('modOper'),

			"Urls" : new Array(), //urls,
			"PhoneNumbers" : new Array(), //phoneNumbers,
			"Organization" : new Array(), //organizations,
			"Photos" : new Array(), //photos,
			"CompanyContact" : new Array(), //companyContacts,
			"Name" : new Array(), //names,
			"Emails" : new Array(), //emails,
			"Roles" : new Array(), //roles,
			"Addresses" : new Array(), //addresses,
			"Entry" : null
		};

		params.Name.push({
			"InternalKey" : null,
			"NavigationKey" : null,
			"Formatted" : "",
			"FamilyName" : "",
			"GivenName" : "",
			"MiddleName" : "",
			"HonorificPrefix" : "",
			"HonorificSuffix" : "",
			"ProfileName" : "",
			"Name" : null
		});

		var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
		if ((listInfoPanels != null) && (listInfoPanels.length != 0)) {
			for (var i = 0; i < listInfoPanels.length; i++) {
				listInfoPanels[i].getController().updateParams(params);
			}
		}

		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var profileUpdatingStoreName = storeManager.getProfileUpdatingStore();
		var profileUpdatingStore = Ext.create(profileUpdatingStoreName, {
			dataRequest : params
		});

		var view = this.getView();
		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		var me = this;

		profileUpdatingStore.getProxy().addListener('exception', function(proxy, response) {
			if (!response) {
				return;
			}

			var errorObj = JSON.parse(response.responseText);
			var message = errorObj.error.message.value;

			if (message.length > 200) {
				message = message.substr(0, 200) + "...";
			}

			var arrayValue = message.split(':');

			if (arrayValue.length > 1) {
				message = arrayValue[1].trim();

				if (arrayValue.length > 2) {
					var contentMessage = arrayValue[2].split('.');
					for (var i = 0; i < contentMessage.length; i++) {
						message += '<br />' + contentMessage[i].trim();
					}
				}
			}

			me.setErrorMessage(message);
		});

		profileUpdatingStore.load({
			callback : function(records, operation, success) {
				if (success && records.length) {
					var profile = records[0];
					view.setRecord(profile);
					var updatedContact = profile;
					//use this to store updated contact object
					view.fireEvent('updatedContact', updatedContact);
				} else {
					Ext.Msg.alert('', me.getErrorMessage());
					view.fireEvent('updateContactFail');
				}

				Personify.utils.Configuration.setCurrentProfileUser(null);
				Ext.Viewport.setMasked(false);
			}
		});

		return true;
	},

	updateEditmode : function(newValue, oldValue) {

		if (this.getView()) {

			var listInfoPanels = this.getInfoPanelsContainer().getItems().items;

			if ((listInfoPanels != null) && (listInfoPanels.length != 0)) {

				for (var i = 0; i < listInfoPanels.length; i++) {
					listInfoPanels[i].getController().updateEditMode(newValue, this.getCountryListStore());
				}
			}
		}

	},

	validateData : function() {

		var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
		var validateResults = new Array();
		var tmp = new Array();

		if ((listInfoPanels != null) && (listInfoPanels.length != 0)) {
			for (var i = 0; i < listInfoPanels.length; i++) {
				tmp = listInfoPanels[i].getController().validateData();
				if (tmp && tmp.length != 0) {
					validateResults = validateResults.concat(tmp);
				}
			}
		}

		if (validateResults.length != 0) {
			var error = validateResults.join('');
			Ext.Msg.alert('Errors', error);
			return false;
		} else {
			return true;
		}

	},

	setBioInfo : function(record) {

		var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
		if ((listInfoPanels != null) && (listInfoPanels.length != 0)) {
			for (var i = 0; i < listInfoPanels.length; i++) {
				listInfoPanels[i].getController().setBioInfo(record);
			}
		}

	},

	onCloseInfoPanel : function() {

		var me = this;
		Ext.callback(function() {
			me.getView().fireEvent('closeinfopanel');
		}, me, [], 1);

	}
}); 
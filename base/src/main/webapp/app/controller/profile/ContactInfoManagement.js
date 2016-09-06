Ext.define('Personify.controller.profile.ContactInfoManagement', {
    extend: 'Personify.base.Controller',

    inject: [
        'currentUser'
    ],
    control: {
        editToolBox: {
        },

        editRecordButton : {
            tap : 'onTapEditRecordButton'
        },

        cancelEditButton: {
            tap: 'onTapCancelEditButton'
        },

        doneEditButton: {
            tap: 'onTapDoneEditButton'
        },

        contactinfo: {
            'updatedContact': 'onUpdatedContact',
            'updateContactFail' : 'onUpdateContactFail',
            'closeinfopanel': 'onCloseInfoPanel'
        },

        addToMyProfileButton: {
            live: true,
            listeners: {
                tap: 'onAddToMyProfileButtonTap'
            }
        }
    },

    config: {
        recordProfile: null,
        currentUser: null,
        countryListStore: null
    },

    setListOfInfo: function(listOfInfo) {
        this.getContactinfo().setListOfInfo(listOfInfo);
    },

    addButtonAddToMyAddressBook: function(value) {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Add To Address Book');
        }
        if(value == true) {
            this.getView().add(Ext.create('Ext.Button', {
                //docked: 'bottom',
                itemId: 'addToMyProfileButton',
                xtype: 'button',
                text: 'Add to my address book',
                cls: 'p-button-big',
                disabledCls: 'p-button-big-disabled',
                hidden: false
            }));
        }
    },

    //handler event for button edit record
    onTapEditRecordButton : function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        this.getView().fireEvent('editRecord');
        this.getView().fireEvent('hideStaffFunction');

        this.getContactinfo().setEditmode(true);

        if (this.getAddToMyProfileButton()) {
            this.getAddToMyProfileButton().hide();
        }
           
       Personify.utils.BackHandler.pushActionAndTarget('onTapCancelEditButton', this);
    },

    onTapDoneEditButton: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
           
       Personify.utils.BackHandler.popActionAndTarget('onTapCancelEditButton', this);
           
        //call contact info to save all data
        this.getView().fireEvent('showStaffFunction');

        if (this.getAddToMyProfileButton()) {
            this.getAddToMyProfileButton().show();
        }

        if (this.getContactinfo().getController().saveData()) {
            this.getEditToolBox().getController().reset();
        }
    },

    onTapCancelEditButton: function() {
       Personify.utils.BackHandler.popActionAndTarget('onTapCancelEditButton', this);
           
        this.getContactinfo().setEditmode(false);
        this.getEditToolBox().getController().reset();
        this.getView().fireEvent('showStaffFunction');

        if (this.getAddToMyProfileButton()) {
            this.getAddToMyProfileButton().show();
        }
    },

    setRecord: function(record, notLoadCountry) {
        var isloadDataCountry = notLoadCountry ? false : true;
//        if(isloadDataCountry) {
//            this.getDataCountryList();
//        }
        var view = this.getView();
        var me = this;
        if(view && view.destroy != Ext.emptyFn) {
            this.setCanedit(false);
            if(record) {
                if(isloadDataCountry){
                    this.setRecordProfile(record);
                    var dataCountryList = view.getCountryListStore();

                    this.getContactinfo().setRecord(record);
                    this.getContactinfo().getController().setCountryListStore(dataCountryList);

                    if (!this.getCurrentUser().isStaffMember()) {
                        if(!this.getCurrentUser().isStaffMember()) {
                            this.updateEnableEditToolBox(record.EntryProfile.getAt(0).get('entryId') == Personify.utils.Configuration.getCurrentUser().get('id'));
                        }
                    }
                    this.resetToolbox();
                } else {
                    this.getContactinfo().setRecord(record);
                    this.setRecordProfile(record);
                }
            }
        }
        this.setCanedit(true);
    },

    setCountryListStore: function(store) {

    },

    //using this method in presenter page
    setPresenterRecord: function(presenter) {
        var view = this.getView();
        if(view && view.destroy != Ext.emptyFn) {
            if(presenter) {
                this.setRecordProfile(presenter);
                this.getContactinfo().setPresenterRecord(presenter);
            }
        }
    },

    setCanedit: function(newValue) {
        var view = this.getView();
        if (view && view.destroy != Ext.emptyFn) {
            var editRecordButton = this.getEditRecordButton();
            var addToMyAddressBookButton = this.getAddToMyProfileButton();
            if(newValue == true) {
                editRecordButton.enable();
                if(addToMyAddressBookButton) {
                    this.getAddToMyProfileButton().enable();
                }
            } else {
                editRecordButton.disable();
                if(addToMyAddressBookButton) {
                    this.getAddToMyProfileButton().disable();
                }
            }
        }
    },

    setEditmode: function(newValue) {
        if(this.getView()) {
            this.getContactinfo().setEditmode(newValue);
        }
    },
    updateEnableEditToolBox: function(newValue) {
        if(this.getView()) {
            if(newValue === true) {
            this.getEditToolBox().show();
            } else this.getEditToolBox().hide();
        }
    },

    onAddToMyProfileButtonTap: function() {
       var me = this,
            record = me.getRecordProfile(),
            entryProfile = record.EntryProfile.getAt(0),
            nameProfile = entryProfile.NameProfile.getAt(0) || null,
            phoneProfile = entryProfile.PhoneNumbersProfile || null,
            addressProfile = entryProfile.AddressesProfile|| null,
            emailProfile = entryProfile.EmailsProfile || null,
            urlProfile = entryProfile.UrlsProfile || null,
            myContact = navigator.contacts.create();

        myContact.displayName = entryProfile.get('displayName');
        myContact.name = {
                           formatted: nameProfile.get('formatted'),
                           familyName: nameProfile.get('familyName'),
                           givenName: nameProfile.get('givenName'),
                           middleName: nameProfile.get('middleName'),
                           honorificPrefix: nameProfile.get('honorificPrefix'),
                           honorificSuffix: nameProfile.get('honorificSuffix')
        };

        myContact.nickname = '';

        var numPhone = phoneProfile.getCount(),
            phoneNumbers = [],
            phoneNumber;

        for(var num =0; num < numPhone ; num++) {
            var phoneObj = phoneProfile.getAt(num);

            phoneNumber = new ContactField(phoneObj.get('type'),phoneObj.get('value'),false);
            phoneNumbers.push(phoneNumber);
        }
        myContact.phoneNumbers = phoneNumbers;

        var numEmail = emailProfile.getCount(),
            emails = [],
            email;

        for(var num =0; num < numEmail ; num++) {
            var mailObj = emailProfile.getAt(num);

            email = new ContactField(mailObj.get('type'),mailObj.get('value'),false);
            emails.push(email);
        }
        myContact.emails = emails;

        var numAddress = addressProfile.getCount(),
            addresses = [];


        for(var num = 0; num < numAddress ; num++) {
            var addressObj = addressProfile.getAt(num);

            var streetAddress = addressObj.get('streetAddress');
            if (addressObj.get('address')) {
                streetAddress += ", " + addressObj.get('address');
            }
            if (addressObj.get('address2')) {
                streetAddress += ", " + addressObj.get('address2');
            }
            if (addressObj.get('address3')) {
                streetAddress += ", " + addressObj.get('address3');
            }
            if (addressObj.get('address4')) {
                streetAddress += ", " + addressObj.get('address4');
            }

            var address = new ContactAddress();
            address.streetAddress = streetAddress;
            address.locality = addressObj.get('locality');
            address.postalCode = addressObj.get('postalCode');
            address.country = addressObj.get('country');
            address.region = addressObj.get('region');
            address.type = addressObj.get('type');
            addresses.push(address);
        }

        myContact.addresses = addresses;

        var urls = [];
        for (var num = 0; num < urlProfile.getAllCount(); num++) {
            url = new ContactField(urlProfile.getAt(num).get('type'), urlProfile.getAt(num).get('value'), false);
            urls.push(url);
        }
        myContact.urls = urls;

        myContact.save(setTimeout(me.onSuccess,500),me.onError);

    },
    onSuccess: function() {
        Ext.Msg.alert('Address Book', 'Added to address book', Ext.emptyFn);
    },
    onError: function() {
        if(Ext.os.is.Android){
            Ext.Msg.alert('Address Book', 'This contact already exists in your device\'s contact list.', Ext.emptyFn);
        }else{
            Ext.Msg.alert('Address Book', 'To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Contacts', Ext.emptyFn);
        }
    },

    onUpdatedContact: function(updatedContact) {
        this.getView().fireEvent('updatedContact', updatedContact);
    },
    onUpdateContactFail: function() {
        this.getView().fireEvent('updateContactFail');
    },
    resetToolbox: function() {
        this.getEditToolBox().reset();
    },

    hideCloseButton: function(value){
        this.getContactinfo().getController().getCloseContactPanel().setHidden(value);
    },

    onCloseInfoPanel: function(){
        this.getView().fireEvent('closeinfopanel');
    }

//    getDataCountryList: function() {
//        var me= this;
//        if(me.getView() && !me.getView().isDestroyed) {
//            me.getView().setMasked({xtype:'loadmask'});
//            var storeManager = Personify.utils.ServiceManager.getStoreManager();
//            var countryStoreName = storeManager.getCountryStore();
//            var store = Ext.create(countryStoreName);
//            var countryList= new Array();
//            store.load({callback: function(records, operation, success) {
//                var profileTypeStore = storeManager.getProfileTypeStore();
//                var storeProfileType = Ext.create(profileTypeStore);
//                for (var i = 0; i < records.length; i++) {
//                    countryList.push({text: records[i].get('countryDescription'), value: records[i].get('countryCode')});
//                }
//                storeProfileType.setData(countryList);
//                if(me.getView() && !me.getView().isDestroyed) {
//                    me.getContactinfo().getController().setCountryListStore(storeProfileType);
//                    me.getView().setMasked(false);
//                }
//            }});
//        }
//    }
});

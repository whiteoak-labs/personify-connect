Ext.define('Personify.controller.help.AboutAPA', {
    extend: 'Personify.base.Controller',
    inject: ['personify'],

    control: {
        titlePanel: true,
        descriptionPanel: true,
        importantNumbersPanel: true,
        addressPanel: true,
        websitePanel: true,
        emailPanel: true,
        bntApp47IdSettings: {
            tap: 'onTapApp47IdSettings'
        },
        version: true,
        phoneList: true,
        addressList: {
            itemtap: 'onTapAddressList'
        },
        emailList: true,
        websiteList: true,
        imageFrame: true,

        addToMyAddressBookButton: {
            tap: 'onTapAddToMyAddressBookButton'
        },

        tellAFriend: {
            tap: 'onTellAFriend'
        },
        configContainer: true
    },

    config: {
        tempData: null,
        personify: null
    },

    init: function() {
        var me = this;
        var data = me.getPersonify().getAt(0).AboutStore;

        if (data != null) {
            me.setTempData(data);

            me.getTitlePanel().setHtml(data.get('title'));
            //VERSION INFO : TBD
            me.getVersion().setHtml('Version: ' + '2.4.0');
            me.getImageFrame().setSrc(data.get('logoUrl'));

            me.getDescriptionPanel().updateTitle(data.get('descriptionTitle'));
            me.getDescriptionPanel().setHtml(data.get('description'));

            me.getImportantNumbersPanel().updateTitle(data.get('importantNumbersTitle'));
            me.getImportantNumbersPanel().updateStore(data.NumbersStore);

            me.getAddressPanel().updateTitle(data.get('addressesTitle'));
            me.getAddressPanel().updateStore(data.AddressesStore);

            me.getWebsitePanel().updateTitle(data.get('websitesTitle'));
            me.getWebsitePanel().updateStore(data.WebsiteStore);

            me.getEmailPanel().updateTitle(data.get('emailTitle'));
            me.getEmailPanel().updateStore(data.EmailStore);

            var enableConfig = data.get('enableConfigSettings');

            if (enableConfig) {
                me.getConfigContainer().setHidden(false);
            }
        }
    },

    onTapAddToMyAddressBookButton: function() {
        var me = this;
        var data = this.getTempData();
        var phoneNumbers = [], addresses = [], emails = [], urls = [];
        myContact = navigator.contacts.create();
        myContact.displayName = data.getData().title;
        var phoneProfile = data.NumbersStore;
        var addressProfile = data.AddressesStore;
        var emailProfile = data.EmailStore;
        var urlProfile = data.WebsiteStore;

        for(var num = 0; num < phoneProfile.getAllCount(); num++) {
            phoneNumber = new ContactField(phoneProfile.getAt(num).get('type'), phoneProfile.getAt(num).get('value'), false);
            phoneNumbers.push(phoneNumber);
        }
        myContact.phoneNumbers = phoneNumbers;

        for (var num = 0; num < emailProfile.getAllCount(); num++) {
            email = new ContactField(emailProfile.getAt(num).get('type'), emailProfile.getAt(num).get('value'), false);
            emails.push(email);
        }
        myContact.emails = emails;

        for (var num = 0; num < addressProfile.getAllCount(); num++) {
        	var address = new ContactAddress();
            var addressItem = addressProfile.getAt(num);
            var streetAddress = [];
            streetAddress.push(addressItem.get('streetAddress'));
            if (addressItem.get('address')) {
               streetAddress += ", " + addressItem.get('address');
            }
            if (addressItem.get('address2')) {
                streetAddress += ", " + addressItem.get('address2');
            }
            if (addressItem.get('address3')) {
                streetAddress += ", " + addressItem.get('address3');
            }
            if (addressItem.get('address4')) {
                streetAddress += ", " + addressItem.get('address4');
            }
            address.streetAddress = streetAddress;
            address.locality = addressItem.get('locality');
            address.postalCode = addressItem.get('postalCode');
            address.region = addressItem.get('region');
            address.country = addressItem.get('country');
            addresses.push(address);
        }
        myContact.addresses = addresses;

        for (var num = 0; num < urlProfile.getAllCount(); num++) {
            url = new ContactField(urlProfile.getAt(num).get('type'), urlProfile.getAt(num).get('value'), false);
            urls.push(url);
        }
        myContact.urls = urls;

        myContact.save(setTimeout(me.onSuccess,500), me.onError);
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

    onTellAFriend: function() {
        var title = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appShareTitle');
        var body = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appShareText');
        var appUrl = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appUrl');
        body = body.replace("{appUrl}", appUrl);

        if (window.plugins['emailComposer']) {
            window.plugins.emailComposer.showEmailComposer(title, body, null, null, null);
        }
    },

    onTapAddressList: function(dataView, index, target, record, e, eOpts) {
        var address = null;

        if (record.get('fomatted')) {
            address = record.get('formatted').split('/n').join(', ');
        }else {
            address = Personify.utils.ItemUtil.getAddress(record);
        }

        Personify.utils.ItemUtil.showAddressOnMaps(address);
    },

    onTapApp47IdSettings: function() {
        this.getView().parent.hide();
        var settings = Ext.create('Personify.view.help.Settings');
        Ext.Viewport.add(settings);
        settings.show();
    }
});

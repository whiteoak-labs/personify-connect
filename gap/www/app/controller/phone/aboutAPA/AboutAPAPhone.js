Ext.define('Personify.controller.phone.aboutAPA.AboutAPAPhone', {
    extend: 'Personify.base.Controller',
    inject: ['personify'],

    control: {
        ptoolbarAboutAPA: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        imageFrame: true,
        versionAPAPhone: true,
        titlePanel: true,
        descriptionPanel: true,
        phoneList: true,
        importantNumbersPanel: true,
        addressPanel: true,
        emailPanel: true,
        websitePanel: true,
        emailList: {

        },
        addressList: {
            itemtap: 'onTapAddressList'
        },
        websiteList: true,
        addToMyAddressBookButton: {
            tap: 'onTapAddToMyAddressBookButton'
        },
        tellAFriendButton: {
            tap: 'onTapTellAFriendButton'
        },
        bntApp47IdSettings: {
            tap: 'onTapApp47IdSettings'
        },
        configContainer: true
    },

    config: {
        tempData: null,
        personify: null
    },

    init: function() {
        var me = this;
        me.getPtoolbarAboutAPA().getController().setHiddenActionButton(true);

        var data = me.getPersonify().getAt(0).AboutStore;
        if(data != null) {
            me.setTempData(data);
            me.getImageFrame().setSrc(data.get('logoUrl'));
            me.getVersionAPAPhone().setHtml('Version: ' + data.get('version'));
            me.getTitlePanel().setHtml('<b>' + data.get('title') + '</b>');

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

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
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
            var profile = addressProfile.getAt(num);
            var address = new ContactAddress();
            var streetAddress = profile.get('streetAddress');

            if (profile.get('address')) {
                streetAddress += ", " + profile.get('address');
            }
            if (profile.get('address2')) {
                streetAddress += ", " + profile.get('address2');
            }
            if (profile.get('address3')) {
                streetAddress += ", " + profile.get('address3');
            }
            if (profile.get('address4')) {
                streetAddress += ", " + profile.get('address4');
            }

            address.streetAddress = streetAddress;
            address.locality = profile.get('locality');
            address.postalCode = profile.get('postalCode');
            address.country = profile.get('country');
            address.region = profile.get('region');
            addresses.push(address);

        }
        myContact.addresses = addresses;


        for (var num = 0; num < urlProfile.getAllCount(); num++) {
            url = new ContactField(urlProfile.getAt(num).get('type'), urlProfile.getAt(num).get('value'), false);
            urls.push(url);
        }
        myContact.urls = urls;

        myContact.save(me.onSuccess, me.onError);
    },

    onSuccess: function() {
        Ext.Msg.alert('Address Book', 'Added to address book', Ext.emptyFn);
    },

    onError: function(contactError) {
        if(Ext.os.is.Android){
            Ext.Msg.alert('Address Book', 'This contact already exists in your device\'s contact list.', Ext.emptyFn);
        }else{
            Ext.Msg.alert('Address Book', 'To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Contacts', Ext.emptyFn);
        }
    },

    onTapTellAFriendButton: function() {
        var title = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appShareTitle');
        var body = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appShareText');
        var appUrl = Personify.utils.Configuration.getConfiguration().getAt(0).AboutStore.get('appUrl');
        body = body.replace("{appUrl}", appUrl);

        if (window.plugins['emailComposer']) {
            window.plugins.emailComposer.showEmailComposer(title, body, null, null, null);
        }
    },

    onTapAddressList: function(dataView, index, target, record, e, eOpts) {
        var address = '';

        if (record.get('fomatted')) {
            address = record.get('formatted').split('/n').join(', ');
        }else {
            address = Personify.utils.ItemUtil.getAddress(record);
        }

        Personify.utils.ItemUtil.showAddressOnMaps(address);
    },

    onTapApp47IdSettings: function() {
        this.getView().fireEvent('requestchangeview', 'Personify.view.phone.aboutAPA.Settings', null);
    }
});

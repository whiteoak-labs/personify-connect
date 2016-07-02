Ext.define('Personify.controller.store.CartPanel', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser', 'personify', 'shoppingCartStore'],
    config: {
        shoppingCartStore: null,
        currentUser: null,
        personify: null,
        checkOutUrl: null
    },
    control: {
        totalItemCheckoutCartPanel: {

        },
        cartPanelTemplate: {

        },
        checkoutWebsite: {
            tap: 'onCheckoutWebsite'
        },
        callUsNumber: {

        }
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product View Shopping Cart');
        }

        var me = this;
        me.getCheckoutWebsite().hide();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var phoneCall = me.getPersonify().getAt(0).ProductStore.get('callUs');
        me.getTotalItemCheckoutCartPanel().setHtml(me.getShoppingCartStore().getCount());
        me.getCartPanelTemplate().setStore(me.getShoppingCartStore());
        me.getCallUsNumber().setHtml('Or Call Us at ' + phoneCall);

        var storeManager = Personify.utils.ServiceManager.getStoreManager();

        //get url for website checkout
        var shoppingCartUrlStore = Ext.create(storeManager.getProfileAuthenticationUrl());
        var shoppingCartUrlRequestPayload = {
            MasterCustomerId: currentUser.get('masterCustomerId'),
            SubCustomerId: currentUser.get('subCustomerId'),
            UserName: Personify.utils.Configuration.getUserName(),
            Password: Personify.utils.Configuration.getPassword(),
            PageKey: 'ShoppingCartURL',
            InputURL: ''
        };

        shoppingCartUrlStore.setDataRequest(shoppingCartUrlRequestPayload);
        shoppingCartUrlStore.load({
            callback: function (records, operation, success) {
                if (records.length > 0) {
                    me.setCheckOutUrl(shoppingCartUrlStore.first().get('outputUrl'));
                    me.getCheckoutWebsite().show();
                }
            }
        });
    },

    onCheckoutWebsite: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var link = this.getCheckOutUrl();
        if (Ext.os.is.Android) {
            window.open(link, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            window.open(link, '_blank', 'location=no,enableViewportScale=yes');
        }
    }
});

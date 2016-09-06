Ext.define('Personify.controller.phone.store.Store', {
    extend: 'Personify.base.Controller',
    requires: ['Personify.view.phone.store.StoreManagement'],
    inject: ['shoppingCartStore'],

    control: {
        storeNavigationView:{
        },
        storeManagementPanel: {
            listeners: {
                back: 'onBack',
                requestchangeview: 'onRequestChangeView'
            }
        }
    },

    config: {
        shoppingCartStore: null
    },

    init: function() {
        this.callParent(arguments);
    },

    onLoadData: function() {
        this.getStoreManagementPanel().getController().onGetData();
    },

    onRequestChangeView:function(view, config) {
        this.openView(view,config);
    },

    openView: function(view, config, title, css) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBackStore, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('checkoutshoppingcart', this.onTapCartItemCheckout, this);
        view.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);

        if (config && config.record) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var storeNavigationView = this.getStoreNavigationView();
        if (storeNavigationView.getActiveItem().xtype != view.xtype) {
            storeNavigationView.push(view);
        }
    },

    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    },

    onBackStore: function() {
        var navigation = this.getStoreNavigationView().pop();
    },

    onTapCartItemCheckout: function() {
        var me = this;
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('View Shopping Cart');
        }

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            var checkoutUrl = Personify.utils.Configuration.getUrlCheckOut();

            if (!checkoutUrl) {
                Ext.Msg.alert('', 'Cannot check out shopping cart.');
                return;
            }

            var ref = null;
            if (Ext.os.is.Android) {
                ref = window.open(checkoutUrl, '_blank', 'location=yes,enableViewportScale=yes');
            } else {
                ref = window.open(checkoutUrl, '_blank', 'location=yes,enableViewportScale=yes');
            }
            ref.addEventListener('exit', function() {
                Ext.callback(me.setTotalItemCheckout, me);
            });
        } else {
           this.openView('Personify.view.phone.login.LoginPhone', null);
        }
    },

    onUpdateCurrentUser: function(user, callback) {
        var me = this;
        this.getView().fireEvent('updatecurrentuser', user, function() {
            if(callback){
                callback(true);
            }
        });
    },

    setTotalItemCheckout: function() {
        var me = this,
        currentUser = Personify.utils.Configuration.getCurrentUser(),
        masterCustomerId = null,
        subCustomerId = null;

        if (currentUser && currentUser.isLogged()) {
            masterCustomerId = currentUser.get('masterCustomerId'),
            subCustomerId = currentUser.get('subCustomerId');

            var storeShoppingCart = me.getShoppingCartStore(),
                requestPayload = {
                    "MasterCustomerId": masterCustomerId,
                    "SubCustomerId": subCustomerId
                };

            storeShoppingCart.setDataRequest(requestPayload);
            storeShoppingCart.load({callback: function(records, operation, success) {
                Deft.Injector.configure({
                    shoppingCartStore: {
                        value: storeShoppingCart
                    }
                });
            }});
        }
    }
});

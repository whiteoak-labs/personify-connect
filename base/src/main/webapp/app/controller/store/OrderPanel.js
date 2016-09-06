Ext.define('Personify.controller.store.OrderPanel', {
    extend: 'Personify.base.Controller',
    
    control: {
        closeorderForm: {
            tap: 'onCloseForm'
        },
        
        orderTemplate: {
        },
        
        btnCancel: {
            'tap': 'onCloseForm'
        },
        
        btncheckout: {
            'tap': 'onCheckOut'
        },
        
        shippingAddress: {
            itemtap: 'onTapShippingAddress'
        }
    },
    
    config: {
        product: null,
        isProductEvent: null,
        callback: null,
        quantity: 1
    },

    init: function() {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product Place Order');
        }
    },

    onCloseForm: function() {
        Ext.Viewport.setMasked(false);
        this.getView().destroy();
    },

    onCheckOut: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getOrderTrue());
        var currentProductID = null;
        var addressId = me.getShippingAddress().getSelection()[0].get('addressesId');
        var type = me.getShippingAddress().getSelection()[0].get('type');

        if (me.getIsProductEvent() == true) {
            currentProductID = me.getProduct().get('productID');
        } else {
            currentProductID = me.getProduct().get('productID');
        }
        me.getView().setMasked({xtype: 'loadmask'});

        var attributes = {
                CusAddressID: addressId,
                CusAddressType: type,
                MasterCustomerID: currentUser.get('masterCustomerId'),
                SubCustomerID: currentUser.get('subCustomerId'),
                ProductID: currentProductID,
                OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                CustomPrice: "",
                ConfirmOrder: "true",
                Quantity: me.getQuantity()
        };
        store.setDataRequest(attributes);

        store.load({callback: function(records, operation, success) {
            me.getView().setMasked(false);
            var callback = me.getCallback();
            if(success) {
                me.getView().destroy();
                if(me.getProduct().get('meetingTag') && me.getProduct().get('meetingTag') == 'Wait List') {
                    if (callback) {
                        Ext.Msg.alert('Shopping Cart', 'You have been added to wait list for this event.', function() {
                            Ext.callback(callback.fn, callback.scope, callback.args);
                        });
                    } else {
                        Ext.Msg.alert('Shopping Cart', 'You have been added to wait list for this event.', Ext.emptyFn);
                    }
                } else {
                    Ext.Msg.alert('Shopping Cart', 'Order Placed Successfully', function() {
                    if (callback) {
                        Ext.callback(callback.fn, callback.scope, callback.args);
                    }
                    me.getView().destroy();
                });
                }
            } else {
                Ext.Msg.alert('Shopping Cart', 'Cannot process order at this time.', function() {
                    me.getView().destroy();
                });
            }
        }});
        Ext.Viewport.setMasked(false);
    },

    onTapShippingAddress: function(list, index, target, record, e, eOpts) {
        var me = this;
        var quantity = this.getQuantity();
        this.getView().setMasked({ xtype: 'loadmask' });
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        currentUser.confirmProductOrder(this.getProduct(), quantity, record, false).then({
            success: function(orderStore) {
                me.getOrderTemplate().setStore(orderStore);
            },
            failure: function() {
                Ext.Msg.alert('', 'Cannot load order information for selected address, please try again later.', Ext.emptyFn);
            }
        }).always(
            function() {
                me.getView().setMasked(false);
            }
        );
    }
});

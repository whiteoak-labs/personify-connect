Ext.define('Personify.controller.store.BackOrderPanel', {
    extend: 'Personify.base.Controller',
    
    config: {
        product: null,
        quantity: 1
    },

    control: {
        btnCancel: {
            'tap': 'onCloseForm'
        },
        
        btncheckout: {
            'tap': 'onBuyNow'
        },
        
        closeorderForm: {
            tap: 'onCloseForm'
        }
    },
    
    onCloseForm: function() {
        this.getView().destroy();
    },
    
    onBuyNow: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var productID = me.getProduct().get('productID');
        var quantity = me.getQuantity();
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        this.onCloseForm();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getOrderFalse());
        var attributes = {
                CusAddressID: "",
                MasterCustomerID: currentUser.get('masterCustomerId'),
                SubCustomerID: currentUser.get('subCustomerId'),
                ProductID: productID,
                OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                CustomPrice: "",
                ConfirmOrder: "false",
                Quantity: quantity
        };
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            if (success) {
              //load profile store
                var profileStore = Ext.create(storeManager.getProfileStore());
                var isStaff = currentUser.isStaffMember();
                var attributes = {
                   "MasterCustomerId": currentUser.get('masterCustomerId'),
                   "SubCustomerId": currentUser.get('subCustomerId'),
                   "ReqMasterCustomerId": currentUser.get('masterCustomerId'),
                   "ReqSubCustomerId": currentUser.get('subCustomerId'),
                   "IsStaff": isStaff,
                   "RecordType": ""
                };
                profileStore.setDataRequest(attributes);
                profileStore.load({callback: function(pRecords, operation, success) {
                    Ext.Viewport.setMasked(false);
                    var arrayAddress = [];
                    var addressStore = Ext.create('Personify.base.Store', {
                        model: 'Personify.model.jsonp.profile.Addresses'
                    });
                    if (success) {
                        //get list address
                        if (pRecords[0]) {
                            var dataProfile = pRecords[0];

                            if (dataProfile.EntryProfile.getAt(0)) {
                                var entryProfile = dataProfile.EntryProfile.getAt(0);
                                var length = entryProfile.AddressesProfile.getCount();
                                for (var i = 0; i < length; i++) {
                                    var address = entryProfile.AddressesProfile.getAt(i);
                                    var streetAddress = address.get('streetAddress'),
                                        locality = address.get('locality'),
                                        region = address.get('region'),
                                        postalCode = address.get('postalCode'),
                                        country = address.get('country'),
                                        addressesId = address.get('addressesId'),
                                        type = address.get('type');
                                    arrayAddress.push({'streetAddress': streetAddress, 
                                        'locality': locality,
                                        'region': region,
                                        'postalCode': postalCode,
                                        'country': country,
                                        'addressesId': addressesId,
                                        'type': type});
                                }
                                addressStore.add(arrayAddress);
                            }
                        }
                    }
                    //show open panel
                    var panel = Ext.create('Personify.view.store.OrderPanel');
                    panel.getController().setProduct(me.getProduct());
                    panel.getController().setIsProductEvent(false);
                    Ext.Viewport.add(panel);
                    store.each(function(item) {
                        var baseAmount = item.get('baseAmount');
                        item.set('baseAmount', baseAmount * quantity);
                    });
                    panel.getController().getOrderTemplate().setStore(store);
                    panel.getController().getShippingAddress().setStore(addressStore);
                    panel.getController().setQuantity(quantity);
                    if (addressStore.getCount() > 0) {
                        panel.getController().getShippingAddress().select(0);
                    }
                    me.getView().destroy();
                    panel.show();
                }});
            } else {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Shopping Cart', 'Cannot process order at this time.', Ext.emptyFn);
            }
        }});
    }
});
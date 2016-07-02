Ext.define('Personify.controller.store.MoreDetailPage', {
    extend: 'Personify.base.Controller',
    inject: ['shoppingCartStore'],
    
    config: {
        productItemStore: null,
        isDonate: false,
        shoppingCartStore: null
    },
    
    requires: [
        'Personify.utils.ItemUtil',
        'Personify.view.store.OrderPanel',
        'Personify.view.store.BackOrderPanel',
        'Personify.base.Store'
    ],

    control: {
        view: {
            show: 'onShow'
        },
        titleMoredetailPage: true,
        memberPriceMoredetailPage: true,
        labelMemberPriceMoredetailPage: true,
        labelListPriceMoredetailPage:true,
        listPriceMoredetailPage: true,
        descriptionMoredetailPage: true,
        productIdMoredetailPage: true,
        quantityPanelMoreDetailPage: true,
        buyNowButtonMoredetailPage: {
            tap: 'onBuyNow'
        },
        addToCartButtonMoredetaiPage: {
            tap: 'onAddToCart'
        },
        quantityMoredetailPage: {
        },
        imagesMoredetailPage: true
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product Detail');
        }

        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if ((currentUser.get('cCNumber') != null && currentUser.get('cCType') != null) &&
                (currentUser.get('cCNumber') != "" && currentUser.get('cCType') != "")) {
            me.getBuyNowButtonMoredetailPage().show();
        }
    },

    onShow: function() {
        var data = this.getProductItemStore();
        var price = data.get('price');
        var memberPrice = data.get('memberPrice');
        var yourPrice = data.get('yourPrice');
        var yourPriceRateStructure = data.get('yourPriceRateStructure')? data.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
        var priceWidth = Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 9);
        this.getTitleMoredetailPage().setHtml(data.get('name'));
        this.getListPriceMoredetailPage().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(price, 2));
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser.isLogged()) {
           if(yourPriceRateStructure == 'list')
           {
                this.getMemberPriceMoredetailPage().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2));
                this.getLabelListPriceMoredetailPage().setHtml('Your Price: ');
                this.getListPriceMoredetailPage().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2));
                this.getLabelMemberPriceMoredetailPage().setHtml('Member Price: ');
           }
           else
           {
                this.getMemberPriceMoredetailPage().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2));
                this.getLabelMemberPriceMoredetailPage().setHtml('Your Price: ');
                this.getLabelListPriceMoredetailPage().setHtml('List Price: ');
           }
        }
        else
        {
           this.getMemberPriceMoredetailPage().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2));
        }
        
        this.getMemberPriceMoredetailPage().setWidth(priceWidth);
        
        this.getListPriceMoredetailPage().setWidth(priceWidth);
        this.getDescriptionMoredetailPage().setHtml(data.get('descr'));
        this.getProductIdMoredetailPage().setHtml(data.get('productID'));
        this.getImagesMoredetailPage().select(0);

        if (data.get('productClass') == "DONATION") {
            this.getQuantityPanelMoreDetailPage().hide();
            this.setIsDonate(true);
        }

        this.getBuyNowButtonMoredetailPage().setText(data.get('purchaseActionTitle'));
    },

    onAddToCart: function(record) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser.isLogged()) {
            if (me.getProductItemStore().get('membersonly')) {
                if (currentUser.isExpiredMember()) {
                    Ext.Msg.alert('Alert', 'For Members Only.', Ext.emptyFn);
                    return;
                }
            }
            var quantity = me.getQuantityMoredetailPage().getValue();
            if (quantity <= 0) {
                Ext.Msg.alert('Alert', 'Quantity must be more than 0.', Ext.emptyFn);
                return;
            }

            var productItem = this.getProductItemStore();
            if (me.getIsDonate()) {
                quantity = 1;
            }

            var productId = me.getProductIdMoredetailPage().getHtml();
            var masterCustomerId = currentUser.data.masterCustomerId;
            var subCustomerId = currentUser.data.subCustomerId;
            var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                addCartStoreName = storeManager.getAddCartStore();
            //var rateStructure = "LIST";
            //var rateCode = "STD";
            //var price = productItem.get('price');
           var rateStructure = productItem.get('yourPriceRateStructure')? productItem.get('yourPriceRateStructure') : 'LIST';
           var rateCode = productItem.get('yourPriceRateCode')? productItem.get('yourPriceRateCode') : 'STD';
           var price = productItem.get('yourPrice');
          
            /*if (currentUser.isMember()) {
                rateStructure = "MEMBER";

                if (productItem.get('memberPrice')) {
                    price = productItem.get('memberPrice');
                }
            }*/

            var attributesAddCart = {
                "InternalKey": null,
                "NavigationKey": null,
                "MasterCustomerId": masterCustomerId,
                "SubCustomerId": subCustomerId,
                "ProductId": productId,
                "Qty": quantity,
                "CartSessionId": null,
                "IsAutoRenew": null,
                "UserDefinedField1": null,
                "UserDefinedField2": null,
                "UserDefinedField3": null,
                "MarketCode": null,
                "OrderNo": null,
                "OrderLineNo": null,
                "Price": price,
                "RateCode": rateCode,
                "RateStructure": rateStructure,
                "ShipMasterCustomerId": masterCustomerId,
                "ShipSubCustomerId": subCustomerId,
                "DoNotAutoAddComponents": null
            };

            var addCartStore = Ext.create(addCartStoreName);
            addCartStore.setDataRequest(attributesAddCart);
            me.getView().setMasked({xtype: 'loadmask'});
            addCartStore.load({callback: function(records, operation, success) {
                me.getView().setMasked(false);
                if (success) {
                    var state = addCartStore.getAt(0).getData().cartItemId;
                    if(state == -1) {
                        Ext.Msg.alert('', 'Add to shopping cart failed.');
                    } else {
                        var countItems = Ext.ComponentQuery.query('#totalItemCheckout');
                        countItems[0].setHtml(parseInt(countItems[0].getHtml()) + quantity);

                        if (currentUser.get('masterCustomerId') == null) {
                            masterCustomerId = '';
                            subCustomerId = '';
                        }

                        var storeShoppingCart = me.getShoppingCartStore();
                        var attributesInfor = {
                            "MasterCustomerId": masterCustomerId,
                            "SubCustomerId": subCustomerId
                        };

                        storeShoppingCart.setDataRequest(attributesInfor);
                        storeShoppingCart.load();

                        Deft.Injector.configure({
                            shoppingCartStore: {
                                value: storeShoppingCart
                            }
                        });
                        me.getView().destroy();
                        var panel = Ext.create('Personify.view.store.ConfirmAddToCart');
                        Ext.Viewport.add(panel);
                        panel.show();
                    }
                } else {
                    Ext.Msg.alert('', 'Add to shopping cart failed.');
                }
            }});
        } else {
            me.getView().destroy();
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    onBuyNow: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        var me = this;
        var quantity = me.getQuantityMoredetailPage().getValue();

        if (quantity <= 0) {
            Ext.Msg.alert('Alert', 'Quantity must be more than 0.', Ext.emptyFn);
            return;
        }

        var productID = me.getProductItemStore().get('productID');
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        if (!currentUser.isLogged()) {
            Personify.utils.ItemUtil.needToLogin();
        }

        if (me.getProductItemStore().get('membersonly')) {
            if (currentUser.isExpiredMember()) {
                Ext.Msg.alert('Alert', 'For Members Only.', Ext.emptyFn);
                return;
            }
        }

        if (me.getProductItemStore().get('allowbackorders') == true
                && me.getProductItemStore().get('availablequantity') == 0) {
            var panel = Ext.create('Personify.view.store.BackOrderPanel');
            panel.getController().setProduct(me.getProductItemStore());
            panel.getController().setQuantity(quantity);
            Ext.Viewport.add(panel);
            panel.show();
            me.getView().destroy();
            return;
        }

        me.getView().setMasked({xtype: 'loadmask'});
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
                    me.getView().setMasked(false);
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
                    panel.getController().setProduct(me.getProductItemStore());
                    panel.getController().setIsProductEvent(false);
                    panel.getController().setQuantity(quantity);
                    Ext.Viewport.add(panel);
                    store.each(function(item) {
                        var baseAmount = item.get('baseAmount');
                        item.set('baseAmount', baseAmount * quantity);
                    });
                    panel.getController().getOrderTemplate().setStore(store);
                    panel.getController().getShippingAddress().setStore(addressStore);
                    if (addressStore.getCount() > 0) {
                        panel.getController().getShippingAddress().select(0);
                    }
                    me.getView().destroy();
                    panel.show();
                }});
            } else {
                me.getView().setMasked(false);
                Ext.Msg.alert('Shopping Cart', 'Cannot process order at this time.', Ext.emptyFn);
            }
        }});
    }
});

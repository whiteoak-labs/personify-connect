Ext.define('Personify.controller.phone.store.MoreDetailPage', {
    extend: 'Personify.controller.store.MoreDetailPage',
    requires: ['Personify.view.phone.store.PopUpImage', 'Personify.view.phone.store.ConfirmAddToCart'],
    inject: ['shoppingCartStore'],

    control: {
        storeToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        view: {
            show: 'onShow'
        },
        imageDetail: true,
        titleMoredetailPage: true,
        memberPriceMoredetailPage: true,
        labelMemberPriceMoredetailPage: true,
        labelListPriceMoredetailPage:true,
        listPriceMoredetailPage: true,
        descriptionMoredetailPage: true,
       quantityPanelMoreDetailPage:true,
        quantityMoredetailPage: true,
        buyNowButtonMoredetailPage: {
            tap: 'onBuyNow'
        },
        addToCartButtonMoredetaiPage: {
            tap: 'onAddToCart'
        },
        shareStoreDetail: {
            tap: 'onTapShareStoreDetail'
        },
        zoomImage: {
            tap: 'onTapZoomImage'
        },
        actionButton: {}
    },

    config: {
        productItemStore: null,
        isDonate: false,
        shoppingCartStore: null
    },

    onBack: function() {
        var me = this;
            thisView = me.getView();

        me.getQuantityMoredetailPage().blur();
        thisView.fireEvent('back',this);
    },

    init: function() {
        this.getShoppingCartStore().on('load', this.onLoadDone, this);
        this.getStoreToolbar().getController().setActionCls('p-phone-button-storeshoppingcart');
        this.showBuyNowButton();
        this.getActionButton().hide();
    },

    destroy: function() {
        this.getShoppingCartStore().un('load', this.onLoadDone, this);
        return this.callParent(arguments);
    },

    onShow: function() {
        var record = this.getView().getRecord();
        if (record) {
            var price = Personify.utils.ItemUtil.formatPurchaseAmount(record.get('price'), 2);
            var memberPrice =Personify.utils.ItemUtil.formatPurchaseAmount(record.get('memberPrice'), 2);
            var yourPrice =Personify.utils.ItemUtil.formatPurchaseAmount(record.get('yourPrice'), 2);
            var yourPriceRateStructure = record.get('yourPriceRateStructure')? record.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
            this.setProductItemStore(record);
            this.getImageDetail().setHtml('<img src="'+record.get('imageURL')+'"/>');
            this.getTitleMoredetailPage().setHtml(record.get('name'));
            this.getDescriptionMoredetailPage().setHtml(record.get('descr'));
            this.getListPriceMoredetailPage().setHtml(price);
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if (currentUser.isLogged()) {
                if(yourPriceRateStructure == 'list')
                {
                    this.getMemberPriceMoredetailPage().setHtml(memberPrice);
                    this.getLabelListPriceMoredetailPage().setHtml('Your Price: ');
                    this.getListPriceMoredetailPage().setHtml(yourPrice);
                    this.getLabelMemberPriceMoredetailPage().setHtml('Member Price: ');
                }
                else
                {
                    this.getMemberPriceMoredetailPage().setHtml(yourPrice);
                    this.getLabelMemberPriceMoredetailPage().setHtml('Your Price: ');
                    this.getLabelListPriceMoredetailPage().setHtml('List Price: ');
                }
           
            }
            else
            {
                this.getMemberPriceMoredetailPage().setHtml(memberPrice);
            }
           
            if (record.get('productClass') == "DONATION") {
               this.getQuantityPanelMoreDetailPage().hide();
                this.setIsDonate(true);
            }
        }
        if (this.getShoppingCartStore().getCount() != 0) {
            this.getActionButton().setText(this.getShoppingCartStore().getCount());
        } else {
            this.getActionButton().setText('0');
        }
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!currentUser.isLogged()) {
            this.getActionButton().setText('0');
        }
    },

    onAddToCart: function(record) {
        this.getQuantityMoredetailPage().blur();

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

            var productItem = this.getView().getRecord();
            var quantity = me.getQuantityMoredetailPage().getValue();

            if (quantity <= 0) {
                Ext.Msg.alert('Alert', 'Quantity must be more than 0.', Ext.emptyFn);
                return;
            }

            if (me.getIsDonate()) {
                quantity = 1;
            }

            var productId = productItem.get('productID');
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
                        if(currentUser.get('masterCustomerId') == null) {
                            masterCustomerId = '';
                            subCustomerId = '';
                        }
                        var storeShoppingCart = me.getShoppingCartStore();
                        var attributesInfor = {
                            "MasterCustomerId": masterCustomerId,
                            "SubCustomerId": subCustomerId
                        };

                        storeShoppingCart.setDataRequest(attributesInfor);

                        storeShoppingCart.load({callback: function() {
                            Deft.Injector.configure({
                                shoppingCartStore: {
                                    value: storeShoppingCart
                                }
                            });
                        }});

                        var panel = Ext.create('Personify.view.phone.store.ConfirmAddToCart');
                        Ext.Viewport.add(panel);
                        panel.show();
                    }
                } else {
                    Ext.Msg.alert('', 'Add to shopping cart failed.');
                }
            }});
        } else {
            var loginForm = Ext.create('Personify.view.phone.login.LoginPhone');
            loginForm.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);
            this.getView().fireEvent('requestchangeview', loginForm, null);
        }
    },

    onBuyNow: function() {
        this.getQuantityMoredetailPage().blur();

        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var productID = this.getView().getRecord().get('productID');
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        if (!currentUser.isLogged()) {
            this.getView().fireEvent('requestchangeview', 'Personify.view.phone.login.LoginPhone', null);
        }

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

        if (me.getIsDonate()) {
            quantity = 1;
        }

        if (me.getProductItemStore().get('allowbackorders') == true
                && me.getProductItemStore().get('availablequantity') == 0) {
            var panel = Ext.create('Personify.view.phone.store.BackOrderPanel');
            panel.getController().setProduct(me.getProductItemStore());
            panel.getController().setCallback({ fn: me.onBack, scope: me });
            Ext.Viewport.add(panel);
            panel.show();
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
                    var panel = Ext.create('Personify.view.phone.store.OrderPanel');
                    panel.getController().setProduct(me.getProductItemStore());
                    panel.getController().setIsProductEvent(false);
                    Ext.Viewport.add(panel);
                    store.each(function(item) {
                        var baseAmount = item.get('baseAmount');
                        item.set('baseAmount', baseAmount * quantity);
                    });
                    panel.getController().getOrderTemplate().setStore(store);
                    panel.getController().getShippingAddress().setStore(addressStore);
                    panel.getController().setQuantity(quantity);
                    panel.getController().setCallback({ fn: me.onBack, scope: me });
                    if (addressStore.getCount() > 0) {
                        panel.getController().getShippingAddress().select(0);
                    }
                    panel.show();
                }});
            } else {
                me.getView().setMasked(false);
                Ext.Msg.alert('Shopping Cart', 'Cannot process order at this time.', Ext.emptyFn);
            }
        }});
    },

    onTapShareStoreDetail: function() {
        var me = this;

        me.getQuantityMoredetailPage().blur();

        if (window.plugins.social && window.plugins.social['available']) {
            window.plugins.social.available(function(result) {
                if (result == 1) {
                    var body = '';
                    if (me.getView().getRecord()) {
                        var data = me.getView().getRecord();
                        var title = data.get('name');
                        var description = data.get('descr');
                        var price = data.get('price');
                        var memberPrice = data.get('memberPrice');
                        body = "Title: " + title + "\n" + "Desctiption: " + description + "\n" + "Price: $" + price + "\n" + "Member Price: $" + memberPrice;
                    }
                    window.plugins.social.share(body, '', '');
                } else {
                    Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                }
            });
        }
    },

    onTapZoomImage: function() {
        var panel = Ext.create('Personify.view.phone.store.PopUpImage');
        Ext.Viewport.add(panel);
        panel.getController().setRecord(this.getView().getRecord());
        panel.show();
    },

    onLoadDone: function(store, record, success) {
        if (success) {
            this.getActionButton().setText(store.getCount());
        }
    },
    
    onUpdateCurrentUser: function(currentUser) {
        this.showBuyNowButton();
    },
    
    showBuyNowButton: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if ((currentUser.get('cCNumber') != null && currentUser.get('cCType') != null) &&
                (currentUser.get('cCNumber') != "" && currentUser.get('cCType') != "")) {
            this.getBuyNowButtonMoredetailPage().show();
            this.getBuyNowButtonMoredetailPage().setText(this.getView().getRecord().get('purchaseActionTitle'));
        }
    }
});

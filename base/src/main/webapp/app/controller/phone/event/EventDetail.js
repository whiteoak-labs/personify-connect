Ext.define('Personify.controller.phone.event.EventDetail', {
    extend: 'Personify.base.Controller',
    requires: ['Personify.view.phone.store.ConfirmAddToCart'],
    inject: [
        'personify',
        'shoppingCartStore'
    ],

    config: {
        currentUser: null,
        personify: null,
        address: null,
        shoppingCartStore: null
    },

    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onEventHomeButtonTap'
        },
        titleOfEvent: true,
        description: true,
        locationFullAddress: {
            onTapAddressList: 'onTapAddressList'
        },
        location: true,
        timeLabel: true,
        memberPrice: true,
        labelMemberPrice: true,
        labelListPrice: true,
        price: true,
        saveToMyCalendar: {
            tap: 'onSaveToMyCalendar'
        },
        addToMySchedule: {
            tap: 'onAddToMyScheduleTap'
        },
        addToCart: {
            tap: 'onAddToCartButtonTap'
        },
        registerNow: {
            tap: 'onRegisterNowTap'
        },
        alreadyRegistered: true,
        pricingPanel: true,
        shareEventPhone: {
            tap: 'onTapShareEventPhone'
        },
        rateEventPanel: {
            gotorate: 'onGotoRate'
        }
    },

    init: function() {
        this.getEventToolbar().getController().setActionText('More');
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (record) {
            if (record.get('isConference')) {
                this.getRateEventPanel().hide();
            } else {
                if (currentUser.isLogged()) {
                    this.getRateEventPanel().show();
                } else {
                    this.getRateEventPanel().hide();
                }
            }
        } else {
            this.getRateEventPanel().show();
        }

        this.setRecord(record);
        this.updateAddRemoveButton(record);
    },

    onGotoRate: function() {
        var meetingRecord = this.getView().getRecord();
        var record = this.getView().getRecord();
        var productId = meetingRecord.get('productID');
        var sessionId = record.get('productID');
        var view = Ext.create('Personify.view.phone.rate.Rate', {record: record, productId: productId, sessionId: sessionId, meetingRecord: meetingRecord});
        //this.getView().fireEvent('requestopendetail', view, null);
        me = this;
        Ext.Function.defer(function(){
            me.getView().fireEvent('requestopendetail', view, null);
        }, 400);
    },

    updateAddRemoveButton: function(record) {
        if(record.get('isAdded')) {
            this.getAddToMySchedule().setCls('p-phone-button-eventdetail-regiter');
            this.getAddToMySchedule().setHtml('Delete from My Schedule');
        } else {
            this.getAddToMySchedule().setCls('p-phone-button-eventdetail-savetocalendar');
            this.getAddToMySchedule().setHtml('Add to My Schedule');
        }
    },

    setRecord: function(record) {
           
        if(record) {
           
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           
           if (navigator.onLine && currentUser != null && currentUser.isLogged())
           {
                this.onGetIsUserRegistered(record);
           }
           
            var start = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
            var end = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));
            var timeZoneCode = record.get('timeZoneCode')
            if(timeZoneCode && timeZoneCode!='')
            {
                this.getSaveToMyCalendar().show();
            }
            else
            {
                this.getSaveToMyCalendar().hide();
            }
            var dateTime = Personify.utils.ItemUtil.getDisplayDateTimeEventDetailPhone(start, end, timeZoneCode);
            var address = record.get('locationFullAddress');
            this.setAddress(address);
            this.getTimeLabel().setHtml(dateTime);
            this.getTitleOfEvent().setHtml(record.get('shortName'));
            this.getDescription().setHtml(record.get('shortDescription'));
            this.getLocationFullAddress().setHtml(address);
            this.getLocation().setHtml(record.get('location'));
            if(record.get('isConference')) {
                this.getPricingPanel().hide();
            } else {
                var memberPrice = record.get('memberPrice');
                var yourPrice = record.get('yourPrice');
                var price = record.get('price');
                var yourPriceRateStructure = record.get('yourPriceRateStructure')? record.get('yourPriceRateStructure').trim().toLowerCase() : 'list';
           
                var priceWidth = Personify.utils.ItemUtil.getWidthPrice(price, memberPrice, 7.5);
                this.getPrice().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(price, 2));
           
           
                if(currentUser != null && currentUser.isLogged()){
                    if(yourPriceRateStructure == 'list')
                    {
                        this.getMemberPrice().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2));
                        this.getLabelListPrice().setHtml('Your Price: ');
                        this.getPrice().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2));
                        this.getLabelMemberPrice().setHtml('Member Price: ');
                    }
                    else
                    {
                        this.getMemberPrice().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(yourPrice, 2));
                        this.getLabelMemberPrice().setHtml('Your Price: ');
                        this.getLabelListPrice().setHtml('List Price: ');
                    }
                }
                else{
                    this.getMemberPrice().setHtml(Personify.utils.ItemUtil.formatPurchaseAmount(memberPrice, 2));
                }
           
                this.getMemberPrice().setWidth(priceWidth);
                this.getPrice().setWidth(priceWidth);
                this.getPricingPanel().show();
            }
        }
    },

    onAddToCartButtonTap: function() {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if (me.getView().getRecord().get('membersOnly')) {
            if (currentUser.isExpiredMember()) {
                Ext.Msg.alert('', 'For Members Only.', Ext.emptyFn);
                return;
            }
        }

        if(currentUser && currentUser.isLogged()) {
            var productId = me.getView().getRecord().get('productID');
            var masterCustomerId = currentUser.get('masterCustomerId');
            var subCustomerId = currentUser.get('subCustomerId');
            var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                addCartStoreName = storeManager.getAddCartStore();
            var productItem = me.getView().getRecord();
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
               "InternalKey":null,
               "NavigationKey":null,
               "MasterCustomerId": masterCustomerId,
               "SubCustomerId": subCustomerId,
               "ProductId": productId,
               "Qty": 1,
               "CartSessionId":null,
               "IsAutoRenew":null,
               "UserDefinedField1":null,
               "UserDefinedField2":null,
               "UserDefinedField3":null,
               "MarketCode":null,
               "OrderNo":null,
               "OrderLineNo":null,
               "Price": price,
               "RateCode": rateCode,
               "RateStructure": rateStructure,
               "ShipMasterCustomerId": masterCustomerId,
               "ShipSubCustomerId": subCustomerId,
               "DoNotAutoAddComponents":null
            };

            var addCartStore = Ext.create(addCartStoreName);
            addCartStore.setDataRequest(attributesAddCart);
            me.getView().setMasked({xtype: 'loadmask'});
            addCartStore.load({
                callback: function(records, operation, success) {
                    if (success) {
                        var state = addCartStore.getAt(0).getData().cartItemId;
                        if (state == -1) {
                            Ext.Msg.alert('Fail', 'Add to shopping cart unsuccessfully.');
                        } else {
                            if (currentUser.getData().masterCustomerId == null) {
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
                                me.getView().setMasked(false);
                                Deft.Injector.configure({
                                    shoppingCartStore: {
                                        value: storeShoppingCart
                                    }
                                });

                                var panel = Ext.create('Personify.view.phone.store.ConfirmAddToCart');
                                Ext.Viewport.add(panel);
                                panel.show();
                            }});
                        }
                    } else {
                        me.getView().setMasked(false);
                    }
                },
                scope: this
            });
        } else {
            me.openLoginView();
        }
    },

    onGetIsUserRegistered: function(record, callback) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var me = this;
        var attributes = {
            "ProductID": record.get('productID'),
            "MasterCustomerID": currentUser? currentUser.get('masterCustomerId'): '0' ,
            "SubCustomerID": currentUser? currentUser.get('subCustomerId'): '0'
        }
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var isUserRegisterStoreName = storeManager.getIsUserRegisterStore();
        isUserRegisterStore = Ext.create(isUserRegisterStoreName);
        isUserRegisterStore.setDataRequest(attributes);
        isUserRegisterStore.load({
            callback: function(records, operation, success) {
                if(callback){
                    callback(true);
                }
                if(records.length > 0){
                    record.set('registered', records[0].get('userRegistered'));
                }
                me.onShowHideButtonAndText(record);
            },
            scope: this
        });
    },

    onShowHideButtonAndText: function(){
        if (this['getAddToCart']) {
            this.getAddToCart().hide();
        }
        this.getRegisterNow().hide();
        this.getAlreadyRegistered().hide();

        var record = this.getView().getRecord(),
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            currentDate = new Date(),
            endDate = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));

        if(currentUser && currentUser.isLogged()) {
            if(record.get('registered')){
                this.getAlreadyRegistered().show();
            }
            if(!record.get('isConference') && currentDate < endDate && !record.get('registered') && record.get('meetingTag') != 'Sold Out' && record.get('meetingTag') != 'Cancelled') {
                var mobileRegistration = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mobileRegistration');
                if (mobileRegistration) {
                    this.getAddToCart().show();
                    if(currentUser.get('cCType') && currentUser.get('cCNumber') &&
                        currentUser.get('cCType')!= '' && currentUser.get('cCNumber') != '') {
                        this.getRegisterNow().show();
                    }
                }
            }
        }
    },

    onBack: function() {
        this.getView().fireEvent('back',this);
    },

    onAddToMyScheduleTap: function() {
        var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if(currentUser && currentUser.isLogged()) {
            var isAdded = record.get('isAdded');
            if (isAdded) {
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('removeagenda', record, function(success) {
                    if(success) {
                        me.getView().fireEvent('updatelistagenda');
                        if (record.get('isAdded')) {
                            record.set('isAdded', false);
                        }

                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Meeting has been removed.', Ext.emptyFn);
                        me.getView().fireEvent('refreshagenda', me.getView().getRecord(), false);
                    }
                    Ext.Viewport.setMasked(false);
                });
            } else {
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('addagenda', record, record.get('productID'), function(success, appointmentId) {
                    if(success) {
                        if (!record.get('isAdded')) {
                            record.set('isAdded', true);
                        }

                        record.set('appointmentId', appointmentId);
                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Meeting has been added to your schedule.', Ext.emptyFn);
                    }
                    Ext.Viewport.setMasked(false);
                });
            }
        }else{
            me.openLoginView();
        }
    },

    openLoginView: function(){
        var view = Ext.create('Personify.view.phone.login.LoginPhone', null);
        this.getView().fireEvent('requestopendetail', view, null);
    },

    onRefreshData: function(callback) {
        var me = this;
        var record = this.getView().getRecord();
        var store = Ext.getStore('agendaStoreListMain');
        if(store) {
            for (var i = 0; i < store.getCount(); i++) {
                var recordAgenda = store.getAt(i);
                if (recordAgenda.get('type') != 'PERSONAL') {
                    if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0") {
                        if (recordAgenda.get('meetingId') == record.get('productID')) {
                            if (!record.get('appointmentId') || record.get('appointmentId') == '') {
                                record.set('appointmentId', recordAgenda.get('appointmentId'));
                            }

                            if (!record.get('isAdded')) {
                                record.set('isAdded', true);
                                break;
                            }
                        }
                    }
                }
            };
            me.updateAddRemoveButton(record);
        }
           
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           
           if (navigator.onLine && currentUser != null && currentUser.isLogged())
           {
                 me.onGetIsUserRegistered(record, callback);
           }
          
    },

    onRegisterNowTap: function() {
        var me = this;
        var record = me.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        if (record.get('membersOnly')) {
            if (currentUser.isExpiredMember()) {
                Ext.Msg.alert('', 'For Members Only.', Ext.emptyFn);
                return;
            }
        }

        if(currentUser && currentUser.isLogged()) {
            if(record.get('meetingTag') == "Wait List") {
                Ext.Msg.show({
                   title: '',
                   message: 'Event Capacity Reached. Do you want to be placed on the wait list?',
                   buttons : [{
                      itemId: 'cancel',
                      text: 'Cancel',
                      ui: 'action'
                  },{
                      itemId: 'ok',
                      text: 'Buy now',
                      ui: 'action'
                  }],
                   fn: processResult,
                   animEl: 'elId'
                });
                function processResult(clickedButton) {
                    Ext.Msg.hide();
                    if(clickedButton == 'ok'){
                        me.sendRequestRegister(record, currentUser);
                    }
                }
            } else if (record.get('meetingTag') == "Sold Out") {
                Ext.Msg.alert('', 'Event and Wait list capacity reached.  Thank you for your interest.', Ext.emptyFn);
            } else {
                me.sendRequestRegister(record, currentUser);
            }
        } else {
            me.openLoginView();
        }
    },

    onSaveToMyCalendar: function() {
        var me = this;
        if (window.plugins.calendarPlugin && window.plugins.calendarPlugin['createEvent']) {
            var event = {};
            var data = me.getView().getRecord();
            var title = data.get('shortName');
            var date = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')));
            var startTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('startDateTimeString')), "g:i a");
            var endTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDate(data.get('endDateTimeString')), "g:i a");
            var time = startTime + " - " + endTime;
            var location = data.get('locationFullAddress');
            var body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n" + "Location: " + location;
            event.title = title;
            event.location = location;
            event.body = body;
            event.startDate = data.get('startDateTime');
            event.endDate = data.get('endDateTime');
            event.calendarName = title;
            window.plugins.calendarPlugin.createEvent(event, function() {
                if (Ext.os.is.iOS) {
                    Ext.Msg.alert('', 'Saved to calendar successfully.', Ext.emptyFn);
                }
            }, function() {
                if (Ext.os.is.Android){
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts', Ext.emptyFn);
                }else{
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Calendars', Ext.emptyFn);
                }
            });
        }
    },

    onEventHomeButtonTap: function(){
        var me = this;
        var record = this.getView().getRecord();
        var view = 'Personify.view.phone.event.ConfrerenceNavigation';
        this.getView().fireEvent('requestopendetail', view, {record: record});
    },

    sendRequestRegister: function(record, currentUser){
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        me.getView().setMasked({xtype: 'loadmask'});
        var store = Ext.create(storeManager.getOrderFalse());
        var attributes = {
                CusAddressID: "",
                CusAddressType: "",
                MasterCustomerID: currentUser.get('masterCustomerId'),
                SubCustomerID: currentUser.get('subCustomerId'),
                ProductID: record.get('productID'),
                OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                CustomPrice: "",
                ConfirmOrder: "false"
        };
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            me.getView().setMasked(false);
            if (success) {
                var isStaff = currentUser.isStaffMember();
                var attributes = {
                   "MasterCustomerId": currentUser.get('masterCustomerId'),
                   "SubCustomerId": currentUser.get('subCustomerId'),
                   "ReqMasterCustomerId": currentUser.get('masterCustomerId'),
                   "ReqSubCustomerId": currentUser.get('subCustomerId'),
                   "IsStaff": isStaff,
                   "RecordType": ""
                };
                me.getView().setMasked({xtype: 'loadmask'});
                me.loadProfileStore(attributes, record, store);
            } else {
                Ext.Msg.alert('Shopping Cart', 'Cannot process order at this time.', Ext.emptyFn);
            }
        }});
    },

    loadProfileStore: function(attributes, record, store){
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var profileStore = Ext.create(storeManager.getProfileStore());
        profileStore.setDataRequest(attributes);
        profileStore.load({callback: function(pRecords, operation, success) {
            me.getView().setMasked(false);
            var arrayAddress = [];
            var addressStore = Ext.create('Personify.base.Store', {
                                    model: 'Personify.model.jsonp.profile.Addresses'
                                });
            if(success){
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
            var panel = Ext.create('Personify.view.phone.store.OrderPanel');
            panel.getController().setProduct(record);
            panel.getController().setIsProductEvent(true);
            panel.getController().getOrderTemplate().setStore(store);
            panel.getController().getShippingAddress().setStore(addressStore);
            if (addressStore.getCount() > 0) {
                panel.getController().getShippingAddress().select(0);
            }
            Ext.Viewport.add(panel);
            panel.show();
            panel.getController().setCallback({ fn: me.onRegisteredSuccess, scope: me, args: [record] });
        }});
    },

    onRegisteredSuccess: function(record) {
        record.set('registered', true);
        this.onRefreshData(function(){});
    },

    onTapAddressList: function() {
        var address = this.getAddress();

        if (address) {
            Personify.utils.ItemUtil.showAddressOnMaps(address);
        }
    },

    onTapShareEventPhone: function() {
        if (this.getView().getRecord()) {
            Personify.utils.ItemUtil.onShareEvent(this.getView().getRecord());
        }
    }
});

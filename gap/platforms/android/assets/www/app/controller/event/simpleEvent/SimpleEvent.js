Ext.define('Personify.controller.event.simpleEvent.SimpleEvent',{
    extend: 'Personify.base.Controller',
    inject: ['shoppingCartStore'],
    config: {
        countLoad: 0,
        defaultView: 'simpleeventcontent',
        shoppingCartStore: null,
        fromMain: false
    },

    control: {
        addToCartButton: {
            tap: 'onAddToCartButtonTap'
        },

        simpleEventContent: {
            gotoAttendeeProfile: 'gotoAttendeeProfile',
            refreshmyschedule: 'refreshMySchedule',
            buttonmapittap: 'onButtonMapitTap',
            deletesession: 'getObjectDelectMeetingAgenda'
        },

        eventMenu: {
            onMenuItemTapped: 'onMenuItemTap'
        },
        twitterPanel: true,
        registerButton: {
            tap: 'onTapRegisterButton'
        },
        registeredText: true,
        backToEventButton:{
            tap: 'onBackToEventTap'
        },
        view: {
            painted: 'onPainted'
        }
    },//control

    init: function() {
        this.initView();
    },

    onPainted: function(){
        Ext.Viewport.setMasked(false);
    },

    initView: function() {
        var record = this.getView().getRecord();

        if (this.getView().getFromMain()) {
            this.setFromMain(this.getView().getFromMain());
        }

        if (record) {
            this.getTwitterPanel().updateRecord(record);
            this.onHideRegisterButton(record);
            this.onLoadMenu(record);
        }
    },

    onGetIsUserRegistered: function(record, currentUser) {
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
        me.getView().setMasked({xtype: 'loadmask'});
        isUserRegisterStore.load({
            callback: function(records, operation, success) {
                me.getView().setMasked(false);
                if (records.length > 0) {
                    record.set('registered', records[0].get('userRegistered'));
                }
                me.initView(record);
            },
            scope: this
        });
    },

    onMenuItemTap: function(record) {
        var recordView = this.getView().getRecord();
        var me = this,
            subView = {xtype: record.get('view'), record : recordView, meetingRecord: recordView},
            simpleEventContent  = me.getSimpleEventContent();
        this.setDefaultView(record.get('view'));
        simpleEventContent.removeAll();
        simpleEventContent.add(subView);
    },

    onButtonMapitTap: function(record) {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser && currentUser.isLogged()) {
            var masterCustomerId = currentUser.get('masterCustomerId');
            var subCustomerId = currentUser.get('subCustomerId');
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var attributes = {
                "SubCustomerID": subCustomerId,
                "MeetingID": record.get('productID'),
                "MasterCustomerID": masterCustomerId
            };

            var agendaStoreMap = Ext.create(agendaStoreName);
            agendaStoreMap.setDataRequest(attributes);
            agendaStoreMap.load({
                callback: function(records, operation, success) {
                    record.MeetingAgendaStore = agendaStoreMap;
                    var subView = {xtype:'mapevent', record: record, meetingRecord: record};
                    var simpleEventContent = me.getSimpleEventContent();
                    simpleEventContent.removeAll(true, true);
                    simpleEventContent.add(subView);
                },
                scope: this
            });
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

			/*
           if (currentUser.isMember()) {
				rateStructure = "MEMBER";
				
				if (productItem.get('memberPrice')) {
					price = productItem.get('memberPrice');
				}
			}
             */

            var attributesAddCart = {
               "InternalKey": null,
               "NavigationKey": null,
               "MasterCustomerId": masterCustomerId,
               "SubCustomerId": subCustomerId,
               "ProductId": productId,
               "Qty": 1,
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
            addCartStore.load({
                callback: function(records, operation, success) {
                    me.getView().setMasked(false);

                    if (success) {
                        var state = addCartStore.getAt(0).getData().cartItemId;
                        if (state == -1) {
                            Ext.Msg.alert('Fail', 'Add to shopping cart unsuccessfully.');
                        } else {
                            if (currentUser.get('masterCustomerId') == null){
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
                            var panel = Ext.create('Personify.view.store.ConfirmAddToCart');
                            Ext.Viewport.add(panel);
                            panel.show();
                        }
                    }
                },
                scope: this
            });
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    onLoadMenu: function(record) {
        var me = this;
        var eventMenuList = this.getEventMenu();
        eventMenuList.setMasked({xtype: 'loadmask'});
        var eventMenu = Ext.create('Personify.store.base.EventMenu');
        var proxy = {
            type: 'ajax',
            url : 'data/SimpleEventMenu.json',
            reader: {
                type: 'json',
                rootProperty: 'menu'
            }
        };

        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var arrayDisplayMenuStore = [];
        if (record) {
            eventMenu.setProxy(proxy);
            eventMenu.load({
                callback: function(records, operation, success) {
                    eventMenuList.setMasked(false);
                    Ext.Viewport.setMasked(false);
                    //Event Info
                    var menuItemInfo = me.getMenu(records, 'Event Info');
                    if (menuItemInfo != null) {
                        arrayDisplayMenuStore.push(menuItemInfo);
                    }

                    //Presenters
                    if (record.SpeakersListEvent.getCount() > 0) {
                        var menuItem = me.getMenu(records, 'Presenters');
                        if (menuItem != null) {
                            arrayDisplayMenuStore.push(menuItem);
                        }
                    }

                    //Conversation
                    var menuItemConversation = me.getMenu(records, 'Conversation');
                    if (menuItemConversation != null) {
                        arrayDisplayMenuStore.push(menuItemConversation);
                    }

                    //Notes
                    var menuItemNotes = me.getMenu(records, 'Notes');
                    if (menuItemNotes != null) {
                        arrayDisplayMenuStore.push(menuItemNotes);
                    }

                    if (record.MaterialStore.getCount() > 0) {
                        var menuItem = me.getMenu(records, 'Materials');
                        if (menuItem != null) {
                            arrayDisplayMenuStore.push(menuItem);
                        }
                    }
                    //Badge
                    if (record.get('badgeData') != '') {
                        var menuItemBadge = me.getMenu(records, 'Badge');
                        if (menuItemBadge != null) {
                            arrayDisplayMenuStore.push(menuItemBadge);
                        }
                    }

                    //Rate
                    if (currentUser && currentUser.isLogged()) {
                        var menuItemRate = me.getMenu(records, 'Rate');
                        if (menuItemRate != null) {
                            arrayDisplayMenuStore.push(menuItemRate);
                        }
                    }

                    eventMenu.setData(arrayDisplayMenuStore);
                    eventMenuList.getController().setStore(eventMenu);
                    eventMenuList.getController().setSelectedMenu(0);
                },
                scope: this
            });
        }
    },

    getMenu: function(array, string) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].get('name') == string) {
                return array[i];
            }
        }
        return null;
    },

    gotoAttendeeProfile: function(record) {
        var me = this;
        var subView = {xtype:'attendees',record:record};
        var simpleEventContent  = me.getSimpleEventContent();
        simpleEventContent.setMasked({xtype: 'loadmask'});
        simpleEventContent.removeAll(true, true);
        simpleEventContent.add(subView);
        simpleEventContent.setMasked(false);
    },

    refreshData: function(user){
        var record = this.getView().getRecord();
        if(record){
            var store = Ext.getStore('agendaStoreListMain');
            if(store){
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
                                }
                                break;
                            }
                        }
                    }
                };
            }
            this.onGetIsUserRegistered(record, user);
        }
    },

    onHideRegisterButton: function() {
        this.getRegisteredText().hide();
        this.getRegisterButton().hide();
        this.getAddToCartButton().hide();
        var record = this.getView().getRecord(),
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            currentDate = new Date(),
            endDate = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));

        if(currentDate > endDate || record.get('registered') || record.get('meetingTag') == 'Sold Out' || record.get('meetingTag') == 'Cancelled') {
            if(record.get('registered')) {
                this.getRegisteredText().show();
            }
        } else {
            var mobileRegistration = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mobileRegistration');
            if (mobileRegistration) {
                this.getAddToCartButton().show();
                if(currentUser && currentUser.get('cCType') && currentUser.get('cCNumber') &&
                    currentUser.get('cCType')!= '' && currentUser.get('cCNumber') != '') {
                    this.getRegisterButton().show();
                }
            }
        }
    },

    onBackToEventTap: function() {
        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});
        Ext.callback(function() {
            me.getView().setMasked(false);
             if (me.getFromMain()) {
                 me.getView().fireEvent('requestchangeview', 'Personify.view.EventAndEventDetail', null, 'Events', 'eventmenuitem');
             } else {
                 me.getView().fireEvent('backtoevent');
             }
        }, me, [], 500);

    },

    onTapRegisterButton: function() {
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
            if(record.get('meetingTag') == "Wait List"){
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
            Personify.utils.ItemUtil.needToLogin();
        }
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
                ConfirmOrder: "false",
                Quantity: 1
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
            var panel = Ext.create('Personify.view.store.OrderPanel');
            panel.getController().setProduct(record);
            panel.getController().setIsProductEvent(true);
            panel.getController().getOrderTemplate().setStore(store);
            panel.getController().getShippingAddress().setStore(addressStore);
            if (addressStore.getCount() > 0) {
                panel.getController().getShippingAddress().select(0);
            }
            Ext.Viewport.add(panel);
            panel.show();
            panel.getController().setCallback({ fn: me.onRegisteredSuccess, scope: me });
        }});
    },

    onRegisteredSuccess: function() {
        var me = this;
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event List');
        }
        var parent = me.getView().getParent();
        me.getView().fireEvent('updatemeetinglist');
        if(parent){
            parent.fireEvent('updatemeetinglist');
        }

        Ext.callback(function() {
            me.getView().fireEvent('backtoevent');
        }, me, [], 1);
    },

    setBackToEventButtonText: function(text) {
        if(text) {
            this.getBackToEventButton().setText(text);
        }
    },

    refreshMySchedule: function(){
        this.getView().fireEvent('refreshmyschedule');
        this.getView().getParent().fireEvent('updateagendalist');
    },

    getObjectDelectMeetingAgenda: function(record, view){
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var viewRecord = this.getView().getRecord();
        var me = this;
        var proxy = {
            type: 'ajax',
            method: 'GET',
            url: Personify.utils.ServiceManager.getUrlWS('eventGetDeleteMeetingAgenda') + record.get('appointmentId'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'd'
            }
        }
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var customerMeetingAgendaStoreName = storeManager.getObjectDeleteMeetingAgenda();
        var customerMeetingAgenda = Ext.create(customerMeetingAgendaStoreName);
        customerMeetingAgenda.setProxy(proxy);
        customerMeetingAgenda.load({
            callback: function(records, operation, success) {
                if(records.length > 0){
                    var currentUser = Personify.utils.Configuration.getCurrentUser();
                    var recordsResponse = records[0];
                    var attributes = {
                        "EntityGUID":recordsResponse.get('entityGUID'),
                        "AppointmentId": recordsResponse.get('appointmentId'),
                        "OrganizationId": recordsResponse.get('organizationId'),
                        "OrganizationUnitId": recordsResponse.get('organizationUnitId'),
                        "MasterCustomerId": currentUser.get('masterCustomerId'),
                        "SubCustomerId": currentUser.get('subCustomerId'),
                        "AddedBy": recordsResponse.get('addedBy'),
                        "AddedOn":Personify.utils.ItemUtil.formatDateMSMySchedule(recordsResponse.get('addedOn')),
                        "AppointmentDescription": record.get('shortDescription'),
                        "AppointmentEndDateTime": Personify.utils.ItemUtil.formatDateTimeSession(record.get('endDateTime')),
                        "AppointmentStartDateTime": Personify.utils.ItemUtil.formatDateTimeSession(record.get('startDateTime')),
                        "AppointmentTitle": record.get('shortName'),
                        "AppointmentTypeCodeString": "Meeting",
                        "AvailableToOrders": recordsResponse.get('availableToOrders'),
                        "ChangedBy":recordsResponse.get('changedBy'),
                        "ChangedOn": Ext.Date.format(new Date(), "c"),
                        "ConcurrencyId": recordsResponse.get('concurrencyId'),
                        "MeetingParentProductCode":"",
                        "MeetingProductCode":"",
                        "MeetingProductId": viewRecord.get('productID'),
                        "SessionFee": record.get('price'),
                        "sessionLocation": record.get('location'),
                        "SessionParentProductCode":"",
                        "SessionProductCode":"",
                        "SessionProductId": record.get('sessionID'),
                        "SessionTrackCode":"",
                        "SessionTypeCode":"",
                        "SpeakerName":""
                    }
                    me.saveDeleteMeetingAgenda(attributes, record, view);
                }else{
                    Ext.Msg.alert('', 'Cannot get agenda information to delete.');
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        });
    },

    saveDeleteMeetingAgenda: function(attributes, record, view) {
        var recordView = this.getView().getRecord();
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var saveMeetingAgendaStoreName = storeManager.getSaveDeleteMeetingAgenda();
        var customerMeetingAgenda = Ext.create(saveMeetingAgendaStoreName);
        customerMeetingAgenda.setDataRequest(attributes);
        customerMeetingAgenda.load({
            callback: function(records, operation, success) {
                if(success) {
                    if (record.get('isAdded')) {
                        record.set('isAdded', false);
                    }

                    if (recordView.get('isAdded')) {
                        recordView.set('isAdded', false);
                    }

                    if(recordView.MeetingAgendaStore){
                        recordView.MeetingAgendaStore.each(function(recordAgenda){
                            if(recordAgenda.get('appointmentId') == record.get('appointmentId')){
                                recordView.MeetingAgendaStore.remove(recordAgenda);
                            }
                        });
                    }
                    view.getController().setRecord(record);
                    me.refreshMySchedule();
                    Ext.Msg.alert('', 'Meeting has been removed.');
                } else {
                    Ext.Msg.alert('', 'Error occurred while deleting agenda.');
                }
                Ext.Viewport.setMasked(false);
            },
            scope: this
        })
    }
});

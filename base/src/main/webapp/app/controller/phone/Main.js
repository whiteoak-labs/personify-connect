Ext.define('Personify.controller.phone.Main', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser', 'shoppingCartStore', 'notificationStore'],

    config: {
        currentUser: null,
        notificationStore: null,
        shoppingCartStore: null,
        countLoad: 0,
        maxCount: 4
    },

    control: {
        view: {
            painted: 'onPainted'
        },
        mainNavigationView: {
            animationend: 'onAnimationEnded',
            activeitemchange: 'onActiveViewChange'
        },
        viewWithBanner: {
            requestchangeview: 'onRequestChangeView'
        },
        menuBar: {
            requestchangeview: 'onRequestChangeViewDelay',
            backtomain: 'onBackToMainDelay',
            checkoutshoppingcart: 'onTapCartItemCheckout'
        }
    },

    init: function(){
    	if(Ext.os.is.Android){
    		window.plugins.androidHelper.setPortrait();
    	}

        Ext.Viewport.addListener('keyboardhide', this.onHideKeyBoard, this);
        Ext.Viewport.addListener('keyboardshow', this.onShowKeyBoard, this);
        this.onUpdateCurrentUser(Personify.utils.Configuration.getCurrentUser());
    },

    onHideKeyBoard: function() {
        this.getMenuBar().setHidden(false);
        this.getMainNavigationView().setStyle('margin-bottom:0px;');
    },

    onShowKeyBoard: function() {
        this.getMenuBar().setHidden(true);
        this.getMainNavigationView().setStyle('margin-bottom:-52px;');
    },

    onPainted: function() {
        var me = this;
        var delaySplashScreen = function() {
            navigator.splashscreen.hide();
        };
        Ext.callback(delaySplashScreen, me, [], 1000);
    },

    openView: function(view, config, title, css) {
        var me = this;
        me.getMenuBar().getController().closeMenuBar();

        if (config && config != null) {
            if (config.record.get('neededLogin') && !this.getCurrentUser().isLogged()) {
                Personify.utils.ItemUtil.needToLogin();
                return;
            }
        }

        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }

        view.addListener('back', this.onBack, this);
        view.addListener('loggedout', this.onLogout, this);
        view.addListener('backtomain', this.onBackToMainDelay, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('removeagenda', this.getObjectDelectMeetingAgenda, this);
        view.addListener('addagenda', this.addNewCustomerMeetingAgenda, this);
        view.addListener('refreshagenda', this.onUpdateMySchedule, this);
        view.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);
        view.addListener('setTextNotiBtnPhone', this.setTextNotiBtnPhone, this);
        view.addListener('enableBtnOpenNotificationPhone', this.enableBtnOpenNotificationPhone, this);

        if (config && config != null) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var mainNavigationView = this.getMainNavigationView();

        if (view.getItemId() != 'login' && view.xtype != 'panelNotificationPhone') {
            this.onBackToMain();
        }

        if (mainNavigationView.getActiveItem().xtype != view.xtype) {
            var activeItem = mainNavigationView.getActiveItem();
            var activeItemIndex = mainNavigationView.getInnerItems().indexOf(activeItem);

            if (view.xtype == 'loginPhone' && activeItemIndex != 0) {
                activeItem.getController().openView(view, config);
            } else {
                mainNavigationView.add(view);
           
               // Adjust toolbar height when running in iOS to fit with new iOS 7 style
               if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
                    Ext.select(".p-toolbar-container").applyStyles("height: 62px; padding-top: 15px;");
               }
           
                mainNavigationView.animateActiveItem(view, {
                    type: 'slide',
                    direction: 'left',
                    duration: 100,
                    listeners: {
                        animationend: function() {
                            me.onAnimationEnded(view);
                        }
                    }
                });
            }
        }

        if(view.getItemId().indexOf("panelNotificationPhone") > 0) {
            this.openNotificationsPhone(view);
        } else {
            this.getMenuBar().getController().disableButtonNotificationPhone(false);
        }
    },

    onAnimationEnded: function(view) {
        if (view && view.getController()['onLoadData']) {
            Ext.callback(view.getController().onLoadData, view.getController(), [], 1);
        }
    },

    onActiveViewChange: function(panel, view, oldView, eOpts) {
        var activeItemIndex = panel.getInnerItems().indexOf(panel.getActiveItem());

        if (activeItemIndex == 0 || activeItemIndex == 2) {
            panel.removeAt(1);
        }
    },

    onRequestChangeViewDelay: function(view, config) {
        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});

        Ext.callback(function() {
            me.openView(view, config);
            me.getView().setMasked(false);
        }, me, [], 1);
    },

    onRequestChangeView: function(view, config) {
        this.openView(view, config);
    },

    onUpdateCurrentUser: function(user, callback) {
        this.setCurrentUser(user);
        Deft.Injector.configure({
            currentUser: {
                value: user
            }
        });

        if (!user.isLogged()) {
            this.getMenuBar().getController().setTextButtonNotificationPhone(0);
            this.getMenuBar().getController().setTextButtonShoppingCartPhone(0);
        }

        this.getViewWithBanner().getController().updateViewForUser(user);

        this.setCountLoad(0);

        if (user.isLogged()) {
            this.onUpdateMySchedule(callback);
        } else {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var store = Ext.create(agendaStoreName);
            store.setStoreId('agendaStoreListMain');
        }

        this.onUpdateEventList(callback);

        this.onLoadShoppingCartStore(callback);
        this.updateStoreNotification(callback);
    },

    callbackUpdateUser: function(callback){
        var count = this.getCountLoad();
        count++;
        this.setCountLoad(count);
        if(count == this.getMaxCount()){
            if (callback && typeof callback == 'function') {
                callback(true);
            }
        }
    },

    updateStoreNotification: function(callback) {
        var me = this,
            currentUser = me.getCurrentUser(),
            notificationStore = me.getNotificationStore();

        if(currentUser.isLogged()) {
            var masterCustomerID = currentUser.get('masterCustomerId'),
                subCustomerID = currentUser.get('subCustomerId'),
                attributesNotificationPhone = {
                    MasterCustomerID: masterCustomerID,
                    SubCustomerID: subCustomerID
                };

            notificationStore.setDataRequest(attributesNotificationPhone);
            notificationStore.load({callback: function(records, operation, success) {
                me.callbackUpdateUser(callback);
                me.updateDataLocalNotificationPhone(notificationStore);
                var task = new Ext.util.DelayedTask(function() {
                    me.updateStoreNotification();
                });
                var notificationRefresh = Personify.utils.Configuration.getConfiguration().getAt(0).HomeStore.get('notificationRefreshInterval');
                task.delay(notificationRefresh * 60 * 1000);
            }});
        } else {
            notificationStore.removeAll();
            me.updateDataLocalNotificationPhone(notificationStore);
            me.callbackUpdateUser(callback);
        }
    },

    openNotificationsPhone: function(view) {
        var me = this,
            currentUser = me.getCurrentUser(),
            notificationStore = me.getNotificationStore();

        if(currentUser.isLogged()) {
            view.getController().getNotificationsPhone().getController().getListNotificationPhone().setStore(notificationStore);
            me.getMenuBar().getController().disableButtonNotificationPhone(true);
        } else {
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },

    updateDataLocalNotificationPhone: function(notificationStore) {
        var me = this,
            countReadNotificationPhone = 0;

        Personify.utils.Sqlite.getNotification(function(result) {
            if(typeof result == 'object' && result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    notificationStore.each(function(record) {
                        if(record.get('messageId') == result[i].messageId) {
                            if(result[i].isDeleted == 1) {
                                notificationStore.remove(record);
                            } else {
                                record.set('isRead', true);
                                countReadNotificationPhone++;
                            }
                        }
                    });
                }
            }
            var count = notificationStore.getCount() - countReadNotificationPhone;
            me.getMenuBar().getController().setTextButtonNotificationPhone(count);
        });
    },

    setTextNotiBtnPhone: function(countReadNotificationPhone) {
        var notificationStore = this.getNotificationStore();
        this.getMenuBar().getController().setTextButtonNotificationPhone(notificationStore.getCount() - countReadNotificationPhone);
    },

    enableBtnOpenNotificationPhone: function() {
        this.getMenuBar().getController().disableButtonNotificationPhone(false);
    },

    onBack: function() {
        var me = this,
            mainNavigationView = me.getMainNavigationView();

        mainNavigationView.animateActiveItem(0, { type: 'slide', direction: 'right'} );

        if (mainNavigationView.getActiveItem().getItemId().indexOf("panelNotificationPhone") > 0) {
            me.getMenuBar().getController().disableButtonNotificationPhone(true);
        }
    },

    onLogout: function() {
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var userModel = modelManager.getUserModel();
        var user = Ext.create(userModel);

        Deft.Injector.configure({
            currentUser: {
                value: user
            }
        });

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.set('keepUserLogin', '', function() {}, function() {});
        }
        
        TMA.Twitter.unAuthorize();
           
        if (window.plugins.pushNotification) {
            var urbanairship = window.plugins.pushNotification;
            urbanairship.setAlias('');
        }

       Personify.utils.Sqlite.invalidateProfileCache();
        Personify.utils.Configuration.setCurrentUser(user);
        Personify.utils.Configuration.setDiscussionUrl(null);

        this.onUpdateCurrentUser(user);
        this.onBackToMainDelay();
           
        var scheduleListStore = Ext.getStore('scheduleListtingMain');
        if(scheduleListStore)
        {           
        	 scheduleListStore.removeAll();
             scheduleListStore.destroy();
        }
   
    },

    onBackToMain: function() {
        var me = this,
            mainNavigationView = me.getMainNavigationView();

        mainNavigationView.animateActiveItem(0, { type: 'slide', direction: 'right'} );
        me.getMenuBar().getController().disableButtonNotificationPhone(false);
    },

    onBackToMainDelay: function() {
        var me = this,
            mainNavigationView = me.getMainNavigationView();

        me.getView().setMasked({xtype: 'loadmask'});

        Ext.callback(function() {
            mainNavigationView.animateActiveItem(0, { type: 'slide', direction: 'right'} );
            me.getMenuBar().getController().disableButtonNotificationPhone(false);
            me.getView().setMasked(false);
        }, me, [], 500);
    },

    onUpdateEventList: function(callback){
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
           var eventItemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageEventList');
          
           
        var attributes = {
            IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
            IsMember: true,
            FromMonth: '0',
            ToMonth: '12',
            OrgID: currentUser.get('organizationId'),
            OrgUnitID:  currentUser.get('organizationUnitId'),
            MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0',
            StartIndex: 1,
            ItemsPerPage: eventItemsPerPage
        };

        var storeManager = Personify.utils.ServiceManager.getStoreManager();

        var iCalendarStoreName = storeManager.getICalendarStore();
        var store = Ext.create(iCalendarStoreName);
        var iCalendar = Ext.create(iCalendarStoreName);
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        var agendaStore = Ext.getStore('agendaStoreListMain');
        meetingStore.setStoreId('meetingListtingMain');
        iCalendar.setStoreId('iCalendarStoreMain');
        store.setDataRequest(attributes);
        store.load({
            callback: function(records, operation, success) {
                me.getView().setMasked(false);
                me.callbackUpdateUser(callback);
                if(success){
                    store.each(function(record){
                        iCalendar.add(record);
                    })
                    store.getAt(0).EventListStore.each(function(record){
                        if (agendaStore) {
                            for (var i = 0; i < agendaStore.getCount(); i++) {
                                var recordAgenda = agendaStore.getAt(i);
                                if (recordAgenda.get('type') != 'PERSONAL') {
                                    if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0") {
                                        if (recordAgenda.get('meetingId') == record.get('productID')) {
                                            if (!record.get('isAdded')) {
                                                record.set('isAdded', true);
                                            }
                                            break;
                                        }
                                    }
                                }
                            };
                        }

                        meetingStore.add(record);
                    });
                }
            },
            scope: this
        });
    },

    onUpdateMySchedule: function(callback, appointmentId){
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var agendaStoreName = storeManager.getAgendaStore();
        var store = Ext.create(agendaStoreName);
        store.setStoreId('agendaStoreListMain');
        if(currentUser && currentUser.isLogged()){
            if(window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Agenda List');
            }
            var attributes = {
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
                MeetingID: ''
            };
            store.setDataRequest(attributes);
            store.load({
                callback: function(records, operation, success) {
                    if (success) {
                        if (callback && appointmentId && typeof callback === 'function') {
                            callback(success, appointmentId, records);
                        } else {
                            me.callbackUpdateUser(callback);
                        }
                    } else {
                        me.callbackUpdateUser(callback);
                    }

                    me.getView().setMasked(false);
                },
                scope: this
            });
        }else{
            me.callbackUpdateUser(callback);
            store.setData([]);
        }
    },

    getObjectDelectMeetingAgenda: function(record, callback){
        Ext.Viewport.setMasked({xtype: 'loadmask'});
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
        var startTime = '';
        var endTime = '';

        if (record.get('eventType')) {
            startTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
            endTime = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'))
        } else {
            if (record.get('startDateTimeString')) {
                startTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'));
                endTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('endDateTimeString'))
            } else {
                startTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTime'));
                endTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('endDateTime'))
            }
        }

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
                        "ChangedBy":recordsResponse.get('changedBy'),
                        "AddedOn":Personify.utils.ItemUtil.formatDateMSMySchedule(recordsResponse.get('addedOn')),
                        "AppointmentDescription": record.get('description'),
                        "AppointmentEndDateTime": endTime,
                        "AppointmentStartDateTime": startTime,
                        "AppointmentTitle": record.get('title'),
                        "AppointmentTypeCodeString": "Meeting",
                        "AvailableToOrders": recordsResponse.get('availableToOrders'),
                        "ChangedBy" : "",
                        "ChangedOn": Ext.Date.format(new Date(), "c"),
                        "ConcurrencyId": recordsResponse.get('concurrencyId'),
                        "MeetingParentProductCode":"",
                        "MeetingProductCode":"",
                        "MeetingProductId": record.get('meetingId'),
                        "SessionFee": record.get('price'),
                        "sessionLocation": record.get('location'),
                        "SessionParentProductCode":"",
                        "SessionProductCode":"",
                        "SessionProductId": record.get('sessionID'),
                        "SessionTrackCode":"",
                        "SessionTypeCode":"",
                        "SpeakerName":""
                    }
                    me.saveDeleteMeetingAgenda(attributes, record, callback);
                }else{
                    Ext.Msg.alert('', 'Cannot get agenda information to delete.');
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        });
    },

    saveDeleteMeetingAgenda: function(attributes, record, callback){
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var saveMeetingAgendaStoreName = storeManager.getSaveDeleteMeetingAgenda();
        var customerMeetingAgenda = Ext.create(saveMeetingAgendaStoreName);
        customerMeetingAgenda.setDataRequest(attributes);
        customerMeetingAgenda.load({
            callback: function(records, operation, success) {
                if (success) {
                    me.onUpdateMySchedule(callback, true);
                    var eventsStore = Ext.getStore('meetingListtingMain');

                    if (eventsStore) {
                        for (var i = 0; i < eventsStore.getCount(); i++) {
                            var eventRecord = eventsStore.getAt(i);

                            if (record.get('type') != 'PERSONAL') {
                                if (!record.get('sessionID') || record.get('sessionID') == "" || record.get('sessionID') == "0") {
                                    if (record.get('meetingId') == eventRecord.get('productID')) {
                                        if (eventRecord.get('isAdded')) {
                                            eventRecord.set('isAdded', false);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    Ext.Msg.alert('', 'Error occurred while deleting agenda.');
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        })
    },

    addNewCustomerMeetingAgenda: function(record, eventId, callback) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var sessionId = record.get('sessionID');

        if (sessionId) {
            currentUser.addSessionToSchedule(record, eventId).then({
                    success: function(recordsResponse) {
                        var appointmentId = true;

                        if (recordsResponse) {
                            appointmentId = recordsResponse.get('appointmentId');
                        }
                        me.onUpdateMySchedule(callback, appointmentId);
                    },
                    failure: function() {
                        Ext.Msg.alert('', 'Error occurred while adding to your schedule.');
                    }
                }).always(
                function() {
                    Ext.Viewport.setMasked(false);
                }
            );
        } else {
            currentUser.addEventToSchedule(record).then({
                    success: function(recordsResponse) {
                        var appointmentId = true;

                        if (recordsResponse) {
                            appointmentId = recordsResponse.get('appointmentId');
                        }
                        me.onUpdateMySchedule(callback, appointmentId);
                    },
                    failure: function() {
                        Ext.Msg.alert('', 'Error occurred while adding to your schedule.');
                    }
                }).always(
                function() {
                    Ext.Viewport.setMasked(false);
                }
            );
        }
    },

    onLoadShoppingCartStore: function(callback) {
        var me = this,
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            masterCustomerId = null,
            subCustomerId = null,
            storeShoppingCart = this.getShoppingCartStore();

        if (currentUser && currentUser.isLogged()) {
            masterCustomerId = currentUser.get('masterCustomerId'),
            subCustomerId = currentUser.get('subCustomerId');

            var requestPayload = {
                "MasterCustomerId": masterCustomerId,
                "SubCustomerId": subCustomerId
            };

            storeShoppingCart.setDataRequest(requestPayload);
            storeShoppingCart.load({callback: function(records, operation, success) {
                if (success) {
                    me.callbackUpdateUser(callback);
                    Deft.Injector.configure({
                        shoppingCartStore: {
                            value: storeShoppingCart
                        }
                    });
                } else {
                    var task = new Ext.util.DelayedTask(function() {
                        me.onLoadShoppingCartStore(callback);
                    }, me);
                    task.delay(30 * 1000);
                    me.callbackUpdateUser(callback);
                }
            }});
        } else {
            me.callbackUpdateUser(callback);
        }
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
            Ext.Viewport.setMasked({ xtype: 'loadmask' });
            currentUser.loadShoppingCartUrl().then({
                success: function(url) {
                    var ref = null;
                    if (window.plugins.childBrowser) {
                        window.plugins.childBrowser.clearCookies();
                    }

                    if (Ext.os.is.Android) {
                        ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    } else {
                        ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
                    }
                   Personify.utils.BackHandler.pushActionAndTarget('close', ref);
                    ref.addEventListener('exit', function() {
                        Ext.callback(me.setTotalItemCheckout, me);
                         Personify.utils.BackHandler.popActionAndTarget('close', ref);
                    });
                },
                failure: function() {
                    Ext.Msg.alert('', 'Cannot check out shopping cart.');
                }
            }).always(function() {
                    Ext.Viewport.setMasked(false);
                });
        } else {
            Personify.utils.ItemUtil.needToLogin();
        }
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

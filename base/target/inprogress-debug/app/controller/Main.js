Ext.define('Personify.controller.Main', {
    extend: 'Personify.base.Controller',
    inject: ['personify', 'currentUser', 'shoppingCartStore', 'notificationStore'],
    requires: [
        'Personify.view.community.CommunityPanel',
        'Personify.view.Home',
        'Personify.view.Directory',
        'Personify.view.Store',
        'Personify.view.Profile',
        'Personify.view.main.Notifications',
        'Personify.model.base.MenuItem'
    ],

    config: {
        currentUser: null,
        personify: null,
        shoppingCartStore: null,
        agendaListStore: null,
        notificationStore: null
    },

    control: {
        headerPanel: {
        },
        loginPanel: {
            userlogin: 'onUserLoggedIn',
            requestchangeview: 'onRequestChangeView'
        },
        menuBar: {
            openselectview: 'onRequestChangeView',
            onNotificationButton: 'onNotificationButton',
            ontapcartitemcheckout: 'onTapCartItemCheckout'
        },
        labelTitle: {},
        viewPanel: {
            copymeetinglist: 'onCopyMeetingList',
            updatemeetinglist: 'onUpdateEventList',
            copyagendalist: 'onCopyScheduleList',
            updateagendalist: 'onUpdateMySchedule'
        },
        connectButton: {
            tap: 'onConnectButtonTap'
        },
        lastNewsPanel: {},
        iconHeader: {},
        view: {
            painted: 'onPainted'
        }
    },

    init: function() {
        console.log('Main.init: start');
        var me = this;
        me.updateViewModules();

        var user = Personify.utils.Configuration.getCurrentUser();

        if (user.isLogged()) {
            me.onUserLoggedIn(user);
        } else {
            me.getView().setMasked({xtype: 'loadmask'});
            me.setAgendaListStore(null);
            me.onUpdateEventList(function(calendarStore) {
                var view = me.getViewPanel().getActiveItem();
                view.getController().getNextThreeEventList().getController().onUpdateEventList(calendarStore);
                me.getView().setMasked(false);
            });
        }

        Ext.Viewport.addListener('keyboardhide', me.onHideKeyBoard, me);
        Ext.Viewport.addListener('keyboardshow', me.onShowKeyBoard, me);

        window.addEventListener("lockoutView",function() {
            var currentUser = me.getCurrentUser();
            if(currentUser.isLogged()) {
                var lockoutView = Ext.create("Personify.view.LoginForm", {
                    hidden: true,
                    modal: true,
                    hideOnMaskTap: true,
                    centered:true
                });

                Ext.Viewport.add(lockoutView);
                lockoutView.show();
            }
        },false);
        me.getLabelTitle().addCls('homemenuitem');
        
        console.log('Main.init: hide splashscreen');
        navigator.splashscreen.hide();

        return me.callParent(arguments);
    },

    onHideKeyBoard: function() {
        this.getMenuBar().setHidden(false);
        this.getViewPanel().setStyle('margin-bottom: 52px;');
    },

    onShowKeyBoard: function() {
        this.getMenuBar().setHidden(true);
        this.getViewPanel().setStyle('margin-bottom: 0px;');
    },

    onPainted: function() {
        console.log('Main.onPainted:');
        navigator.splashscreen.hide();
    },

    onUserLoggedIn: function(user) {
        var me = this;

        if (Ext.Viewport.getOrientation() == 'landscape') {
            var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: 'p-loading-ipad-landscape'};
        } else {
            var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: 'p-loading-ipad-portrait'};
        }

        Ext.Viewport.setMasked(mask);

        Deft.Injector.configure({
            currentUser: {
                value: user
            }
        });

        me.setCurrentUser(user);
        me.updateViewModules();
        me.getLastNewsPanel().getController().onUpdateLastNews();

        me.onLoadNotification();
        me.onUpdateMySchedule(true);
        me.setTotalItemCheckout();

        var view = me.getViewPanel().getActiveItem();

        if (view.getItemId() == 'homeView') {
           view.getController().getNextThreeEventList().getController().onUpdateEventList(null);
            me.onUpdateEventList(function(calendarStore) {
                Ext.Viewport.setMasked(false);
                view.getController().getNextThreeEventList().getController().onUpdateEventList(calendarStore);
            });

            view.getController().setCurrentUser(user);
            view.getController().onLoadMenu();
        } else if (view.getItemId().indexOf("eventAndEventDetailPage") < 0) {
            me.onUpdateEventList(function() {
                Ext.Viewport.setMasked(false);
            });
        } else {
            Ext.Viewport.setMasked(false);
        }
        me.getMenuBar().getController().closeMenuBar();
    },

    onRequestChangeView:function(view, config, title, css) {
        var me = this;
        Ext.callback(function() {
            me.openView(view, config, title, css);
        }, me, [], 1);
    },

    openView: function(view, config, title, css) {
        if (config) {
            if (config.record) {
                if (config.record.get('neededLogin') && !this.getCurrentUser().isLogged()) {
                    Personify.utils.ItemUtil.needToLogin();
                    return;
                }
            }
        }

        if (view == "Personify.view.Profile") {
            this.getLoginPanel().hide();
            this.getLabelTitle().setCls('profilemenuitem');
        } else {
            this.getLoginPanel().show();
            this.getLabelTitle().setCls('labelTitleHeaderPanel');
        }

        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }

        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('updatetitle', this.updateTitle, this);

        if (config) {
            var listeners = config.listeners;

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var viewPanel = this.getViewPanel();
        viewPanel.removeAll(true, true);
        viewPanel.add(view);

        this.getMenuBar().getController().getMenubarListItems().hide();
        this.getMenuBar().getController().resetSelectedButton();
        this.getLabelTitle().setHtml(title);
        this.getIconHeader().setCls('p-image-iconheaderurl' + ' ' + css);
        this.getIconHeader().setHidden(false);
    },

    updateViewModules: function() {
        var me = this;
        var updateMainMenuCallback = function(store) {
            me.getMenuBar().getController().updateMenuList(store);
        };
        var viewModules = me.getCurrentUser().modulesConfigurationLoad('tablet', updateMainMenuCallback, me);
    },

    logout: function() {
        var modelManager = Personify.utils.ServiceManager.getModelManager();
        var userModel = modelManager.getUserModel();
        var user = Ext.create(userModel);
        Deft.Injector.configure({
            currentUser: {
                value: user
            }
        });

        this.setCurrentUser(user);
       Personify.utils.Sqlite.invalidateProfileCache();
        Personify.utils.Configuration.setCurrentUser(user);
        Personify.utils.Configuration.setDiscussionUrl(null);
        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.set('keepUserLogin', '', function() {}, function() {});
        }

        TMA.Twitter.unAuthorize();

        this.updateViewModules();
        this.onChangeNotificationLabel('0');
        this.openView('Personify.view.Home', null, 'Main', 'homemenuitem');
        this.getLoginPanel().getController().resetViews();

        //set number item shopping cart
        Ext.Array.each(Ext.ComponentQuery.query('#totalItemCheckout'), function(button) {
            button.setHtml(0)
        });

        if (window.plugins.pushNotification) {
            var urbanAirship = window.plugins.pushNotification;
            urbanAirship.setAlias('');
        }

        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});
        me.onUpdateEventList(function(calendarStore) {
            var view = me.getViewPanel().getActiveItem();
            view.getController().getNextThreeEventList().getController().onUpdateEventList(calendarStore);
            me.getView().setMasked(false);
        });
    },

    onNotificationButton: function() {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var logged = currentUser? currentUser.isLogged(): false;
        if(!logged) {
            Personify.utils.ItemUtil.needToLogin();
        } else {
            var notiStore = me.getNotificationStore();
            var panel = Ext.Viewport.add({xtype: 'notificationview'});
            panel.on({
                disablenotificationbutton: {fn: me.disableNotificationButton, scope: me},
                changenotificationlabel: {fn: me.onChangeNotificationLabel, scope: me}
            });
            panel.getController().getNotification().setStore(notiStore);
            if(notiStore != null) {
                panel.getController().getLblNumberNoti().setHtml(notiStore.getAllCount());
                me.getLocalNotificationData(notiStore, panel.getController().getLblNumberNoti());
            }
            panel.show();
            me.disableNotificationButton(true);
        }
    },

    getLocalNotificationData: function(notiStore, label) {
        var me = this;
        var countRead = 0;

        Personify.utils.Sqlite.getNotification(function(result) {
            if (typeof result == 'object' && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    notiStore.each(function(record) {
                        if (record.get('messageId') == result[i].messageId) {
                            if (result[i].isDeleted == 1) {
                                notiStore.remove(record);
                            } else {
                                record.set('isRead', true);
                                countRead++;
                            }
                        }
                    });
                }
                me.getMenuBar().getController().setNotificationButton(notiStore.getCount() - countRead);
                if (label) {
                    label.setHtml(notiStore.getCount() - countRead + ' unread of ' + notiStore.getAllCount());
                }
            }
        });
    },

    onChangeNotificationLabel: function(value) {
        this.getMenuBar().getController().setNotificationButton(value);
    },

    disableNotificationButton: function(value) {
        this.getMenuBar().getController().disableNotificationButton(value);
    },

    updateTitle: function(title, css, isClearMask) {
        var me = this;
        if (typeof(css) == 'object') {
            me.getIconHeader().setHidden(true);
        } else {
            me.getIconHeader().setHidden(false);
        }
        this.getLabelTitle().setHtml(title);
        this.getLabelTitle().setCls('labelTitleHeaderPanel' + ' ' + css);
        if(isClearMask == true){
            Ext.Viewport.setMasked(false);
        }
    },

    onCopyMeetingList: function(store, iCalendarStore){
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var iCalendarStoreName = storeManager.getICalendarStore();
        var iCalendar = Ext.create(iCalendarStoreName);
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);

        var user = Personify.utils.Configuration.getCurrentUser();

        if (!user.isLogged()) {
            this.setAgendaListStore(null);
        }

        var agendaStore = this.getAgendaListStore();

        store.each(function(record) {
            if (agendaStore) {
                for (var i = 0; i < agendaStore.getCount(); i++) {
                    var recordAgenda = agendaStore.getAt(i);

                    if (recordAgenda.get('type') != 'PERSONAL') {
                        if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0"){
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

            meetingStore.add(record);
        });

        iCalendarStore.each(function(record){
            iCalendar.add(record);
        });

        meetingStore.setStoreId('meetingListtingMain');
        iCalendar.setStoreId('iCalendarStoreMain');
    },

    clearData: function() {
        this.setAgendaListStore(null);
    },

    onCopyScheduleList: function(store){
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var agendaStoreName = storeManager.getAgendaStore();
        var agendaStore = Ext.create(agendaStoreName);
        store.each(function(record){
            record.set('isAdded', true);
            agendaStore.add(record);
        });

        this.setAgendaListStore(agendaStore);
        agendaStore.setStoreId('agendaStoreListMain');
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
                if (success) {
                    Deft.Injector.configure({
                        shoppingCartStore: {
                            value: storeShoppingCart
                        }
                    });
                } else {
                    var task = new Ext.util.DelayedTask(function() {
                        me.setTotalItemCheckout();
                    }, me);
                    task.delay(30 * 1000);
                }
            }});
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
                        ref = window.open(url, '_blank', 'location=no,enableViewportScale=yes');
                    }
                    ref.addEventListener('exit', function() {
                        Ext.callback(me.setTotalItemCheckout, me);
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

    onUpdateEventList: function(callback, scope) {
        var me = this;

        Ext.callback(function() {
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            var config = me.getPersonify().first().ConfigStore.DefaultListingParamsStore.getAt(0);
            var attributes = {
                IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
                IsMember: true,
                FromMonth: '1',
                ToMonth: '12',
                OrgID: (currentUser && currentUser.isLogged())? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: (currentUser && currentUser.isLogged())? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0'
            };
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var iCalendarStoreName = storeManager.getICalendarStore();
            var store = Ext.create(iCalendarStoreName);

            store.setDataRequest(attributes);
            store.load({
                callback: function(records, operation, success) {
                    if (success) {
                        me.onCopyMeetingList(store.getAt(0).EventListStore, store);
                    } else {
                        Personify.utils.ItemUtil.cantLoadEvent();
                    }

                    if (callback) {
                        Ext.callback(callback, scope, [store]);
                    }

                    Ext.Viewport.setMasked(false);
                },
                scope: me
            });
        });
    },

    onUpdateMySchedule: function(isLogin){
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()){
            if(window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Agenda List');
            }
            var me = this;
            var attributes = {
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
                MeetingID: ''
            };
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var store = Ext.create(agendaStoreName);
            store.setDataRequest(attributes);
            store.load({
                callback: function(records, operation, success) {
                    me.onCopyScheduleList(store);

                    if(isLogin == true){
                        me.getView().fireEvent('userlogin', currentUser);
                        me.getView().setMasked(false);
                    }
                },
                scope: me
            });
        }
    },

    onConnectButtonTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;

            Ext.callback(function(){
                me.openView('Personify.view.Home', null, 'Main', 'homemenuitem');
            }, me, [], 1);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onLoadNotification: function() {
        var me = this;
        var currentUser = me.getCurrentUser();
        if (!currentUser.isLogged()) {
            return;
        }
        var masterCustomerID = currentUser.get('masterCustomerId');
        var subCustomerID = currentUser.get('subCustomerId');
        var attributesNoti = {
            MasterCustomerID: masterCustomerID,
            SubCustomerID: subCustomerID
        };

        var notiStore = me.getNotificationStore();

        notiStore.setDataRequest(attributesNoti);
        notiStore.load({callback: function(records, operation, success) {
            me.setNotificationStore(notiStore);
            me.getMenuBar().getController().setNotificationButton(notiStore.getAllCount());
            me.getLocalNotificationData(notiStore);
            var task = new Ext.util.DelayedTask(function() {
                me.onLoadNotification();
            });
            var notificationRefresh = Personify.utils.Configuration.getConfiguration().getAt(0).HomeStore.get('notificationRefreshInterval');
            task.delay(notificationRefresh * 60 * 1000);
        }});

        Deft.Injector.configure({
            notificationStore: {
                value: notiStore
            }
        });
    }
});

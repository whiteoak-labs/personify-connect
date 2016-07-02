Ext.define('Personify.controller.event.complexevent.ComplexEvent',{
    extend: 'Personify.base.Controller',
    config: {
        countLoad: 0,
        maxCountLoad: 1,
        defaultView: 'sessionsAndDetail',
        fromSchedule: false,
        curSchedule: null,
        fromMain: false
    },
    control: {
        twitterPanel: true,
        menuPanel: {
            onMenuItemTapped: 'onEventMenuItemSelected'
        },
        complexEventScheduleContent: {
            gotoAttendeeProfile: 'gotoAttendeeProfile',
            addsessiontoagenda: 'addNewCustomerMeetingAgenda',
            deletesession: 'getObjectDelectMeetingAgenda',
            refreshmyschedule: 'refreshDataAgenda',
            openaddpersonal: 'onAddPersonalTap'
        },

        registeredText:{

        },
        backToEventButton:{
            tap: 'onBackToEventTap'
        }
    },//control

    init: function() {
        var record = this.getView().getRecord();
        if (record) {
            this.getAllDataOfChild(record);
        }
           
    },

    initView: function() {
        var record = this.getView().getRecord();

        if (this.getView().getFromMain()) {
            this.setFromMain(this.getView().getFromMain());
        }

        if (record.MeetingAgendaStore) {
            record.MeetingAgendaStore.each(function(agenda) {
                for (var i = record.SessionStore.getCount() - 1; i >= 0; i--) {
                    var session = record.SessionStore.getAt(i);

                    if (agenda.get('sessionID') == session.get('sessionID')) {
                        session.set('appointmentId', agenda.get('appointmentId'));
                        break;
                    }
                }
            });
        }

        this.getTwitterPanel().updateRecord(record);

        if(record.get('registered')) {
            this.getRegisteredText().show();
        } else {
            this.getRegisteredText().hide();
        }
        this.onloadMenu(record, record.get('registered'));
        Ext.Viewport.setMasked(false);
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            if (!record.MeetingRegistrantStore) {
                this.onGetMeetingRegistrantData(record, currentUser);
            }
        }

        if (!record.ExhibitorStore) {
            this.onGetExhibitorData(record, currentUser);
        }

        var view = this.getComplexEventScheduleContent().getActiveItem();

        if (view.getItemId() == 'sessionsAndDetail') {
            view.getController().setRecord(record, record);
        }
    },

    getAllDataOfChild: function(record, view){

        if(view){
            this.setDefaultView(view);
        }
        this.setFromSchedule(false);
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        var loadCount = 1;

        if (currentUser && currentUser.isLogged()) {
            if (record.get('registered')) {
                loadCount = 2;
            } else {
                loadCount = 3;
            }
        }

        this.setMaxCountLoad(loadCount);
        this.setCountLoad(0);

        if (record.SessionStore) {
            this.removeMask();
        } else {
            this.onGetSesstionListData(record, currentUser);
        }

        if (currentUser && currentUser.isLogged()) {
            this.onGetMeetingAgendaData(record, currentUser);

            if (!record.get('registered')) {
                this.onGetIsUserRegistered(record, currentUser);
            }
        }
    },

    getAllDataOfChildAndGoToSession: function(recordEvent, view, record) {
          
        var me = this;
        if (view) {
            this.setDefaultView(view);
        }
        this.setFromSchedule(true);
        this.setCurSchedule(record);
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        var loadCount = 1;

        if (currentUser && currentUser.isLogged()) {
            if (recordEvent.get('registered')) {
                loadCount = 2;
            } else {
                loadCount = 3;
            }
        }

        this.setMaxCountLoad(loadCount);
        this.setCountLoad(0);

        if (recordEvent.SessionStore) {
            if (record.get('sessionID')) {
                var sessionStore = recordEvent.SessionStore;
                sessionStore.each(function(item) {
                    if (item.get('sessionID') && item.get('sessionID') == record.get('sessionID')) {
                        me.setCurSchedule(item);
                    }
                });
            }
            me.removeMask();
        } else {
            this.onGetSesstionListData(recordEvent, currentUser, record);
        }

        if (currentUser && currentUser.isLogged()) {
            this.onGetMeetingAgendaData(recordEvent, currentUser);

            if (!recordEvent.get('registered')) {
                this.onGetIsUserRegistered(recordEvent, currentUser);
            }
        }
    },

    removeMask: function(){
        var count = this.getMaxCountLoad();
        this.setCountLoad(this.getCountLoad() + 1);
        if(this.getCountLoad() == count){
            this.initView();
        }
    },

    onGetSesstionListData: function(record, currentUser, sessionRecord) {

        //alert('onGetSesstionListData');
        var me = this;
        var attributes = {
            "MeetingID": record.get('productID'),
            "IsStaffMember": currentUser? currentUser.isStaffMember().toString() : false,
            "IsMember": currentUser ? currentUser.isMember().toString() : false,
            "ItemsPerPage": "100000",
           "StartIndex": "0",
           "MasterCustomerID": currentUser? currentUser.get('masterCustomerId'): '' ,
           "SubCustomerID": currentUser? currentUser.get('subCustomerId'): '0'
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var storeSessionName = storeManager.getSessionStore();
        var storeSession = Ext.create(storeSessionName);
        storeSession.setDataRequest(attributes);
        record.SessionStore = storeSession;
        storeSession.load({ scope: me, callback: function() {
            if (sessionRecord) {
                if (sessionRecord.get('sessionID')) {
                    storeSession.each(function(item) {
                        if (item.get('sessionID') && item.get('sessionID') == sessionRecord.get('sessionID')) {
                            me.setCurSchedule(item);
                        }
                    });
                }
            }
            me.removeMask();
        }});
    },

    onGetMeetingAgendaData: function(record, currentUser){
        var me = this;
        if(currentUser && currentUser.isLogged()){
            var masterCustomerId = currentUser.get('masterCustomerId');
            var subCustomerId = currentUser.get('subCustomerId');
            var attributes = {
                "SubCustomerID": subCustomerId,
                "MeetingID": record.get('productID'),
                "MasterCustomerID": masterCustomerId
            };
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var agendaStore = Ext.create(agendaStoreName);
            agendaStore.setDataRequest(attributes);
            record.MeetingAgendaStore = agendaStore;
            agendaStore.load({ scope: me, callback: me.removeMask });
        }
    },

    onGetMeetingRegistrantData: function(record, currentUser){
        var me = this;
        var attributes = {
            IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
            ItemsPerPage: "10000",
            MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
            ProductID: record.get('productID'),
            StartIndex: "0"
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var attendeeName = storeManager.getAttendeeStore();
        var attendeeStore = Ext.create(attendeeName);
        attendeeStore.setDataRequest(attributes);
        record.MeetingRegistrantStore = attendeeStore;
        attendeeStore.load();
    },

    onGetExhibitorData: function(record, currentUser) {
        if (!record.ExhibitorStore) {
            var me = this;
            var attributes = {
                    "ItemsPerPage": "100000",
                    "XbtID": record.get('xbtProductID'),
                    "XbtParentProduct": record.get('xbtParentProduct'),
                    "StartIndex": "0",
                    "XbtProductCode": record.get('xbtProductCode')
                };
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var exhibitorStore = storeManager.getExhibitorStore();
            var storeExhibitor = Ext.create(exhibitorStore);
            var storeMyExhibitor = Ext.create(exhibitorStore);

            storeExhibitor.setDataRequest(attributes);
            record.ExhibitorStore = storeExhibitor;

            storeExhibitor.load({scope: me, callback: function(records, operation, success) {
                me.getAllExhibitorFromSql(record, currentUser, storeExhibitor);
            }});
        }
    },

    getAllExhibitorFromSql: function(record, currentUser, exhibitorStore) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var exhibitorStoreName = storeManager.getExhibitorStore();
        var storeMyExhibitor = Ext.create(exhibitorStoreName);
        var productId = record.get('productID') || null;
        var customerId = currentUser.get('masterCustomerId');
        var subCustomerId = currentUser.get('subCustomerId');
        Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
            if(typeof result == 'object' && result.length > 0) {
                 exhibitorStore.each(function(recordEx) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].exhibitorId == recordEx.get('recordId')) {
                            if (!recordEx.get('isAdded')) {
                                recordEx.set('isAdded', true);
                            }

                            storeMyExhibitor.add(recordEx);
                            break;
                        }
                    }
                });
            }
            record.MyExhibitorStore = storeMyExhibitor;
        });
    },

    onGetIsUserRegistered: function(record, currentUser){
        var me = this;
        var attributes = {
            "ProductID": record.get('productID'),
            "MasterCustomerID": currentUser? currentUser.get('masterCustomerId'): '0' ,
            "SubCustomerID": currentUser? currentUser.get('subCustomerId'): '0'
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var isUserRegisterStoreName = storeManager.getIsUserRegisterStore();
        isUserRegisterStore = Ext.create(isUserRegisterStoreName);
        isUserRegisterStore.setDataRequest(attributes);
        isUserRegisterStore.load({
            callback: function(records, operation, success) {
                if(records.length > 0){
                    record.set('registered', records[0].get('userRegistered'));
                }
                me.removeMask(record);
            },
            scope: this
        });
    },

    onloadMenu: function(record, registered){
           
        var me = this;
        var menuPanel = this.getMenuPanel();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var isStaff = currentUser ? currentUser.isStaffMember(): false;
        var eventMenu = Ext.create('Personify.store.base.EventMenu');
        var arrayDisplayMenuStore = [];
        if (record) {
            var proxy = {
                    type: 'ajax',
                    url : 'data/ComplexEventMenu.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'menu'
                    }
                };

                eventMenu.setProxy(proxy);
                eventMenu.load({
                    callback: function(records, operation, success) {

                        //Sessions
                        var menuItemSessions = me.getMenu(records, 'Sessions');
                        if (menuItemSessions != null) {
                            arrayDisplayMenuStore.push(menuItemSessions);
                        }

                        //Attendees
                        if(registered || isStaff){
                            var menuItemAttendees = me.getMenu(records, 'Attendees');
                            if (menuItemAttendees != null) {
                                arrayDisplayMenuStore.push(menuItemAttendees);
                            }
                        }

                        //Exhibitors
//                        if (record.ExhibitorStore.getCount() > 0) {
                            var menuItem = me.getMenu(records, 'Exhibitors');
                            if (menuItem != null) {
                                arrayDisplayMenuStore.push(menuItem);
                            }
//                        }

                        //Map
                        var menuItemMap = me.getMenu(records, 'Map');
                        if (menuItemMap != null) {
                            arrayDisplayMenuStore.push(menuItemMap);
                        }

                        //Badge
                        if (record.get('badgeData') != '') {
                            var menuItemBadge = me.getMenu(records, 'Badge');
                            if (menuItemBadge != null) {
                                arrayDisplayMenuStore.push(menuItemBadge);
                            }
                        }

                        //Notes
                        var menuItemNotes = me.getMenu(records, 'Notes');
                        if (menuItemNotes != null) {
                            arrayDisplayMenuStore.push(menuItemNotes);
                        }

                        //Presenters
//                        if (record.SpeakersListEvent.getCount() > 0) {
                            var menuItem = me.getMenu(records, 'Presenters');
                            if (menuItem) {
                                arrayDisplayMenuStore.push(menuItem);
                            }
//                        }

                        //Discussions
                        var menuItemDiscussions = me.getMenu(records, 'Discussions');
                        if (menuItemDiscussions != null) {
                            arrayDisplayMenuStore.push(menuItemDiscussions);
                        }

                        //Materials
//                        if (record.MaterialStore.getCount() > 0) {
                            var menuItem = me.getMenu(records, 'Materials');
                            if (menuItem != null) {
                                arrayDisplayMenuStore.push(menuItem);
                            }
//                        }
                        //Event Description
                        var menuItemdes = me.getMenu(records, 'Event Description');
                        if (menuItemdes != null) {
                            arrayDisplayMenuStore.push(menuItemdes);
                        }

                        eventMenu.setData(arrayDisplayMenuStore);
                        menuPanel.getController().setStore(eventMenu);

                        me.setDefaultView('sessionsAndDetail');
                        menuPanel.getController().getEventMenuList().select(0);

                        if (eventMenu.first()) {
                            me.onEventMenuItemSelected(eventMenu.first());
                        }

                        var complexEventScheduleContent  = me.getComplexEventScheduleContent();
                        var sessionAndSessionDetailView = complexEventScheduleContent.getActiveItem();
                        sessionAndSessionDetailView.setMasked({xtype: 'loadmask'});

                        Ext.callback(function() {
                            if (sessionAndSessionDetailView.getController()['setRecord']) {
                                sessionAndSessionDetailView.getController().setRecord(record, record);
                            }

                            if (me.getFromSchedule()) {
                                if (me.getCurSchedule()) {
                                    complexEventScheduleContent.getActiveItem().getController().onOpenDetailPage(this.getCurSchedule());
                                }
                            }

                            sessionAndSessionDetailView.setMasked(false);
                        }, me, [], 1);
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

    onEventMenuItemSelected: function(record) {
           
        var recordView = this.getView().getRecord();
        var me = this;
        var subView = {xtype: record.get('view'), itemId: record.get('view'), record: recordView, meetingRecord: recordView};
        var complexEventScheduleContent  = me.getComplexEventScheduleContent();
        var view = this.getComplexEventScheduleContent().getActiveItem();

        if (record.get('view') == 'notepanel' || record.get('view') == 'mapevent'){
            subView = {xtype: record.get('view'), itemId: record.get('view'), record: recordView, meetingRecord: recordView};
        }

        if (typeof view === 'object') {
            if (view.getItemId() == 'sessionsAndDetail' && record.get('view')== 'sessionsAndDetail') {
                view.getController().onOpenSessionPage();
            } else if (view.getItemId() == 'exhibitorAndDetail' && record.get('view')== 'exhibitorAndDetail') {
                view.getController().onOpenExhibitorPage();
            } else {
                if (view.getItemId() === record.get('view')) {
                    view.setActiveItem(0);
                } else {
                    this.setDefaultView(record.get('view'));
                    complexEventScheduleContent.removeAll(true, true);
                    complexEventScheduleContent.add(subView);
                }
            }
        } else {
            this.setDefaultView(record.get('view'));
            complexEventScheduleContent.removeAll(true, true);
            complexEventScheduleContent.add(subView);
            if(this.getFromSchedule()) {
                if(this.getCurSchedule()) {
                    complexEventScheduleContent.getActiveItem().getController().onOpenDetailPage(this.getCurSchedule());
                }
            }
        }
    },

    gotoAttendeeProfile: function(record) {
        var me = this;
        var subView = {xtype:'attendees',record:record};
        var complexEventScheduleContent  = me.getComplexEventScheduleContent();

        complexEventScheduleContent.removeAll(true, true);
        complexEventScheduleContent.add(subView);
    },

    refreshData: function(user) {
          
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(Ext.Viewport.getOrientation() == 'landscape'){
            var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: 'p-loading-ipad-landscape'};
        }else{
            var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: 'p-loading-ipad-portrait'};
        }
        if (record) {
            Ext.Viewport.setMasked(mask);
            var store = Ext.getStore('agendaStoreListMain');

            if (store) {
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

            this.setCountLoad(0);
            this.setMaxCountLoad(2);
            this.onGetIsUserRegistered(record, currentUser);
            this.onGetMeetingAgendaData(record, currentUser);
            this.onGetMeetingRegistrantData(record, currentUser);
        }

        this.removeAllChild();
    },

    onBackToEventTap: function(){
        if (Personify.utils.Configuration.getAllowChangeView()) {
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
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    setBackToEventButtonText: function(text) {
        if(text) {
            this.getBackToEventButton().setText(text);
        }
    },

    addNewCustomerMeetingAgenda: function(record, view, isMeeting) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var viewRecord = this.getView().getRecord();
        var sessionId = record.get('sessionID');

        if (sessionId) {
            currentUser.addSessionToSchedule(record, viewRecord.get('productID')).then({
                success: function(recordsResponse) {
                    me.addToMyScheduleDone(record, recordsResponse, view);
                },
                failure: function() {
                    Ext.Msg.alert('', 'Error occurred while adding agenda.');
                }
            }).always(
                function() {
                    Ext.Viewport.setMasked(false);
                }
            );
        } else {
            currentUser.addEventToSchedule(record).then({
                success: function(recordsResponse) {
                    me.addToMyScheduleDone(record, recordsResponse, view, true);
                },
                failure: function() {
                    Ext.Msg.alert('', 'Error occurred while adding agenda.');
                }
            }).always(
                function() {
                    Ext.Viewport.setMasked(false);
                }
            );
        }
    },

    addToMyScheduleDone: function(record, recordsResponse, view, isMeeting) {
        if (!record.get('isAdded')) {
            record.set('isAdded', true);
        }

        if (recordsResponse) {
            record.set('appointmentId', recordsResponse.get('appointmentId'));
        }

        if (view != null) {
            view.getController().setRecord(record);
        }

        this.refreshDataAgenda(recordsResponse.get('appointmentId'), true);

        if (isMeeting) {
            Ext.Msg.alert('', 'Meeting has been added to your schedule.');
        } else {
            Ext.Msg.alert('', 'Session has been added.');
        }
    },

    getObjectDelectMeetingAgenda: function(record, view, isMeeting, callbackfn){
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
                        "AppointmentDescription": record.get('description') ?  record.get('description') : record.get('shortDescription'),
                        "AppointmentEndDateTime": Personify.utils.ItemUtil.formatDateTimeSession(record.get('endDateTime')),
                        "AppointmentStartDateTime": Personify.utils.ItemUtil.formatDateTimeSession(record.get('startDateTime')),
                        "AppointmentTitle": record.get('title') ? record.get('title') : record.get('shortName'),
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
                    me.saveDeleteMeetingAgenda(attributes, record, view, isMeeting, callbackfn);
                }else{
                    Ext.Msg.alert('', 'Cannot get agenda information to delete!');
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        });
    },

    saveDeleteMeetingAgenda: function(attributes, record, view, isMeeting, callbackfn) {
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

                    if (view != null) {
                        view.getController().setRecord(record);
                    }

                    var sessionID = record.get('sessionID');
                    me.refreshDataAgenda(sessionID, false);

                    if (isMeeting == true) {
                        Ext.Msg.alert('', 'Meeting has been removed.');
                    } else if (record.get('sessionID').trim() != "" && record.get('sessionID') != 0){
                        Ext.Msg.alert('', 'Session has been removed.');

                        var agenda = null;
                        var agendaStore = me.getView().getRecord().MeetingAgendaStore;

                        for (var i = 0; i < agendaStore.getCount(); i++) {
                            if (agendaStore.getAt(i).get('sessionID') == record.get('sessionID')) {
                                agenda = agendaStore.getAt(i);
                            }
                        }

                        if (agenda) {
                            agendaStore.remove(agenda);
                        }
                    }
                } else {
                    Ext.Msg.alert('', 'Error occurred while deleting agenda.');
                }
                Ext.Viewport.setMasked(false);
                if (typeof(callbackfn) == 'function')
                    callbackfn();
            },
            scope: this
        })
    },

    refreshDataAgenda: function(sessionID, isAdded) {
        var view = this.getComplexEventScheduleContent().getActiveItem();
        this.getView().fireEvent('updateagendalist');
        this.getView().getParent().fireEvent('updateagendalist');
        if(view.getItemId() == 'sessionsAndDetail' || view.getItemId() == 'mapEventSchedule' || view.getItemId() == 'mapevent') {
            view.getController().refreshMySchedule(sessionID, isAdded);
        }else{
            var record = this.getView().getRecord();
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            this.onGetMeetingAgendaData(record, currentUser);
        }
    },

    onAddPersonalTap: function(record){
        var me = this;
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Add To Calendar');
        }
        var panel = Ext.Viewport.add([{
                xtype :'addevent',
                record: record,
                listeners: {
                    refreshagenda: function() {
                       me.refreshDataAgenda();
                    }
                }
            }]);
        panel.getController().getAddEventTitle().setHtml("Add Personal Session to Schedule");
        panel.getController().getAddPersonalEventButton().setText("Add Personal Session");
        panel.show();
    },

    removeAllChild: function(){
        var complexEventScheduleContent  = this.getComplexEventScheduleContent();
        complexEventScheduleContent.removeAll(true, true);
        var subView = {xtype: 'sessionsAndDetail', itemId: 'sessionsAndDetail'};
        complexEventScheduleContent.add(subView);
    }
});

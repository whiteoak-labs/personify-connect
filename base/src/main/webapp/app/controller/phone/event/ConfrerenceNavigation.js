Ext.define('Personify.controller.phone.event.ConfrerenceNavigation', {
    extend: 'Personify.base.Controller',
    config: {
        menuStore: null,
        countLoad: 0,
        maxCountLoad: 2,
        eventsItemsPerPage:1
    },
    control: {
        confrerenceNavigationView: true,
        menueventPanelPhone: {
            live:true,
            listeners: {
                requestchangeview: 'onRequestChangeView',
                requestopendetail: 'openView',
                backtoevent: 'onBackToEvent'
            }
        }
    },

    init: function(){
           var me = this;
        this.getMenueventPanelPhone().getController().setRecord(this.getView().getRecord());
           this.onLoadMenuStore(function() {
                                me.onLoadSponsorEvents();
                                });
        
    },

    onLoadSponsorEvents: function() {
        var me = this,
            record = this.getView().getRecord(),
            sponsorRecord = record.SponsorListEvent;

        Personify.utils.ItemUtil.getSponsorListFromJsonFile(
            Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorEvents'), record.get('productID'), sponsorRecord, function() {
                me.getMenueventPanelPhone().getController().setDataSponsorCarousel(sponsorRecord);
            }
        );
    },

    onLoadMenuStore: function(callback){
           
        var record = this.getView().getRecord();
        var me = this;
        var eventMenu = Ext.create('Personify.store.base.EventMenu');
        var url = 'data/SimpleEventMenuPhone.json'
        if(record.get('isConference') == true){
            url = 'data/ComplexEventMenuPhone.json'
        }
        var proxy = {
            type: 'ajax',
            url : url,
            reader: {
                type: 'json',
                rootProperty: 'menu'
            }
        };
        eventMenu.setProxy(proxy);
        eventMenu.load({callback: function(records, operation, success) {
            me.setMenuStore(eventMenu);
            if(record.get('isConference')){
                me.getAllDataOfChild();
            }else{
                me.getMenueventPanelPhone().getController().onUpdateValue(record, eventMenu, 'Event Home');
                me.getMenueventPanelPhone().getController().updateMenu(record);
                       if (typeof callback == 'function') {
                       callback();
                       }
            }
                       
        }});
    },

    openView: function(view, config) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBack, this);
        view.addListener('backtomain', this.onBackToMain, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('requestopendetail', this.openView, this);
        view.addListener('removeagenda', this.onRemoveAgenda, this);
        view.addListener('addagenda', this.onAddAgenda, this);
        view.addListener('refreshagenda', this.onRefreshAgenda, this);
        view.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);

        if (config && config != null) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var conferenceNavigationView = this.getConfrerenceNavigationView();
        if (conferenceNavigationView.getActiveItem().xtype != view.xtype) {
            conferenceNavigationView.push(view);
        }
    },

    onRequestChangeView: function(view, config) {
        this.getView().fireEvent('requestchangeview', view, config);
    },

    onBack: function() {
        this.getConfrerenceNavigationView().pop();
    },

    onBackToMenu: function() {
        var me = this,
            conferenceNavigationView = me.getConfrerenceNavigationView(),
            itemNumber = conferenceNavigationView.getInnerItems().length;

        if (itemNumber > 1) {
            conferenceNavigationView.popToRoot();
        }
    },

    onBackToMain: function(){
        this.getView().fireEvent('backtomain');
    },

    onBackToEvent: function(){
        this.getView().fireEvent('back');
    },

    onRemoveAgenda: function(record, callback){
        this.getView().fireEvent('removeagenda', record, callback);
    },

    onRefreshAgenda: function(record, isAdd, callback){
        this.getView().fireEvent('refreshagenda', callback);
    },

    onUpdateCurrentUser: function(user, callback) {
           
        var me = this;
        this.getView().fireEvent('updatecurrentuser',user, function(){
            me.getAllDataOfChild();
            me.onBackToMenu();
        });
    },

    getAllDataOfChild: function(){
           
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var clsLoadMask = '';
        this.setCountLoad(0);
        //check event is begin by: July Week-end, if yes, we will load taugSplash
        /*var temp = record.data.shortName.toLowerCase();
        if(temp.indexOf('july week-end retreat') == 0 || temp.indexOf('tma resources annual users group 2013') == 0){
            if(Ext.Viewport.getOrientation() == 'landscape'){
                clsLoadMask = 'p-phone-loading-special-events-landscape';
            }else{
                clsLoadMask = 'p-phone-loading-special-events-portrait';
            }
        }else{*/
            if(Ext.Viewport.getOrientation() == 'landscape'){
                clsLoadMask = 'p-phone-loading-normal-events-landscape';
            }else{
                clsLoadMask = 'p-phone-loading-normal-events-portrait';
            }
        /*}*/

        var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: clsLoadMask};
        Ext.Viewport.setMasked(mask);
           
           
           if(!record.SessionStore)
           {
                this.onGetSesstionListData();
           }
           else
           {
                if(record.SessionStore.getCount()<=0)
                {           
                        this.onGetSesstionListData();
                }
                else
                {
                    if (currentUser && currentUser.isLogged())
                    {
                        ////Meeting Agenda
                        this.onGetMeetingAgendaData();
           
                         //// Meeeting Registrant
                         this.onGetMeetingRegistrantData();
           
                    }
                    else
                    {
                            this.removeMask();
                    }
                }
           }
           
           
           if(!record.ExhibitorStore)
           {
                this.onGetExhibitorData();
           }
           else{
                if(record.ExhibitorStore.getCount()<=0)
                    this.onGetExhibitorData();
                else
                    this.removeMask();
           }
       
      
    },

    removeMask: function(){
        var count = this.getMaxCountLoad();
        this.setCountLoad(this.getCountLoad() + 1);
        if(this.getCountLoad() >= count){
           this.onLoadSponsorEvents();
            var record = this.getView().getRecord();
            var store = this.getMenuStore();
            this.getMenueventPanelPhone().getController().onUpdateValue(record, store, record.getData().shortName);
            this.getMenueventPanelPhone().getController().updateMenu(record);
            Ext.Viewport.setMasked(false);
        }
    },

    onGetSesstionListData: function(){
           
         var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var attributes = {
            "MeetingID": record.get('productID'),
            "IsStaffMember": currentUser? currentUser.isStaffMember().toString() : false,
            "IsMember": currentUser ? currentUser.isMember().toString() : false,
             "ItemsPerPage": "100000",
             "StartIndex": "1",
             "SessionDate": "",
           
             //// Following Attributes were added on Tablet
             "MasterCustomerID" : currentUser ? currentUser.get('masterCustomerId') : '',
             "SubCustomerID" : currentUser ? currentUser.get('subCustomerId') : '0'
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var storeSessionName = storeManager.getSessionListStore();
        var storeListSession = Ext.create(storeSessionName);
        
           
        storeListSession.setDataRequest(attributes);
        storeListSession.load({ scope: me, callback: function(records, operation, success) {
            me.removeMask();
              if (records.length > 0)
              {
                    record.SessionStore = Ext.create(storeManager.getSessionStore());
                              
                    record.SessionStore= records[0].SessionsStore;
                    record.SessionDatesStore = records[0].SessionDatesStore;
                    if (currentUser && currentUser.isLogged()) {
                        this.setMaxCountLoad(4);
                        this.onGetMeetingAgendaData();
                        this.onGetMeetingRegistrantData();
                    } else {
                        this.setMaxCountLoad(2);
                    }
              }
              else
              {
                  Ext.Msg("Error during fetching Sessions");
              }
        }});
    },

    onGetMeetingAgendaData: function(){
           
        var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
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
            agendaStore.load({ scope: me, callback: function() {
                var sessionStore = me.getView().getRecord().SessionStore;
                var meetingAgendaStore = me.getView().getRecord().MeetingAgendaStore;

                for (var i = 0; i < sessionStore.getCount(); i++) {
                    var session = sessionStore.getAt(i);

                    for (var j = 0; j < meetingAgendaStore.getCount(); j++) {
                        var sessionAgenda = meetingAgendaStore.getAt(j);

                        if (sessionAgenda && sessionAgenda != '' && sessionAgenda != '0') {
                            if (session.get('sessionID') == sessionAgenda.get('sessionID')) {
                                session.set('appointmentId', sessionAgenda.get('appointmentId'));
                                session.set('isAdded', true);
                                break;
                            }
                        }
                    }
                }

                me.removeMask();
            }});
        }
    },

    onGetMeetingRegistrantData: function(){
        var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        
        var attributes = {
            IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
            ItemsPerPage: this.getEventsItemsPerPage(),
            MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
            ProductID: record.get('productID'),
            StartIndex: "1"
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var attendeeName = storeManager.getAttendeeStore();
        var attendeeStore = Ext.create(attendeeName);
        attendeeStore.setDataRequest(attributes);
          
        //record.MeetingRegistrantStore = attendeeStore.getAt(0).AttendeeStore;
                attendeeStore.load({ scope: me, callback:  function(records, operation, success) {
                             
                              if (success) {
                              record.MeetingRegistrantStore = records[0].AttendeeStore;

                              }
                              me.removeMask();
                                   

                              }
                              });
    },

    onGetExhibitorData: function() {
        var me = this;
        var record = this.getView().getRecord();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var attributes = {
                "ItemsPerPage": "100000",
                "XbtID": record.get('xbtProductID'),
                "XbtParentProduct": record.get('xbtParentProduct'),
                "StartIndex": "0",
                "XbtProductCode": record.get('xbtProductCode')
            };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var exhibitorListStore = storeManager.getExhibitorListStore();
        var storeExhibitorList = Ext.create(exhibitorListStore);
        var storeMyExhibitor = Ext.create(exhibitorListStore);

        storeExhibitorList.setDataRequest(attributes);
        
        storeExhibitorList.load({scope: me, callback: function(records, operation, success){
            record.ExhibitorStore = storeExhibitorList;
            me.getAllExhibitorFromSql(record, currentUser, storeExhibitorList);
            me.removeMask();
        }});
    },

    getAllExhibitorFromSql: function(record, currentUser, exhibitorListStore) {
        var me = this;
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var exhibitorListStoreName = storeManager.getExhibitorListStore();           
        var storeMyExhibitor = Ext.create(exhibitorListStoreName);
           
        var productId = record.get('productID') || null;
        var customerId = currentUser.get('masterCustomerId');
        var subCustomerId = currentUser.get('subCustomerId');
        Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
            if(typeof result == 'object' && result.length > 0) {
                 exhibitorListStore.each(function(recordEx) {
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

    onRemoveAgenda: function(record, callback){
        this.getView().fireEvent('removeagenda', record, callback);
    },

    onAddAgenda: function(record, eventId, callback){
        this.getView().fireEvent('addagenda', record, eventId, callback);
    }
});

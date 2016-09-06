Ext.define('Personify.controller.phone.session.SessionDetaill', {
    extend: 'Personify.base.Controller',

    config: {
        noteNumber: 0,
        locationDescription: null,
        sessionRecords: null
    },

    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        titleOfEvent: true,
        descriptionLabel: true,
        titleSessionDetail: true,
        dateLabel: true,
        timeLabel: true,
        sessionRoomLabel: true,
        sessionPresentersLabel: true,
        sessionNotesLabel: true,
        sessionMaterialsLabel: true,
        pnlActionButtons:true,
        addToMySchedule: {
            tap: 'onInMyScheduleTap'
        },
        addToCalendar: {
            tap: 'onAddToCalendar'
        },
        shareButton: {
            tap: 'onShareButton'
        },
        notePanel: {
            gotonotes : 'onGotoNotePanel'
        },
        ratePanel: {
            gotorate: 'onGotoRate'
        },
        presenterPanel: {
            gotopresenters: 'onGotoPresenterPanel'
        },
        mapPanel: {
            gotomap: 'onGotoMapPanel'
        },
        materialsPanel: {
            gotomaterials: 'onGotoMaterialPanel'
        },
        view: {
            painted: 'onPainted'
        }
    },
    init: function() {
        
        this.getEventToolbar().getController().setHiddenActionButton(true);
        var config = this.getView().config;
        var record = config.record;
        var meetingRecord = this.getView().getMeetingRecord();
        this.setLocationDescription(this.getView().getLocationDescription());
        this.getTitleSessionDetail().setHtml(Personify.utils.ItemUtil.getShortContent(meetingRecord.get('shortName'), 48));
        if(record) {
            this.loadNoteList();
        }

        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser.isLogged()) {
            this.getRatePanel().show();
        } else {
            this.getRatePanel().hide();
        }
    },

    onPainted: function() {
      
        this.onUpdateData(this.getSessionRecords());
    },

    setRecord: function(record) {
        
        var me = this;
        /*Ext.Viewport.setMasked({xtype: 'loadmask'});
        var attributes = {
            "sessionID": record.get('sessionID')
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var sessionDetailStoreName = storeManager.getSessionDetailStore();
        var store = Ext.create(sessionDetailStoreName);
        store.setDataRequest(attributes);
        store.load({
            callback: function(records, operation, success) {
                if(success){
                    if(records.length > 0) {
                        recordSession = records[0];

                        if (recordSession.get('isAdded') != record.get('isAdded')) {
                            recordSession.set('isAdded', record.get('isAdded'));
                        }

                        recordSession.set('appointmentId', record.get('appointmentId'));
                    }
                    me.onUpdateData(records);
                }else{
                    Ext.Msg.alert('', 'Error occurred while loading session detail.');
                }
                Ext.Viewport.setMasked(false);
            },
            scope: this
        });*/
           
      me.onUpdateData(null);
    },

    onUpdateData: function(sessionDetailStore) {
        
        var record = this.getView().getRecord();;
        var meetingRecord = this.getView().getMeetingRecord();
        var isAdded = record.get('isAdded');

        if(sessionDetailStore && sessionDetailStore.length > 0) {
            record = sessionDetailStore[0];

            if (record.get('isAdded') != isAdded) {
                record.set('isAdded', isAdded);
            }

            record.set('appointmentId', record.get('appointmentId'));
        } else {
            if (!record.get('sessionID') || record.get('sessionID') == "" || record.get('sessionID') == "0") {
                record.set('startDateTimeString', meetingRecord.get('startDateTimeString'));
                record.set('endDateTimeString', meetingRecord.get('endDateTimeString'));
            }
        }
        record.set('timeZoneCode', meetingRecord.get('timeZoneCode'));
        if(meetingRecord.get('timeZoneCode') && meetingRecord.get('timeZoneCode')!='')
        {
           this.getAddToCalendar().show();
        }
        else
        {
           this.getAddToCalendar().hide();
        }
        this.updateAddRemoveButton(record);
        var recordView = this.getView().getRecord();
        var storeMaterial = recordView.MaterialStore;
        if(storeMaterial && storeMaterial.getCount() > 0){
            this.getSessionMaterialsLabel().setHtml(this.getDataStringFromStore(storeMaterial, 'title'));
        }else{
            this.getMaterialsPanel().hide();
        }
        this.getTitleOfEvent().setHtml(record.get('title'));
        this.getDescriptionLabel().setHtml(record.get('description'));
        this.getSessionRoomLabel().setHtml(this.getLocationDescription());

        var dateTime = '';
        var endTime = '';

        if (record.get('type') == "PERSONAL") {
            dateTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTime'));
            endTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('endDateTime'));
        } else {
            dateTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'));
            endTime = Personify.utils.ItemUtil.convertStringToDateSession(record.get('endDateTimeString'));
        }
        this.getDateLabel().setHtml(Ext.Date.format(dateTime, 'F j, Y'));
        var dateTime1 = Personify.utils.ItemUtil.getHourEventView(Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString')));
        var endTime1 = Personify.utils.ItemUtil.getHourEventView(Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString')));
        if(record.get('startDateTimeString').indexOf('T')>=0)
        {
            this.getTimeLabel().setHtml(dateTime1 + ' - ' + endTime1 + ' ' + meetingRecord.get('timeZoneCode'));
        }
        else
        {
            this.getTimeLabel().setHtml(Ext.Date.format(dateTime, 'g:i A') + ' - ' + Ext.Date.format(endTime, 'g:i A') + ' ' + meetingRecord.get('timeZoneCode'));
        }
        
        var speakerStore = recordView.SpeakerSession;
        var location = record.get('location');
        
        if(!location || location == '') {
            this.getMapPanel().hide();
        }
        else
        {
//            var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
//            if (mapData) {
//                var locationTemp = mapData.locations[location];
//
//                if (!locationTemp) {
//                    this.getMapPanel().hide();
//                }
//            }
        }

        if(speakerStore && speakerStore.getCount() > 0) {
            this.getSessionPresentersLabel().setHtml(this.getDataStringFromStore(speakerStore, 'name'));
        }else{
            this.getPresenterPanel().hide();
        }
        
        this.getAddToMySchedule().show();
        this.getShareButton().show();
        
        var noteNumber = this.getNoteNumber();
        this.getSessionNotesLabel().setHtml(noteNumber);
    },

    getDataStringFromStore: function(store, name) {
      
        var value = '';

        store.each(function (item, index, length) {
            value += item.get(name);

            if (index < length - 1) {
                 value += ', ';
            }
        });

        return value;
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

    onBack: function() {
         
        this.getView().fireEvent('back',this);
    },

    loadNoteList: function() {
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
        var me = this;
        var eventId = meetingRecord.get('productID');
        var sessionId =  record.get('sessionID');
        var attributes = {
            "eventId": eventId,
            "sessionId": sessionId
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getNoteListStore());
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            me.setNoteNumber(records.length);
            me.getSessionNotesLabel().setHtml(records.length);
        }});
    },

    onGotoNotePanel: function(){
        
        var meetingRecord = this.getView().getMeetingRecord();
        var record = this.getView().getRecord();
        var eventId = meetingRecord.get('productID');
        var sessionId = record.get('sessionID');
        var title = record.get('title');
        var view = Ext.create('Personify.view.phone.note.NoteNavigation', {record: record, eventId: eventId, sessionId: sessionId, title: title});
        view.addListener('updatelistnote', this.loadNoteList, this);
        this.getView().fireEvent('requestopendetail', view, null);
    },

    onGotoRate: function() {
         
        var meetingRecord = this.getView().getMeetingRecord();
        var record = this.getView().getRecord();
        var productId = meetingRecord.get('productID');
        var sessionId = record.get('sessionID');
        var view = Ext.create('Personify.view.phone.rate.Rate', {record: record, productId: productId, sessionId: sessionId, meetingRecord: meetingRecord});
        var me = this;
        Ext.Function.defer(function(){
            me.getView().fireEvent('requestopendetail', view, null);
        },400);
    },

    onGotoPresenterPanel: function(){
         
        var sessionRecord = this.getView().getRecord();
        var speakerStore = sessionRecord.SpeakerSession;
        if(speakerStore && speakerStore.getCount() > 0){
            if(speakerStore.getCount() == 1){
                this.onSelectPresenter(speakerStore.getAt(0));
            }else {
                this.getView().fireEvent('requestopendetail', 'Personify.view.phone.presenter.PresenterPanel', {record: sessionRecord});
            }
        }
    },

    onGotoMapPanel: function(){
         
       var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
       var sessionRecord = this.getView().getRecord();
       if (mapData) {
           var location = sessionRecord.get('location');
           var locationTemp = mapData.locations[location];
           if (locationTemp) {
               this.getView().fireEvent('requestopendetail', 'Personify.view.phone.map.MapNavigation', {record: sessionRecord,locationData: sessionRecord.get('location')});
           }
           else
           {
                Ext.Msg.alert('Map','Map not found.',Ext.emptyFn);
           }
       }
    },

    onInMyScheduleTap: function() {
       
        var me = this;
        var record = this.getView().getRecord();
        var meetingRecord = this.getView().getMeetingRecord();
        var eventId = meetingRecord.get('productID');
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        if(currentUser && currentUser.isLogged()) {
            var isAdded = record.get('isAdded');
            if(isAdded) {
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('removeagenda', record, function(success) {
                    if(success) {
                        me.getView().fireEvent('updatelistagenda');
                        record.set('isAdded', false);
                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Session has been removed.', Ext.emptyFn);
                        me.getView().fireEvent('refreshagenda', me.getView().getRecord(), false);
                    }
                    Ext.Viewport.setMasked(false);
                });
            } else {
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('addagenda', record, eventId, function(success, appointmentId) {
                    if(success) {
                        me.getView().fireEvent('updatelistagenda');
                        record.set('isAdded', true);
                        record.set('appointmentId', appointmentId);
                        me.updateAddRemoveButton(record);
                        Ext.Msg.alert('', 'Session has been added.', Ext.emptyFn);
                    }
                    Ext.Viewport.setMasked(false);
                });
            }
        }else{
            this.getView().fireEvent('requestopendetail','Personify.view.phone.login.LoginPhone', null);
        }
    },

    onAddToCalendar: function() {
      
        var me = this;
        if (window.plugins.calendarPlugin && window.plugins.calendarPlugin['createEvent']) {
            var event = {};
            var data = me.getView().getRecord();
            var title = data.get('title');
            var date = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDateSession(data.get('startDateTimeString')));
            var startTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDateSession(data.get('startDateTimeString')), "g:i a");
            var endTime = Personify.utils.ItemUtil.formatJSONDate(Personify.utils.ItemUtil.convertStringToDateSession(data.get('endDateTimeString')), "g:i a");
            var time = startTime + " - " + endTime;
            var location = this.getLocationDescription();
            var body = "Title: " + title + "\n" + "Date: " + date + "\n" + "Time: " + time + "\n" + "Location: " + location;
            event.title = title;
            event.location = location;
            event.body = body;
            event.startDate = data.get('startDateTime');
            event.endDate = data.get('endDateTime');
            event.calendarName = title;
            window.plugins.calendarPlugin.createEvent(event, function() {
                Ext.Msg.alert('', 'Saved to calendar successfully.', Ext.emptyFn);
            }, function() {
                if (Ext.os.is.Android){
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts', Ext.emptyFn);
                }else{
                    Ext.Msg.alert('Calendar', 'To use this function, you have to allow this mobile application to access your contacts by changing iOS settings in Settings > Privacy > Calendars', Ext.emptyFn);
                }
            });
        }
    },

    onShareButton: function() {
         Personify.utils.ItemUtil.onShareSessionDetail(this.getView().getRecord());
    },

    onSelectPresenter: function(record) {
           
        if(record) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var storeName = storeManager.getCustomerBiographyStore();
            var store = Ext.create(storeName);
            store.setDataRequest(record);
            this.getView().setMasked({xtype:'loadmask'});
            var me = this;
            store.load({
                callback: function(records, operation, success) {
                    if(records.length > 0) {
                        this.getView().fireEvent('requestopendetail','Personify.view.phone.directory.ContactInfoManagement', {
                            record: this.getView().config.record,
                            listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'),
                            bio: records[0],
                            presenterRecord: record
                        });
                    }
                    me.getView().setMasked(false);
                },
                scope: this
            });
        }
    },

    onGotoMaterialPanel: function(){
        
        var sessionRecord = this.getView().getRecord();
        this.getView().fireEvent('requestopendetail', 'Personify.view.phone.material.MaterialPanelPhone', {record: sessionRecord});
    }
});

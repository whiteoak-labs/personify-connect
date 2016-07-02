Ext.define('Personify.controller.event.complexevent.sessions.Sessions',{
    extend: 'Personify.base.Controller',

    control: {
        segmentedbutton: {},
        eventScheduleSegment: {
            tap: 'onEventScheduleSegmentTap'
        },
        myScheduleSegment: {
            tap: 'onMyScheduleSegmentTap'
        },
        complexEventContentCard: {
            onsessionitemtap: 'onEventSesstionItemTap',
            onbacktosessionlist: 'onBackToSessionList'
        },
        eventScheduleView: {
            addsessiontoagenda: 'onAddSessionToAgenda',
            deletesession: 'onDeleteSessionToAgenda',
            refreshmyschesule: 'refreshMySchedule',
            openaddpersonal: 'onAddPersonalTap'
        },
        myScheduleView: {
            deletesession: 'onDeleteSessionToAgenda',
            openaddpersonal: 'onAddPersonalTap',
            onupdatesession: 'OnUpdateEventSchedule'
        },
        sponsorPanel: true,

        view: {
            show: 'onShow',
            erased: 'onEraseView'
        }
    },

    init: function() {
           
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Session Detail');
        }

        var record = this.getView().getRecord();
        this.setRecord(record);
    },

    onShow: function() {
           
        var record = this.getView().getRecord();
        this.setRecord(record);
    },

    setRecord: function(record){
           
        var me = this;
        if (record) {
           
            this.getView().setRecord(record);
            this.getEventScheduleView().setRecord(record);
            this.getMyScheduleView().setRecord(record);
            var sponsorRecord = record.SponsorListEvent;

            Personify.utils.ItemUtil.getSponsorListFromJsonFile(
                Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('sponsorEvents'), record.get('productID'), sponsorRecord, function() {
                    if (sponsorRecord.getCount() > 0) {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().getController().setStore(sponsorRecord);
                            me.getSponsorPanel().show();
                        }
                    } else {
                        if (me['getSponsorPanel']) {
                            me.getSponsorPanel().hide();
                        }
                    }
                }
            );
        }
    },

    onEventScheduleSegmentTap: function() {
        var complexEventContentCard = this.getComplexEventContentCard();
        var eventScheduleView = this.getEventScheduleView();
        complexEventContentCard.setActiveItem(eventScheduleView);
    },

    onMyScheduleSegmentTap: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var complexEventContentCard = this.getComplexEventContentCard();
        var myScheduleView = this.getMyScheduleView();

        if (currentUser && currentUser.isLogged()) {
            complexEventContentCard.setActiveItem(myScheduleView);
        } else {
            var eventScheduleSegment = this.getEventScheduleSegment();
            var segmentedbutton = this.getSegmentedbutton();
            segmentedbutton.setPressedButtons(eventScheduleSegment);
            Personify.utils.ItemUtil.needToLogin();
        }
    },

    onEventSesstionItemTap: function(list,index,target, record) {
        list.deselectAll();
        list.refresh();
        this.onUpdatePresenterSession(record);
        this.getView().fireEvent('opendetailpage', record);
    },

    onBackToSessionList: function(){
        this.getView().fireEvent('backtosessionlist');
    },
    
    onUpdatePresenterSession: function(record){
        var me = this;
        var meetingRecord = this.getView().getMeetingRecord();
        if(record.SpeakerSession){
            record.SpeakerSession.each(function(recordSpeaker){
               if(meetingRecord.SpeakersListEvent){
                    meetingRecord.SpeakersListEvent.each(function(speaker){
                        if(speaker.get('masterCustomerId')== recordSpeaker.get('masterCustomerId')){
                            recordSpeaker.SessionListStore.removeAll();
                            speaker.SessionListStore.each(function(session){
                                recordSpeaker.SessionListStore.add(session);
                            })
                        }
                    });
                }
            });
        }
    },
    
    onAddSessionToAgenda: function(record) {
        this.getView().fireEvent("addsessiontoagenda", record, this.getView());
    },

    onDeleteSessionToAgenda: function(record) {
        if (record.record) {
            this.getView().fireEvent("deletesession", record.record, this.getView(), record.callback);
        } else {
            this.getView().fireEvent("deletesession", record, this.getView());
        }
    },

    refreshMySchedule: function(sessionID, isAdded) {
        this.getMyScheduleView().setMasked({xtype: 'loadmask'});
        this.getMyScheduleView().getController().onGetData(this.getView().getRecord());
        this.getEventScheduleView().getController().updateSessionList(sessionID, isAdded);
        this.getMyScheduleView().setMasked(false);
    },

    onAddPersonalTap: function(record) {
        this.getView().fireEvent('openaddpersonal', record);
    },
    
    OnUpdateEventSchedule: function(){
        var record = this.getView().getRecord();
        var arraySessionID = new Array();
        var appointmentIdArr = new Array();
        if(record.MeetingAgendaStore){
            record.MeetingAgendaStore.each(function(recordAgenda){
                arraySessionID.push(recordAgenda.get('sessionID'));
                appointmentIdArr.push(recordAgenda.get('appointmentId'))
            }); 
        }
        if(arraySessionID.length > 0){
            this.getEventScheduleView().getController().setRecord(record, arraySessionID, appointmentIdArr);
        }
    },

    onEraseView: function() {
        this.getSponsorPanel().getController().onHideImage();
    }
});
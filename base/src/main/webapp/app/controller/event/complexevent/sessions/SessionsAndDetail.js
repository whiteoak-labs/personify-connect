Ext.define('Personify.controller.event.complexevent.sessions.SessionsAndDetail',{
    extend: 'Personify.base.Controller',

    control: {
        sessionPage: {
            opendetailpage: 'onOpenDetailPage',
            deletesession: 'onDeleteSessionToAgenda',
            addsessiontoagenda: 'onAddSessionToAgenda',
            openaddpersonal: 'onAddPersonalTap',
            backtosessionlist: 'backToSessionList'
        },
        sessionDetail:{
            buttonmapittap: 'onMapButtonTap',
            deletesession: 'onDeleteSession',
            addsessiontoagenda: 'onAddSession'
        },
        mapSessionPanel: true
    },

    init: function() {
           
        var me = this;
        Ext.callback(function() {
            var record = this.getView().getRecord();
            me.getMapSessionPanel().setShowAnimation(false);
            var meetingRecord = me.getView().getMeetingRecord();

            if (record) {
                this.getSessionPage().setRecord(record);
            }

            if (meetingRecord) {
                me.getSessionPage().setMeetingRecord(meetingRecord);
                me.getSessionDetail().setMeetingRecord(meetingRecord);
                me.getMapSessionPanel().setMeetingRecord(meetingRecord);
            }

            me.getMapSessionPanel().setRecord(record);
        }, me, [], 1);
    },

    setRecord: function(record, meetingRecord) {
           
        this.getMapSessionPanel().setShowAnimation(false);

        if (record) {
            this.getSessionPage().setRecord(record);
        }

        if (meetingRecord) {
            this.getSessionPage().setMeetingRecord(meetingRecord);
            this.getSessionDetail().setMeetingRecord(meetingRecord);
            this.getMapSessionPanel().setMeetingRecord(meetingRecord);
        }

        this.getMapSessionPanel().setRecord(record);
    },

    onOpenDetailPage: function(record) {
        var me = this;
        this.getSessionDetail().setRecord(record);
        //this.loadSessionDetail(record, function(sessionDetailStore) {
            //me.getSessionDetail().getController().onUpdateData(sessionDetailStore);
           me.getSessionDetail().getController().onUpdateData();
            me.getView().setActiveItem(1);
        //});
        
        Personify.utils.BackHandler.pushActionAndTarget('backToSessionList', this);
    },

    loadSessionDetail: function(record, callback) {
           
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var me = this;
        me.getView().setMasked({xtype:'loadmask'});
        var attributes = {
           "sessionID": record.get('sessionID'),
           "MasterCustomerID": currentUser? currentUser.get('masterCustomerId'): '' ,
           "SubCustomerID": currentUser? currentUser.get('subCustomerId'): '0'
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var sessionDetailStoreName = storeManager.getSessionDetailStore();
        var sessionDetailStore = Ext.create(sessionDetailStoreName);
        sessionDetailStore.setDataRequest(attributes);
        sessionDetailStore.load({
            callback: function(records, operation, success) {
                if (success) {
                    if (typeof callback == 'function') {
                        callback(sessionDetailStore);
                    }
                } else {
                    Ext.Msg.alert('', 'Error occurred while loading session detail.');
                }
                me.getView().setMasked(false);
            },
            scope: this
        });
    },

    backToSessionList: function() {
        this.getView().setActiveItem(0);
        Personify.utils.BackHandler.popActionAndTarget('backToSessionList', this);
    },

    onOpenSessionPage: function(){
           
        this.getView().setActiveItem(0);
    },

    onDeleteSessionToAgenda: function(record, view, callback) {
        this.getView().getParent().fireEvent("deletesession", record, null, null, callback);
    },

    onAddSessionToAgenda: function(record) {
        this.getView().getParent().fireEvent("addsessiontoagenda", record, null);
    },

    onAddPersonalTap: function(record) {
        this.getView().getParent().fireEvent('openaddpersonal', record);
    },

    onMapButtonTap: function(record) {
           
        this.getMapSessionPanel().getController().filterMapsByProduct();
           
        this.getMapSessionPanel().getController().getExhibitorStore();
        this.getMapSessionPanel().setRecord(record);
        this.getMapSessionPanel().getController().setCurrentLocation(record.get('location'));
        this.getMapSessionPanel().getController().showMarker();
        this.getMapSessionPanel().getController().selectItemMyAgenda(record);
        this.getView().setActiveItem(2);
           
       Personify.utils.BackHandler.pushActionAndTarget('setActiveItem', this.getView(), 1);
    },

    onDeleteSession: function(record, view){
        this.getView().getParent().fireEvent('deletesession', record, view);
    },

    onAddSession: function(record, view){
        this.getView().getParent().fireEvent('addsessiontoagenda', record, view);
    },

    refreshMySchedule: function(sessionID, isAdded){
        this.getSessionPage().getController().refreshMySchedule(sessionID, isAdded);
    }
});

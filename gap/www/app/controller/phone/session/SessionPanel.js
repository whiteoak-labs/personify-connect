Ext.define('Personify.controller.phone.session.SessionPanel', {
    extend: 'Personify.base.Controller',
    config: {
        activeindex : 0
    },

    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'openMySessionView'
        },
        allSessionPanel: {

        },
        mySessionPanel: {

        },
        cardSession: {
            onsessiontap: 'onOpenDetailView'
        }
    },
    init: function() {
        this.getEventToolbar().getController().setActionText('View');
        this.getEventToolbar().getController().setActionCls('p-phone-button-viewmore');
        var record = this.getView().getRecord();
        this.setRecord(record);
    },

    setRecord: function (record){
        this.getAllSessionPanel().setRecord(record);
        this.getMySessionPanel().setRecord(record);
    },

    onBack: function() {
        this.getView().fireEvent('back',this);
    },

    openMySessionView: function(){
        if(this.getActiveindex() == 0){
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            if(currentUser && currentUser.isLogged()){
                this.setActiveindex(1);
                this.getCardSession().setActiveItem(1);
                this.getEventToolbar().setTitle('My Sessions');
            }else{
                this.getView().fireEvent('requestopendetail','Personify.view.phone.login.LoginPhone', null);
            }
        }else{
            this.setActiveindex(0);
            this.getCardSession().setActiveItem(0);
            this.getEventToolbar().setTitle('All Sessions');
        }
    },

    onOpenDetailView: function(record){
        var me = this;
        var meetingRecord = this.getView().getRecord();
        this.loadDetailSessionStore(record, function(sessionRecords) {
            me.onUpdatePresenterSession(record);
            var view = Ext.create('Personify.view.phone.session.SessionDetail', {record: record, meetingRecord: meetingRecord, locationDescription: record.get('locationDescription')});
            view.addListener('updatelistagenda', me.onGetMeetingAgendaData, me);
            me.getView().fireEvent('requestopendetail', view, null );
            view.getController().setSessionRecords(sessionRecords);
        });
    },

    loadDetailSessionStore: function(record, callback) {
           Ext.Viewport.setMasked({xtype: 'loadmask'});
        var attributes = {
            "sessionID": record.get('sessionID')
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var sessionDetailStoreName = storeManager.getSessionDetailStore();
        var sessionDetailStore = Ext.create(sessionDetailStoreName);
        sessionDetailStore.setDataRequest(attributes);
        sessionDetailStore.load({
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        var recordSession = records[0];

                        if (recordSession.get('isAdded') != record.get('isAdded')) {
                            recordSession.set('isAdded', record.get('isAdded'));
                        }

                        recordSession.set('appointmentId', record.get('appointmentId'));
                    }

                    if (typeof callback == 'function') {
                        callback(records);
                    }
                } else {
                    Ext.Msg.alert('', 'Error occurred while loading session detail.');
                }
                Ext.Viewport.setMasked(false);
            },
            scope: this
        });
    },

    onUpdatePresenterSession: function(record){
        var me = this;
        var meetingRecord = this.getView().getRecord();
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

            agendaStore.load({ scope: me, callback: function(){
                record.SessionStore.each(function(sessionRecord) {
                    if (sessionRecord.get('isAdded'))
                        sessionRecord.set('isAdded', false);
                });

                agendaStore.each(function(agendaRecord) {
                    for (var i = 0; i < record.SessionStore.getCount(); i++) {
                        var sessionRecord = record.SessionStore.getAt(i);

                        if (sessionRecord.get('sessionID') == agendaRecord.get('sessionID')) {
                            sessionRecord.set('isAdded', true);
                            break;
                        }
                    }
                });

                var mySessionPanel = me.getMySessionPanel();
                var allSessionPanel = me.getAllSessionPanel();

                if(mySessionPanel){
                    me.getMySessionPanel().updateRecord(record);
                }

                if (allSessionPanel) {
                    me.getAllSessionPanel().updateRecord(record);
                }
            }});
        }
    }
});

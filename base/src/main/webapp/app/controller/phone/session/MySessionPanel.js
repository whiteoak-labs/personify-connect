Ext.define('Personify.controller.phone.session.MySessionPanel', {
    extend: 'Personify.base.Controller',

    config: {
        sessionDates: null,
        currentDate: null,
        dateIndex: 0
    },

    control: {
       mySessionTitleBar: true,
       mySessionList: {
            itemtap: 'onSessionItemTap'
       },
       previousButton: {
            tap: 'onBackSegmentButton'

       },
       dateTimeLabel: true,
       totalEventLabel:true,
       sessionHeader: true,
       nextButton:{
            tap: 'onNextSegmentButton'
       }
    },

    setRecord: function(record){
        var me = this;
        if (record) {
            this.getMySessionTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));

            if(record.MeetingAgendaStore && record.SessionStore.getCount() > 0){
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var agendaStoreName = storeManager.getAgendaStore();
                var agendaStore = Ext.create(agendaStoreName);

                record.MeetingAgendaStore.each(function(agendaRecord) {
                    for (var i = 0; i < record.SessionStore.getCount(); i++) {
                        var sessionRecord = record.SessionStore.getAt(i);

                        if (sessionRecord.get('sessionID') == agendaRecord.get('sessionID')) {
                            agendaRecord.MaterialStore = sessionRecord.MaterialStore;
                            agendaRecord.SpeakerSession = sessionRecord.SpeakerSession;
                            agendaRecord.set('locationDescription', sessionRecord.get('locationDescription'));
                            agendaRecord.set('isAdded', true);
                            agendaStore.add(agendaRecord);
                            break;
                        }
                    }
                });

                this.getMySessionList().setStore(agendaStore);
                this.getArrayDates();
                this.onSelectDefaultDate();
            }else{
                this.onGetData(record);
            }
        }
    },

    onGetData: function(record){
           
        this.getView().setMasked({xtype: 'loadmask'});
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()){
            var masterCustomerId = currentUser.data.masterCustomerId;
            var subCustomerId = currentUser.data.subCustomerId;
            var attributes = {
                "SubCustomerID": subCustomerId,
                "MeetingID": record.get('productID'),
                "MasterCustomerID": masterCustomerId
            };
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var agendaStore = Ext.create(agendaStoreName);
            var meetingAgendaStore = Ext.create(agendaStoreName);
            meetingAgendaStore.setDataRequest(attributes);
            meetingAgendaStore.load({
                callback: function(records, operation, success) {
                    me.getView().setMasked(false);
                    if (success) {
                        meetingAgendaStore.each(function(agendaRecord) {
                            for (var i = 0; i < record.SessionStore.getCount(); i++) {
                                var sessionRecord = record.SessionStore.getAt(i);

                                if (sessionRecord.get('sessionID') == agendaRecord.get('sessionID')) {
                                    agendaRecord.MaterialStore = sessionRecord.MaterialStore;
                                    agendaRecord.SpeakerSession = sessionRecord.SpeakerSession;
                                    agendaRecord.set('locationDescription', sessionRecord.get('locationDescription'));
                                    agendaRecord.set('isAdded', true);
                                    agendaStore.add(agendaRecord);
                                    break;
                                }
                            }
                        });

                        me.getMySessionList().setStore(agendaStore);
                        record.MeetingAgendaStore = meetingAgendaStore;
                        me.getArrayDates();
                        me.onSelectDefaultDate();
                    }
                },
                scope: this
            });
        }
    },

    getArrayDates: function(){
        var store = this.getMySessionList().getStore();
        if(store){
            var newDates = new Array();
            store.each(function(recordSession){
                if(recordSession){
                    var startDate = recordSession.get('startDateTime');
                    if(!Personify.utils.ItemUtil.checkDateInDateArray(newDates, startDate)){
                        newDates.push(startDate);
                    }
                }
            });
            newDates.sort( function(date1, date2){
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            })
            this.setSessionDates(newDates);
        }
    },

    onSelectDefaultDate: function(){
        var dates = this.getSessionDates();
        var current = new Date();
        var isHaveCurrent = false;
        Ext.Array.each(dates, function(value) {
            var format = 'm/d/y';
            if(Ext.Date.format(value, format) == Ext.Date.format(current, format)){
                isHaveCurrent = true;
                current = value;
            }
        });
        if(dates.length > 0){
            this.getSessionHeader().show();
            if(isHaveCurrent){
                this.onFilterByDate(current);
            }else{
                var index = this.getDateIndex();
                var currentDate = dates[index];
                if (currentDate) {
                    this.onFilterByDate(currentDate);
                } else {
                    this.onBackSegmentButton();
                }
            }
        }else{
            this.getSessionHeader().hide();
        }
        this.updateShowHidebutton()
    },

    onFilterByDate: function(date){
        var me = this;
        var store = this.getMySessionList().getStore();
        if(store){
            store.clearFilter();
            this.setCurrentDate(date);
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                var format = 'm/d/y';
                if(Ext.Date.format(startDate, format) == Ext.Date.format(date, format)){
                    return record;
                }
            });
            store.sort({
                sorterFn: function(record1, record2) {
                    var date1 = record1.get('startDateTime');
                    var date2 = record2.get('startDateTime');

                    if (date1 > date2) {
                        return 1;
                    } else if (date1 < date2) {
                        return -1;
                    } else {
                        var title1 = record1.get('title');
                        var title2 = record2.get('title');

                        return title1 > title2 ? 1 : (title1 == title2 ? 0 : -1);
                    }
                },
                direction: 'ASC'
            });
        }
        this.getDateTimeLabel().setHtml(Ext.Date.format(date, 'F d, Y'));
        this.getTotalEventLabel().setHtml(store.getCount() + ' Events');
    },

    onBackSegmentButton: function(){
        var index = this.getDateIndex();
        var dates = this.getSessionDates();
        if(index > 0){
            this.setDateIndex(index - 1);
            this.onFilterByDate(dates[index - 1]);
            this.updateShowHidebutton();
        }
    },

    onNextSegmentButton: function(){
        var index = this.getDateIndex();
        var dates = this.getSessionDates();
        if(index < this.getSessionDates().length){
            this.setDateIndex(index + 1);
            this.onFilterByDate(dates[index + 1]);
            this.updateShowHidebutton();
        }
    },

    updateShowHidebutton: function(){
         var index = this.getDateIndex();
        if(index > 0){
            this.getPreviousButton().setDisabled(false);
        }else{
            this.getPreviousButton().setDisabled(true);
        }
        if(index + 1 < this.getSessionDates().length){
            this.getNextButton().setDisabled(false);
        }else{
            this.getNextButton().setDisabled(true);
        }
    },

    onSessionItemTap: function(view, index, target, record, e){
        this.getView().getParent().fireEvent('onsessiontap', record, true);
    }
});

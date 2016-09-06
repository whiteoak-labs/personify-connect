Ext.define('Personify.controller.event.complexevent.sessions.myschedule.MySchedule',{
    extend: 'Personify.base.Controller',
    config: {
        valueSearch: null,
        currentDate: null,
        dateIndex: 0,
        lengthSegment: 5,
        dayJump: 1,
        sessionDates: null

    },
    control: {
        filterSession: {
            searchbuttontap: 'onSearchButtonTapMySchedule',
            clearicontap: 'onClearIconTapMySchedule',
            onsearchtextchange: 'onSearchButtonTapMySchedule',
            addpersonaltap: 'onAddPersonalTap'
        },
        calendarSegmentMySchedule: {

        },
        myScheduleList: {
            oneventitemtap: 'onEventItemTapMySchedule',
            deletesession: 'onDeleteSessionToAgenda'
        },
        backSegmentButtonMySchedule:{
            tap: 'onBackSegmentButtonMySchedule'
        },
        nextSegmentButtonMySchedule:{
            tap: 'onNextSegmentButtonMySchedule'
        }
    },

    init: function() {
        this.callParent(arguments);
        var record = this.getView().getRecord();
        this.setRecord(record);
        this.getFilterSession().getController().hideFilterByTrackButton();
    },

    setRecord: function(record){
        var me = this;
        if(record){
            if(record.MeetingAgendaStore && record.SessionStore.getCount() > 0){
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var agendaStoreName = storeManager.getAgendaStore();
                var agendaStore = Ext.create(agendaStoreName);
                var meetingAgendas = [];

                record.MeetingAgendaStore.each(function(agenda) {
                    var sessionID = agenda.get('sessionID');
                                               
                    if (agenda.get('type') != 'PERSONAL' && (!sessionID || sessionID == '' || sessionID == '0')) {
                        meetingAgendas.push(agenda);
                    }
                });

                Ext.Array.each(meetingAgendas, function(agenda) {
                    record.MeetingAgendaStore.remove(agenda);
                });

                record.MeetingAgendaStore.each(function(recordAgenda){                    
                    for (var i = 0; i < record.SessionStore.getCount(); i++) {
                        var sessionRecord = record.SessionStore.getAt(i);
                        if (sessionRecord.get('sessionID') == recordAgenda.get('sessionID')) {
                            recordAgenda.set('locationDescription', sessionRecord.get('locationDescription'));
                            break;
                        }
                    }
                    agendaStore.add(recordAgenda);
                });

                this.getMyScheduleList().setStore(agendaStore);
                me.getArrayDate(agendaStore);
            }else{
                this.onGetData(record);
            }
            this.getView().setRecord(record);
            this.getView().fireEvent('onupdatesession');
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
            agendaStore.setDataRequest(attributes);
            agendaStore.load({
                callback: function(records, operation, success) {
                    me.getView().setMasked(false);
                    if(success){
                        record.MeetingAgendaStore = agendaStore;

                        var meetingAgendas = [];

                        record.MeetingAgendaStore.each(function(agenda) {
                            var sessionID = agenda.get('sessionID');

                            if (agenda.get('type') != 'PERSONAL' && (!sessionID || sessionID == '' || sessionID == '0')) {
                                meetingAgendas.push(agenda);
                            }
                        });

                        Ext.Array.each(meetingAgendas, function(agenda) {
                            record.MeetingAgendaStore.remove(agenda);
                        });
                        
                        /*Start-Fix-3246-8397817*/
                        record.SessionStore.clearFilter();
                        me.getArrayDate(record.SessionStore);
                        /*End-Fix-3246-8397817*/
                             
                        agendaStore.each(function(recordAgenda){
                                         for (var i = 0; i < record.SessionStore.getCount(); i++) {
                                         var sessionRecord = record.SessionStore.getAt(i);
                                         if (sessionRecord.get('sessionID') == recordAgenda.get('sessionID')) {
                                         recordAgenda.set('locationDescription', sessionRecord.get('locationDescription'));
                                         break;
                                         }
                                         }
                            meetingAgendaStore.add(recordAgenda);
                        });

                        me.getMyScheduleList().setStore(meetingAgendaStore);
                        me.getArrayDate(meetingAgendaStore);
                    }
                },
                scope: this
            });
        }
    },

    showCalendarSegment: function(record){
        var me = this;
        var index = this.getDateIndex();
        var lengthSegment = this.getLengthSegment();
        var currentDate = this.getCurrentDate();
        var segmentAllSessions = me.getCalendarSegmentMySchedule();
        segmentAllSessions.removeAll();
        var dates = this.getSessionDates();
        var percent = (1/dates.length) * 100;
        if(dates.length > lengthSegment){
            percent = (1/lengthSegment) * 100;
        }
        var dateFormat = (dates.length <= 3)? 'F d' : 'M d';
        for(var i = index; i < dates.length && i < index + lengthSegment; i++) {
            var textDate = Ext.Date.format(dates[i], dateFormat);
            var baseClass = "btn-date-list";
            if(currentDate){
                var dFormat = "m/d/Y";
                var strCurrent = Ext.Date.format(currentDate, dFormat);
                var strDateAtIndex  = Ext.Date.format(dates[i], dFormat);
                if(strCurrent == strDateAtIndex ){
                    baseClass = "btn-date-list-selected"
                }
            }
            segmentAllSessions.add([{
                xtype :'button',
                text: textDate,
                data: dates[i],
                style: {
                    display: 'inline-block',
                    width: percent+'%'
                },
                baseCls: baseClass,
                listeners: {
                    tap: function() {
                        me.resetSegmentCls();
                        me.onClickDateSegmentMySchedule(this.getData());
                        this.setBaseCls('btn-date-list-selected');
                    }
                },
                pressedCls: 'p-button-pressing-opacity'
            }]);
        }
    },
    resetSegmentCls: function() {
        var segmentAllSessions = this.getCalendarSegmentMySchedule();
        var items = segmentAllSessions.getItems();
        for(var i = 0; i < items.length; i++){
            items.getAt(i).setBaseCls('btn-date-list');
        }
    },

    onFilterByDate: function(date){
        var store = this.getMyScheduleList().getStore();
        if(store){
            store.clearFilter();
            this.updateFilter(store);
            this.setCurrentDate(date);
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                var format = 'm/d/y';
                if(Ext.Date.format(startDate, format) == Ext.Date.format(date, format)){
                    return record;
                }
            });
        }
    },

    updateFilter: function (store){
        var searchValue = this.getValueSearch();
        if(searchValue){
            store.filter( function(record){
                var searchData = record.get('title') + " " + record.get('location');
                if(record.SpeakerSession){
                    record.SpeakerSession.each(function(speaker){
                        searchData = searchData + " " + speaker.get('name') + " "
                                    + speaker.get('firstName') + " " + speaker.get('lastName')
                                    + " " + speaker.get('jobTitle') + " " + speaker.get('employer');
                    });
                }
                if(searchData.toLowerCase().match(searchValue.trim().toLowerCase())){
                    return record;
                }
            });
        }
    },

    onEventItemTapMySchedule: function(list, index, target, record) {
        if (!record.get('isAdded')) {
            record.set('isAdded', true);
        }

        var meetingRecord = this.getView().getRecord();
        var sessionStore = meetingRecord.SessionStore;
        var sessionRecord = record;
        sessionStore.each(function(item) {
            if (record.get('sessionID') == item.get('sessionID')) {
                sessionRecord = item;

                if (!sessionRecord.get('isAdded')) {
                    sessionRecord.set('isAdded', true);
                }
            }
        });
        this.getView().getParent().fireEvent('onsessionitemtap', list, index, target, sessionRecord);
    },

    onSearchButtonTapMySchedule: function(value){
        this.setValueSearch(value);
        this.takeAwayDaysNoResults();
    },

    onClearIconTapMySchedule: function(){
        var store = this.getMyScheduleList().getStore();
        store.clearFilter();
        this.setValueSearch(null);
        this.getArrayDate(store);
        this.updateFilter(store);
    },

    onSelectDefaultDate: function(record){
        var dates = this.getSessionDates();
        var current = new Date();
        var segmentAllSessions = this.getCalendarSegmentMySchedule();
        var isHaveCurrent = false;
        Ext.Array.each(dates, function(value) {
            var format = 'm/d/y';
            if(Ext.Date.format(value, format) == Ext.Date.format(current, format)){
                isHaveCurrent = true;
                current = value;
            }
        });
        if(isHaveCurrent){
            this.onFilterByDate(current);
            var num = Ext.Array.indexOf(dates, current);
            var remain = num % this.getLengthSegment();
            if(remain == 0){
                num > 0 ? this.setDateIndex(num) : this.setDateIndex(num);
            }else{
                this.setDateIndex(num - remain);
            }
            this.showCalendarSegment(record);
        }else{
            if(dates.length > 0){
                this.onFilterByDate(dates[0]);
                this.resetSegmentCls();
                segmentAllSessions.getAt(0).setBaseCls('btn-date-list-selected');
            }
        }
        this.updateShowHidebutton()
    },

    onBackSegmentButtonMySchedule: function(){
        var record = this.getView().getRecord();
        var index = this.getDateIndex();
        if(index > 0){
            this.setDateIndex(index - this.getDayJump());
            this.showCalendarSegment(record);
            this.updateShowHidebutton();
        }
    },

    onNextSegmentButtonMySchedule: function(){
        var record = this.getView().getRecord();
        var index = this.getDateIndex();
        var lengthSegment = this.getLengthSegment();
        if(index + lengthSegment <= this.getSessionDates().length){
            this.setDateIndex(index + this.getDayJump());
            this.showCalendarSegment(record);
            this.updateShowHidebutton();
        }
    },

    updateShowHidebutton: function(){
        var record = this.getView().getRecord();
        var index = this.getDateIndex();
        if(index > 0){
            this.getBackSegmentButtonMySchedule().show();
        }else{
            this.getBackSegmentButtonMySchedule().hide();
        }
        if(index + this.getLengthSegment() < this.getSessionDates().length){
            this.getNextSegmentButtonMySchedule().show();
        }else{
            this.getNextSegmentButtonMySchedule().hide();
        }
    },

    getArrayDate: function(store){
        store.clearFilter();
        store.sort({
            sorterFn: function(record1, record2) {
                var date1 = new Date(record1.get('startDateTime'));
                var date2 = new Date(record2.get('startDateTime'));

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
        var record = this.getView().getRecord();
        var newDates = new Array();
        store.each(function(recordSession){
            if(recordSession){
                var startDate = new Date(recordSession.get('startDateTime'));
                if(!Personify.utils.ItemUtil.checkDateInDateArray(newDates, startDate)){
                    newDates.push(startDate);
                }
            }
        });
        this.setSessionDates(newDates);
        this.showCalendarSegment(record);
        this.onSelectDefaultDate(record);
    },

    onClickDateSegmentMySchedule: function(date){
        this.setCurrentDate(date);
        this.onFilterByDate(this.getCurrentDate());
    },

    takeAwayDaysNoResults: function(){
        var record = this.getView().getRecord();
        var store = this.getMyScheduleList().getStore();
        this.getArrayDate(store);
        var arrayDate = this.getSessionDates();
        var arrayFilered = new Array();
        for(var i = 0; i< arrayDate.length; i++ ){
             this.onFilterByDate(arrayDate[i]);
             if(store.getCount() == 0){
                arrayFilered.push(arrayDate[i]);
             }
        }
        for( var j = 0; j < arrayFilered.length; j++){
            Ext.Array.remove(arrayDate,arrayFilered[j]);
        }
        this.setSessionDates(arrayDate);
        this.setDateIndex(0);
        this.showCalendarSegment(record);
        this.onSelectDefaultDate(record);
        this.updateFilter(store);
    },

    onDeleteSessionToAgenda: function(record){
        this.getView().fireEvent("deletesession", record);
    },

    onAddPersonalTap: function(){
        var record = this.getView().getRecord();
        this.getView().fireEvent("openaddpersonal", record);
    }
});

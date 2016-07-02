Ext.define('Personify.controller.event.complexevent.sessions.eventschedule.EventSchedule',{
    extend: 'Personify.base.Controller',

    config: {
        trackValue: null,
        valueSearch: null,
        currentDate: null,
        dateIndex: 0,
        lengthSegment: 5,
        dayJump: 1,
        sessionDates: null,
        currentUser: null,
        btnFilterByTrack: null
    },

    control: {
        filterTextLabel: true,
        filterSession: {
            onFilterByTrackButtonTap: 'onFilterByTrackButtonTap',
            searchbuttontap: 'onSearchButtonTap',
            clearicontap: 'onClearIconTap',
            onsearchtextchange: 'onSearchButtonTap',
            addpersonaltap: 'onAddPersonalTap'
        },
        calendarSegmentEventSchedule: {

        },
        eventList: {
            oneventitemtap: 'onEventItemTap',
            addsessiontoagenda: 'onAddSessionToAgenda',
            deletesession: 'onDeleteSessionToAgenda'
        },
        filterListEventSchedule: {
            filterbytrack: 'onFilterByTrack'
        },
        backSegmentButton:{
            tap: 'onBackSegmentButton'
        },
        nextSegmentButton:{
            tap: 'onNextSegmentButton'
        }
    },

    init: function() {
           
        this.callParent(arguments);
        var record = this.getView().getRecord();
           
        this.setRecord(record);
    },

    setRecord: function(record) {
           
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        this.getEventList().setMasked({xtype: 'loadmask'});
        this.setCurrentUser(currentUser);
        if (record) {
            if (record.SessionStore && record.SessionStore.getCount() > 0) {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var storeSessionName = storeManager.getSessionStore();
                var storeSession = Ext.create(storeSessionName);
                record.SessionStore.each(function(recordSession) {
                    var isAdded = false;

                    if (record.MeetingAgendaStore) {
                        for (var i = 0; i < record.MeetingAgendaStore.getCount(); i++) {
                            var agenda = record.MeetingAgendaStore.getAt(i);

                            if (agenda.get('sessionID') == recordSession.get('sessionID')) {
                                if (!recordSession.get('isAdded')) {
                                    recordSession.set('isAdded', true);
                                }

                                isAdded = true;
                                break;
                            }
                        }
                    }

                    if (!isAdded) {
                        if (recordSession.get('isAdded')) {
                            recordSession.set('isAdded', false);
                        }
                    }

                    storeSession.add(recordSession);
                });

                this.getEventList().setStore(storeSession);
                me.getArrayDate(storeSession);
            } else {
                this.onGetData(record);
            }

            this.getView().setRecord(record);
            this.getFilterListEventSchedule().setRecord(record);
        }

        this.getEventList().setMasked(false);
    },

    onGetData: function(record, arraySessionID) {
           
        var me = this;
        var currentUser = this.getCurrentUser();
        var attributes = {
            "MeetingID": record.data.productID,
            "IsStaffMember": currentUser? currentUser.isStaffMember().toString() : false,
            "IsMember": currentUser ? currentUser.isMember().toString() : false,
            "ItemsPerPage": "100000",
            "StartIndex": "0"
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var storeSessionName = storeManager.getSessionStore();
        var storeSession = Ext.create(storeSessionName);
        var sessionStore = Ext.create(storeSessionName);
        storeSession.setDataRequest(attributes);
        storeSession.load({
            callback: function(records, operation, success) {
                if(records.length > 0){
                    storeSession.each(function(recordSession){
                        if(arraySessionID){
                            if(Ext.Array.contains(arraySessionID, recordSession.get('sessionID'))){
                                if (!recordSession.get('isAdded')) {
                                    recordSession.set('isAdded', true);
                                }
                            }
                        }
                        sessionStore.add(recordSession);
                    });
                    me.getEventList().setStore(storeSession);
                    me.getArrayDate(storeSession);
                    record.SessionStore = sessionStore;
                }
            },
            scope: this
        });
    },

    showCalendarSegment: function(record){
        var me = this;
        var index = this.getDateIndex();
        var lengthSegment = this.getLengthSegment();
        var currentDate = this.getCurrentDate();
        var segmentAllSessions = me.getCalendarSegmentEventSchedule();
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
                if(strCurrent == strDateAtIndex){
                    baseClass = "btn-date-list-selected"
                }
            }

            segmentAllSessions.add([{
                xtype :'button',
                data: dates[i],
                text: textDate,
                style: {
                    display: 'inline-block',
                    width: percent+'%'
                },
                baseCls: baseClass,
                listeners: {
                    tap: function() {
                        me.resetSegmentCls();
                        me.onClickDateSegment(this.getData());
                        this.setBaseCls('btn-date-list-selected');
                    }
                },
                pressedCls: 'p-button-pressing-opacity'
            }]);
        }
    },

    resetSegmentCls: function() {
        var segmentAllSessions = this.getCalendarSegmentEventSchedule();
        var items = segmentAllSessions.getItems();
        for(var i = 0; i < items.length; i++){
            items.getAt(i).setBaseCls('btn-date-list');
        }
    },

    onFilterByDate: function(date){
        var store = this.getEventList().getStore();
        if(store){
            store.clearFilter();
            this.updateFilter(store);
            this.setCurrentDate(date);
            store.filter(function(record) {
                var startDate = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'));
                var format = 'm/d/y';
                if(Ext.Date.format(startDate, format) == Ext.Date.format(date, format)){
                    return record;
                }
            });
        }
    },

    updateFilter: function (store) {
        var searchValue = this.getValueSearch();
        var tracks = this.getTrackValue();
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
        if(tracks != null){
            store.filter( function(record){
                var haveData = false;
                record.TrackSession.each(function(trackRecord){
                    if(trackRecord.get('tracks').trim().toLowerCase() == tracks.trim().toLowerCase()){
                        haveData = true;
                    }
                });
                if(haveData){
                    return record;
                }
            });
        }
    },

    onEventItemTap: function(list, index, target, record, event) {
        this.getView().getParent().fireEvent('onsessionitemtap',list,index,target, record);
    },

    onFilterByTrackButtonTap: function(filterByTrackButton) {
        this.getFilterListEventSchedule().showBy(filterByTrackButton);
        filterByTrackButton.setZIndex(8);
        this.setBtnFilterByTrack(filterByTrackButton);
    },

    onSearchButtonTap: function(value){
        this.setValueSearch(value);
        this.takeAwayDaysNoResults();
    },

    onClearIconTap: function(){
        var store = this.getEventList().getStore();
        store.clearFilter();
        this.setValueSearch(null);
        this.getArrayDate(store);
        this.updateFilter(store);
    },

    onSelectDefaultDate: function(record){
        var dates = this.getSessionDates();
        var segmentAllSessions = this.getCalendarSegmentEventSchedule();
        var current = new Date();
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

    onBackSegmentButton: function(){
        var record = this.getView().getRecord();
        var index = this.getDateIndex();
        if(index > 0){
            this.setDateIndex(index - this.getDayJump());
            this.showCalendarSegment(record);
            this.updateShowHidebutton();
        }
    },

    onNextSegmentButton: function(){
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
            this.getBackSegmentButton().show();
        }else{
            this.getBackSegmentButton().hide();
        }
        if(index + this.getLengthSegment() < this.getSessionDates().length){
            this.getNextSegmentButton().show();
        }else{
            this.getNextSegmentButton().hide();
        }
    },

    getArrayDate: function(store){
        store.clearFilter();
        store.sort({
            sorterFn: function(record1, record2) {
                var date1 = Personify.utils.ItemUtil.convertStringToDateSession(record1.get('startDateTimeString'));
                var date2 = Personify.utils.ItemUtil.convertStringToDateSession(record2.get('startDateTimeString'));

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
                var startDate = new Date(Personify.utils.ItemUtil.convertStringToDateSession(recordSession.get('startDateTimeString')));
                if(!Personify.utils.ItemUtil.checkDateInDateArray(newDates, startDate)){
                    newDates.push(startDate);
                }
            }
        });
        this.setSessionDates(newDates);
        this.showCalendarSegment(record);
        this.onSelectDefaultDate(record);
    },

    onFilterByTrack: function(text){
        this.setTrackValue(text);
        if(text != null){
            this.getFilterTextLabel().setHtml('Viewing: ' + text);
        }else{
            this.getFilterTextLabel().setHtml('');
        }
        this.takeAwayDaysNoResults();
        this.getBtnFilterByTrack().setZIndex(0);
    },

    onClickDateSegment: function(date){
        this.setCurrentDate(date);
        this.onFilterByDate(this.getCurrentDate());
    },

    takeAwayDaysNoResults: function(){
        var record = this.getView().getRecord();
        var store = this.getEventList().getStore();
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

    onAddSessionToAgenda: function(record){
        this.getView().fireEvent("addsessiontoagenda", record);
    },

    onDeleteSessionToAgenda: function(record){
        this.getView().fireEvent("deletesession", record);
    },

    updateSessionList: function(sessionID, isAdded){
        var store = this.getEventList().getStore();
        store.clearFilter();
        store.each(function (record){
            if (record.get('sessionID') == sessionID) {
                if (record.get('isAdded') != isAdded) {
                    record.set('isAdded', isAdded);
                }
            }
        });
        this.onFilterByDate(this.getCurrentDate());
        this.updateFilter(store);
    },

    onAddPersonalTap: function(){
        var record = this.getView().getRecord();
        this.getView().fireEvent("openaddpersonal", record);
    }
});

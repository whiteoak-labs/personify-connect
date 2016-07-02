Ext.define('Personify.controller.phone.session.AllSessionPanel', {
    extend: 'Personify.base.Controller',
    config: {
        sessionDates: null,
        currentDate: null,
        dateIndex: 0
    },

    control: {
        allSessionTitleBar: true,
        allSessionList: {
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
        if (record) {
            this.getAllSessionTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));

            if(record.SessionStore && record.SessionStore.getCount() > 0){
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var storeSessionName = storeManager.getSessionStore();
                var storeSession = Ext.create(storeSessionName);
                record.SessionStore.each(function(recordSession){
                    storeSession.add(recordSession);
                });
                this.getAllSessionList().setStore(storeSession);
                this.getArrayDates();
                this.onSelectDefaultDate();
            }else{
                this.onGetData(record);
            }
        }
    },

    onGetData: function(record, arraySessionID){
          
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
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
        var storeAgenda = Ext.getStore('agendaStoreListMain');
        storeSession.setDataRequest(attributes);

        storeSession.load({
            callback: function(records, operation, success) {
                if (records.length > 0) {
                    storeSession.each(function(recordSession) {
                        if (storeAgenda) {
                            for (var i = 0; i < storeAgenda.getCount(); i++) {
                                var recordAgenda = storeAgenda.getAt(i);
                                if (recordAgenda.get('sessionID') == recordSession.get('sessionID')) {
                                    if (!recordSession.get('isAdded')) {
                                        recordSession.set('isAdded', true);
                                        break;
                                    }
                                }
                            };
                        }

                        sessionStore.add(recordSession);
                        me.getArrayDates();
                        me.onSelectDefaultDate();
                    });
                    me.getAllSessionList().setStore(storeSession);
                    record.SessionStore = sessionStore;
                }
            },
            scope: this
        });
    },

    getArrayDates: function(){
        var store = this.getAllSessionList().getStore();
        if(store){
            var newDates = new Array();
            store.each(function(recordSession){
                if(recordSession){
                    var startDate = Personify.utils.ItemUtil.convertStringToDateSession(recordSession.get('startDateTimeString'));
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

    onSelectDefaultDate: function() {
        var me = this;
        var dates = this.getSessionDates();
        var current = new Date();
        var isHaveCurrent = false;
        var index = 0;
        Ext.Array.each(dates, function(value) {
            var format = 'm/d/y';
            if (Ext.Date.format(value, format) == Ext.Date.format(current, format)) {
                isHaveCurrent = true;
                current = value;
                me.setDateIndex(index);
            }
            index++;
        });

        if (dates.length > 0) {
            this.getSessionHeader().show();
            if (isHaveCurrent) {
                this.onFilterByDate(current);
            } else {
                this.onFilterByDate(dates[this.getDateIndex()]);
            }
        } else {
            this.getSessionHeader().hide();
        }
        this.updateShowHidebutton()
    },

    onFilterByDate: function(date) {
        var me = this;
        var store = this.getAllSessionList().getStore();
        if(store){
            store.clearFilter();
            this.setCurrentDate(date);
            store.filter(function(record) {
                var startDate = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'));
                var format = 'm/d/y';
                if(Ext.Date.format(startDate, format) == Ext.Date.format(date, format)){
                    return record;
                }
            });
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

    updateShowHidebutton: function() {
        var index = this.getDateIndex();
        if(index > 0) {
            this.getPreviousButton().setDisabled(false);
        } else {
            this.getPreviousButton().setDisabled(true);
        }
        if(index + 1 < this.getSessionDates().length) {
            this.getNextButton().setDisabled(false);
        } else {
            this.getNextButton().setDisabled(true);
        }
    },

    onSessionItemTap: function(view, index, target, record, e) {
        this.getView().getParent().fireEvent('onsessiontap', record);
    }
});

Ext.define('Personify.controller.tablet.schedule.Schedule', {
    extend: 'Personify.base.Controller',
    config: {
        calendarFilter: false,
        calendarDate: null,
        selectDate : null,
        valueSearch: null,
        hidePast: true,
        eventRecord: null,
        flagSelected: false,
        futureEvents: null,
        currentStore: null,
        itemSelected: false,
        expandEvent: null,
        indexExpandEvent: null
    },
    control: {
        searchEventPanel: {
            tapsearchbutton: 'onTapSearchButton',
            onsearchtextchange: 'onTapSearchButton',
            seachclearicontap: 'onSeachClearIconTap'
        },
        personalButton: {
            tap: 'onButtonPersonalTap'
        },
        allEventButton: {
            tap: 'onAllEventButtonTap'
        },

        selectScheduleItem: {
            eventitemtap: 'onScheduleItemTap',
            eventitemlistselect: 'scheduleItemListSelect',
            removeagenda: 'removeAgenda'
        },

        selectSchedulePanel: {
        },
       
        calendarPanel: {
            selectiondatechange: 'onSelectionDateChange',
            onchangecalendarview: 'onChangeCalendarView'
        },
        
        clearFilter: {
            tap: 'clearFilterButtonTap'
        },

        bigEventPanel: {
            onEventItemTapped: 'onEventItemOpen'
        }
    },
    
    init: function() {
        this.callParent(arguments);
        this.checkIsLoadEventList();
        this.getClearFilter().setDisabled(true);
        this.getSearchEventPanel().getController().setPlaceHolder('Search Titles and Presenters');
    },

    onScheduleItemTap: function(schedule) {
        var me = this;
        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        Ext.callback(function() {
            me.getView().fireEvent('eventitemlistselect', schedule);
            Ext.Viewport.setMasked(false);
        }, me, [], 50);
    },

    scheduleItemListSelect: function(schedule) {
        var me = this;
        me.getView().fireEvent('eventitemlistselect', schedule);
    },

    removeAgenda: function(schedule) {
        var me = this;
        var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(schedule);
        Ext.Msg.confirm('', message.msg, processResult);

        function processResult(clickedButton) {
            Ext.Msg.hide();

            if (clickedButton == 'yes') {
                me.getView().fireEvent('removeagenda', schedule, message.msgSuccess);
            }
        }
    },
    
    checkIsLoadEventList: function() {
        var store = Ext.getStore('agendaStoreListMain');
        var iCalStore = Ext.getStore('iCalendarStoreMain');
        var record = iCalStore ? iCalStore.getAt(0) : null;

        if (store && record != null) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var agendaStore = Ext.create(agendaStoreName);

            store.each(function(record) {
                agendaStore.add(record);
            });

            this.removeItemsInnerSelectItem();
            this.updateRecordForSelectItems(agendaStore, storeManager);
            this.getView().setRecord(record);
        }else{
            this.onGetData();
        }
    },

    updateRecordForSelectItems: function(scheduleStore, storeManager) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var scheduleMonthStore = currentUser.getScheduleMonthStore(scheduleStore);

        if (scheduleMonthStore.getCount() <= 0) {
            this.getSelectScheduleItem().setDeferEmptyText(false);
            this.getSelectScheduleItem().setEmptyText('<div class = "emptyText">Currently, there are no events in your schedule. <br> You may add an event by selecting an event and choosing Add to My Schedule</div>');
        }
        this.getSelectSchedulePanel().setStore(scheduleStore);
        this.getSelectScheduleItem().setStore(scheduleMonthStore);
    },

    onGetData: function() {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Agenda List');
        }

        var me = this;
        var buttonSelectScheduleItem = me.getSelectScheduleItem();
        var calendar = me.getCalendarPanel();
        buttonSelectScheduleItem.setMasked({xtype:'loadmask'});
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        var attributes = {
            MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
            MeetingID: ''
        };

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var agendaStoreName = storeManager.getAgendaStore();
        var store = Ext.create(agendaStoreName);
        store.setDataRequest(attributes);
        store.load ({
            callback: function(records, operation, success) {
                if (success) {
                    me.getView().fireEvent('copyagendalist', store);

                    if (records.length >= 0) {
                        me.removeItemsInnerSelectItem();
                        me.updateRecordForSelectItems(store, storeManager);
                    }
                } else {
                    Personify.utils.ItemUtil.cantLoadEvent();
                }

                buttonSelectScheduleItem.setMasked(false);
            },
            scope: this
        });
    },//onGetData

    onTapFieldButtonSchedule: function(dataView, index, target, record, event, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        this.setExpandEvent(index);
        if (!this.getFlagSelected() && !this.getItemSelected()) {
            this.addData(record, target.getId());
        }

        this.setItemSelected(false);
        this.setFlagSelected(false);
    },
    onSelectFieldButtonSchedule: function(list, record, eOpts) {
        if (!this.getItemSelected()) {
            var store = list.getStore(),
                selected = list.getSelection()[0],
                idx = store.indexOf(selected),
                els = list.getViewItems(),
                el = els[idx];

            if (idx === -1) {
                idx = this.getExpandEvent();
                els = list.getViewItems();
                el = els[idx];
                this.addData(record.getAt(0), el.id);
            } else {
                this.addData(record, el.id);
            }
            this.setFlagSelected(true);
        }

        this.setItemSelected(false);
    },

    addData: function(record, el) {
        var me = this;
        var cmp = Ext.get(el.trim());
        var firstNews = null;

        if (cmp.down('.p-filter-button-new-enabled')) {
            if (cmp.eventList) {
                cmp.eventList.destroy();
                cmp.eventList = null;
            }

            if (cmp.down('.newsFeedItem')) {
                cmp.down('.newsFeedItem').destroy();
            }

            cmp.down('.p-filter-button-new-enabled').replaceCls('p-filter-button-new-enabled', 'p-filter-button-new');
        } else {
            if (record.get('startDateTime') != null) {
                firstNews = me.getEventRecord()[Personify.utils.ItemUtil.getSelectDateTimeValue(record.get('startDateTime'))];

                firstNews.sort({
                    sorterFn: function(record1, record2) {
                        var startDateTime1 = record1.get('startDateTime');
                        var startDateTime2 = record2.get('startDateTime');
                        var date1 = parseInt(Ext.Date.format(startDateTime1, 'j'), 10);
                        var date2 = parseInt(Ext.Date.format(startDateTime2, 'j'), 10);
                        return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
                    },
                    direction : 'ASC'
                });

                var listNews = Ext.create('Personify.view.schedule.ScheduleListItem', {
                    store: firstNews,
                    listeners: {
                        itemtap : function(dataview, index, target, record, e, eOpts) {
                            me.setFlagSelected(true);
                            me.setItemSelected(true);
                            me.setIndexExpandEvent(index);
                            e.preventDefault();
                            var store = dataview.getStore();
                            if (e.target.className.indexOf('x-button') >= 0) {
                                me.setFlagSelected(true);
                                me.setItemSelected(true);
                                if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                                    Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                                    return;
                                }

                                var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);

                                Ext.Msg.confirm('', message.msg, processResult);

                                function processResult(clickedButton) {
                                    Ext.Msg.hide();

                                    if(clickedButton == 'yes') {
                                        me.getView().fireEvent('removeagenda', record, message.msgSuccess);
                                    }
                                }
                            } else {
                                me.setFlagSelected(true);
                                me.setItemSelected(true);
                                me.getView().fireEvent('eventitemlistselect', record);
                            }
                        }
                    }
                });

                cmp.eventList = listNews;
                cmp.down('.p-filter-button-new').replaceCls('p-filter-button-new', 'p-filter-button-new-enabled');
                listNews.element.appendTo(cmp);
            }
        }
    },

    onTapSearchButton: function(value) {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Search');
        }
        this.setValueSearch(null);

        if (value) {
            var eventsRecord = this.getEventRecord();
            this.checkAndCombineFilter();
            var store = this.getSelectSchedulePanel().getStore();
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var scheduleListStore = storeManager.getAgendaStore();
            var agendaStore = Ext.create(scheduleListStore);

            store.each(function(record) {
                agendaStore.add(record);
            });

            agendaStore.filter(function(record) {
                didMatch =  (record.get('title').trim().toLowerCase() + " "
                    + record.get('description').trim().toLowerCase() + " "
                    + record.get('type').trim().toLowerCase() + " "
                    + record.get('speakerName').trim().toLowerCase()
                    ).match(value.trim().toLowerCase());

                if (record.eventData) {
                    var speakers = record.eventData.SpeakersListEvent;
                    speakers.each(function(speaker) {
                        didMatch = didMatch || speaker.get('name').trim().toLowerCase().match(value.trim().toLowerCase());
                    });
                }

                if (didMatch) {
                    return record;
                }
            });

            this.removeItemsInnerSelectItem();
            this.updateRecordForSelectItems(agendaStore, storeManager);
            var numberOfRecordSelection = this.getSelectScheduleItem().getStore().getCount();
            this.getSelectScheduleItem().deselectAll(true);

            for (var i = 0; i < numberOfRecordSelection; i++) {
                if (Ext.get(this.getSelectScheduleItem().getViewItems()[i].id.trim()).down('.p-filter-button-new')){
                    this.getSelectScheduleItem().select(i);
                }
            }

            this.setValueSearch(value);
            this.getClearFilter().setDisabled(false);
        }
    },
    
    onButtonPersonalTap: function() {
        var me = this;

        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Add To Calendar');
        }

        var panel = Ext.Viewport.add ([{
                xtype :'addevent',
                listeners: {
                    refreshagenda: function() {
                       me.refreshData();
                    }
                }
            }]);
        panel.show();
    },
   
    onAllEventButtonTap: function() {
        this.getView().fireEvent('gotomyevent');
    },
    
    onScheduleItemSelect: function(record){
        this.getView().fireEvent('eventitemlistselect', record);
    },
    
    onShowPastEvent: function(){
        this.checkAndCombineFilter();
    },
    
    onSelectionDateChange: function(date) {
        this.setCalendarDate(null);
        this.setCalendarFilter(false);
        this.setSelectDate(null);
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        this.checkAndCombineFilter();
        var agendaStore = this.getSelectSchedulePanel().getStore();

        if (date) {
            agendaStore.filter(function(record) {
                var startDate = record.get('startDateTime');
                startDate.setHours(0, 0, 0, 0);
                var endDate = record.get('endDateTime');

                if (startDate <= date && endDate >= date) {
                    return record;
                }
            });
        }

        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(agendaStore, storeManager);
        var numberOfRecordSelection = this.getSelectScheduleItem().getStore().getCount();
        this.getSelectScheduleItem().deselectAll(true);

        for (var i = 0; i < numberOfRecordSelection; i++) {
            if (Ext.get(this.getSelectScheduleItem().getViewItems()[i].id.trim()).down('.p-filter-button-new')) {
                this.getSelectScheduleItem().select(i);
            }
        }

        this.setSelectDate(date);
        this.getClearFilter().setDisabled(false);
    },
    
    onChangeCalendarView: function(newDate) {
        this.setSelectDate(null);
        this.setCalendarDate(null);
        this.setCalendarFilter(false);
        this.getCalendarPanel().getController().onRemoveSelectDate();

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var scheduleListStore = storeManager.getEventListStore();
        var agendaStore = Ext.create(scheduleListStore);
        this.checkAndCombineFilter();
        var store = this.getSelectSchedulePanel().getStore();

        store.each(function(record) {
            agendaStore.add(record);
        });

        if (newDate) {
            agendaStore.filter(function(record) {
                var startDate = record.get('startDateTime');
                var endDate = record.get('endDateTime');

                if (startDate.getFullYear() * 100 + startDate.getMonth() <= newDate.getFullYear() * 100 + newDate.getMonth() && newDate.getFullYear() * 100 + newDate.getMonth() <= endDate.getFullYear() * 100 + endDate.getMonth()) {
                    return record;
                }
            });
        }

        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(agendaStore, storeManager);
        var numberOfRecordSelection = this.getSelectScheduleItem().getStore().getCount();
        this.getSelectScheduleItem().deselectAll(true);

        for (var i = 0; i < numberOfRecordSelection; i++) {
            if (Ext.get(this.getSelectScheduleItem().getViewItems()[i].id.trim()).down('.p-filter-button-new')){
                this.getSelectScheduleItem().select(i);
            }
        }
        this.setCalendarFilter(true);
        this.setCalendarDate(newDate);
        this.getClearFilter().setDisabled(false);
    },

    clearFilter: function() {
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var agendaStoreName = storeManager.getAgendaStore();
        var agendaStore = Ext.create(agendaStoreName);

        var store = Ext.getStore('agendaStoreListMain');
        store.each(function(record) {
            agendaStore.add(record);
        });

        agendaStore.clearFilter();
        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(agendaStore, storeManager);
        var numberOfRecordSelection = this.getSelectScheduleItem().getStore().getCount();
        this.getSelectScheduleItem().deselectAll(true);

        this.getClearFilter().setDisabled(true);
    },
    
    checkAndCombineFilter: function() {
        this.combineFilter();
    },
    
    combineFilter: function() {
        this.clearFilter();

        if (this.getValueSearch()) {
            this.onTapSearchButton(this.getValueSearch());
        }

        if (this.getCalendarFilter()) {
            var calendarDate = this.getCalendarDate();
            this.onChangeCalendarView(calendarDate);
        }

        if (this.getSelectDate()) {
            this.onSelectionDateChange(this.getSelectDate());
        }
    },
    
    clearFilterButtonTap: function() {
        this.setCalendarFilter(false);
        this.setCalendarDate(null);
        this.setValueSearch(null);
        this.setSelectDate(null);
        this.getSearchEventPanel().down('#searchField').setValue('');
        this.getCalendarPanel().getController().onBackCurrentDate();
        this.clearFilter();
        this.getClearFilter().setDisabled(true);
    },
    
    refreshData: function(user) {
        this.onGetData();
        this.combineFilter();
    },
    
    onRemoveAgenda: function(record, msgSuccess) {
        this.getView().fireEvent('removeagenda', record, msgSuccess);
    },

    onSeachClearIconTap: function() {
        this.clearFilter();
    },

    removeItemsInnerSelectItem: function() {
        var viewItems = this.getSelectScheduleItem().getViewItems();

        for (var i = 0; i < viewItems.length; i++) {
            var viewItem = Ext.get(viewItems[i].id);

            if (viewItem.eventList) {
                viewItem.eventList.destroy();
                viewItem.eventList = null;
            }
        }
    },

    onEventItemOpen: function(record) {
        var main = this.getView().getParent().getParent().getParent();
        var isConference = record.get('isConference');
        var title = record.get('shortName');
        var newView = isConference ? 'Personify.view.event.complexevent.ComplexEvent' : 'Personify.view.event.simpleEvent.SimpleEvent';
        main.getController().onRequestChangeView(newView, {record: record, listeners: {'userlogin': 'refresh'}}, title, '');
    }
});

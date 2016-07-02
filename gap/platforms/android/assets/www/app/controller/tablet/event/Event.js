Ext.define('Personify.controller.tablet.event.Event', {
    extend: 'Personify.base.Controller',
    inject: ['iCalendarStore'],
    config: {
        panelFilter: false,
        recordFilter: null,
        calendarFilter: false,
        calendarDate: null,
        selectDate : null,
        valueSearch: null,
        hidePast: false,
        eventRecord: null,
        flagSelected: false,
        futureEvents: null,
        currentStore: null,
        itemSelected: false,
        expandEvent: null,
        indexExpandEvent: null,
        iCalendarStore: null,
        isSelectAll: false
    },
    control: {
        searchEventPanel: {
            tapsearchbutton: 'onTapSearchButton',
            onsearchtextchange: 'onTapSearchButton',
            seachclearicontap: 'onSeachclearicontap'
        },
        
        personalButton: {
            tap: 'onButtonPersonalTap'
        },
        
        allEventButton: {
            tap: 'onAllEventButtonTap'
        },

        selectEventItem: {
            eventitemtap: 'onEventItemTap',
            select: 'onSelectEventItem'
        },

        selectEventPanel: {
        },

        calendarPanel: {
            selectiondatechange: 'onSelectionDateChange',
            onchangecalendarview: 'onChangeCalendarView'
        },
        
        filterButtonPanel: {
            onOpenFilterPanel: 'onOpenFilterPanel',
            onclearfilter: 'onClearFilterListevent'
        },

        bigEventPanel: {
            onEventItemTapped: 'onEventItemOpen'
        },

        view: {
            painted: 'onPainted'
        }
    },
    
    init: function() {
           
        this.callParent(arguments);
        var me = this;
        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        Ext.callback(function() {
            me.checkIsLoadEventList();
        }, me, [], 1);

        this.getSearchEventPanel().getController().setPlaceHolder('Search Titles and Presenters');
    },
    
    checkIsLoadEventList: function(){
           
        var store = Ext.getStore('meetingListtingMain');
        var iCalStore = Ext.getStore('iCalendarStoreMain');
        var record = iCalStore? iCalStore.getAt(0) : null;
        
        if (store && record != null) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var eventListStore = storeManager.getEventListStore();
            var meetingStore = Ext.create(eventListStore);

            store.each(function(record) {
                meetingStore.add(record);
            });

            this.removeItemsInnerSelectItem();
            this.updateRecordForSelectItems(meetingStore, storeManager);
            this.getView().setRecord(record);
            var currentUser = Personify.utils.Configuration.getCurrentUser();
            currentUser && currentUser.isLogged()? this.getPersonalButton().show(): this.getPersonalButton().hide();
        }else{
            this.onGetData();
        }
    },

    onPainted: function() {
           
        Ext.Viewport.setMasked(false)
    },

    updateRecordForSelectItems: function(meetingStore, storeManager) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var eventMonthStore = currentUser.getEventMonthStore(meetingStore);

        if (eventMonthStore.getCount() <= 0) {
            this.getSelectEventItem().setDeferEmptyText(false);
            this.getSelectEventItem().setEmptyText('<div class = "emptyText">No events found with your search criteria.</div>');
        }
        this.getSelectEventPanel().setStore(meetingStore);
        this.getSelectEventItem().setStore(eventMonthStore);
    },

    onEventItemTap: function(event) {
        var me = this;
        Ext.callback(function() {
            me.getView().fireEvent('eventitemlistselect', event);
        }, me, [], 50);
    },

    onGetData: function(callback, scope) {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event List');
        }
        
        var me = this;
        var selectEventItem = me.getSelectEventItem();
        var filterButton = me.getFilterButtonPanel();
        var calendar = me.getCalendarPanel();

        selectEventItem.setMasked({xtype:'loadmask'});
        filterButton.getController().setDisabledFilterEventButton(true);

        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);

        var attributes = {
            IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
            IsMember: true,
            FromMonth: '1',
            ToMonth: '12',
            OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
            OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
            MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID: currentUser? currentUser.get('subCustomerId'): '0'
        };

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = this.getICalendarStore();
        store.setDataRequest(attributes);
        
        store.load ({
            callback: function(records, operation, success) {
                Deft.Injector.configure({
                    iCalendarStore: {
                        value: store
                    }
                });

                if (success) {
                    me.getView().setRecord(store.getAt(0));
                    var eventList = store.getAt(0).EventListStore;
                    me.getView().fireEvent('copymeetinglist', eventList, store);

                    if (records.length > 0) {
                        me.removeItemsInnerSelectItem();
                        me.updateRecordForSelectItems(eventList, storeManager);
                    }
                    filterButton.getController().setDisabledFilterEventButton(false);
                } else {
                    selectEventItem.setMasked(false);
                    Personify.utils.ItemUtil.cantLoadEvent();
                    me.getSelectEventItem().getStore().removeAll();
                }
                selectEventItem.setMasked(false);

                if (callback) {
                    Ext.callback(callback, scope);
                }
            },
            scope: this
        });
        
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        currentUser && currentUser.isLogged()? this.getPersonalButton().show(): this.getPersonalButton().hide();
    },

    onTapFieldButtonEvents: function(dataView, index, target, record, event, eOpts) {
        this.setExpandEvent(index);

        if (!this.getFlagSelected() && !this.getItemSelected()) {
            this.addData(record, target.getId());
        }

        this.setItemSelected(false);
        this.setFlagSelected(false);
    },

    onSelectFieldButtonEvents: function(list, record, eOpts) {
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
            if (record.get('startDateTimeString') != null) {
                firstNews = me.getEventRecord()[Personify.utils.ItemUtil.getSelectDateTimeValue(Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString')))];

                firstNews.sort({
                    sorterFn: function(record1, record2) {
                        var startDateTime1 = Personify.utils.ItemUtil.convertStringToDate(record1.get('startDateTimeString'));
                        var startDateTime2 = Personify.utils.ItemUtil.convertStringToDate(record2.get('startDateTimeString'));
                        var date1 = parseInt(Ext.Date.format(startDateTime1, 'j'), 10);
                        var date2 = parseInt(Ext.Date.format(startDateTime2, 'j'), 10);
                        var time1 = parseInt(Ext.Date.format(startDateTime1, 'g:i'), 10);
                        var time2 = parseInt(Ext.Date.format(startDateTime2, 'g:i'), 10);
                        var shortName1 = record1.get('shortName');
                        var shortName2 = record2.get('shortName');
                        return date1 > date2 ? 1 : (date1 == date2 ? (time1 > time2 ? 1 : (time1 == time2 ? (shortName1 > shortName2 ? 1 : (shortName1 == shortName2 ? 0 : -1)) : -1)) : -1);
                    },
                    direction : 'ASC'
                });

                var listNews = Ext.create('Personify.view.event.events.EventListItem', {
                    store: firstNews,
                    listeners: {
                        itemtap: function(dataview, index, target, record, e, eOpts) {
                            me.setIndexExpandEvent(index);
                            me.setFlagSelected(true);
                            me.setItemSelected(true);
                            me.getView().fireEvent('eventitemlistselect', record);
                        }
                    }
                });

                if (cmp.eventList) {
                    cmp.eventList.destroy();
                    cmp.eventList = null;
                }

                cmp.eventList = listNews;
                cmp.down('.p-filter-button-new').replaceCls('p-filter-button-new', 'p-filter-button-new-enabled');
                listNews.element.appendTo(cmp);
            }
        }
    },

    onTapEventsListItem: function(dataView, index, target, record, event, eOpts) {
        this.getView().fireEvent('eventitemlistselect', record);
    },

    onEventItemOpen: function(record) {
        this.getView().fireEvent('eventitemlistselect', record);
    },

    onTapSearchButton: function(value) {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Search');
        }
        
        this.setValueSearch(null);
        
        if (value) {
            var eventsRecord = this.getEventRecord();
            this.checkAndCombineFilter();
            var store = this.getSelectEventPanel().getStore();
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var eventListStore = storeManager.getEventListStore();
            var meetingStore = Ext.create(eventListStore);
            store.each(function(record) {
                meetingStore.add(record);
            });

            meetingStore.filter(function(record) {
                didMatch = (record.get('shortName').trim().toLowerCase() + " " + record.get('shortDescription').trim().toLowerCase() + " " + record.get('eventType').trim().toLowerCase() + " " + record.get('location').trim().toLowerCase()
                    ).match(value.trim().toLowerCase());

                var speakers = record.SpeakersListEvent;
                speakers.each(function(speaker) {
                    didMatch = didMatch || speaker.get('name').trim().toLowerCase().match(value.trim().toLowerCase());
                });

                if (didMatch) {
                    return record;
                }
            });

            this.removeItemsInnerSelectItem();
            this.updateRecordForSelectItems(meetingStore, storeManager);
            this.setIsSelectAll(true);
            this.getSelectEventItem().selectAll();
            this.setIsSelectAll(false);
            this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
            this.setValueSearch(value);
        }
    },//onTapSeachButton
    
    onButtonPersonalTap: function() {
        var me = this;
        
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Add To Calendar');
        }
        
        var panel = Ext.Viewport.add ([{
                xtype :'addevent',
                listeners: {
                    refreshagenda: function() {
                       me.refreshDataAgenda();
                    }
                }
            }]);
        panel.show();
    },
    
    onOpenFilterPanel: function() {
        var me = this;
        var record = this.getView().getRecord();
        
        var panel = Ext.Viewport.add ([{
                xtype: 'filterPanel',
                record: record,
                listeners: {
                    onsubmitfilter: function(record) {
                       me.onSubmitFilter(record);
                    }
                }
            }]);
            
        panel.show();
    },
    
    onSelectionDateChange: function(date) {
        this.setCalendarDate(null);
        this.setCalendarFilter(false);
        this.setSelectDate(null);
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        this.checkAndCombineFilter();
        var store = this.getSelectEventPanel().getStore();

        store.each(function(record) {
            meetingStore.add(record);
        });

        if (date) {
            meetingStore.filter(function(record) {
                var startDate = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                startDate.setHours(0, 0, 0, 0);
                var endDate = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));

                if (startDate <= date && endDate >= date) {
                    return record;
                }
            });
        }

        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(meetingStore, storeManager);
        this.setIsSelectAll(true);
        this.getSelectEventItem().selectAll();
        this.setIsSelectAll(false);
        this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
        this.setSelectDate(date);
        this.setCalendarFilter(true);
    },
    
    onChangeCalendarView: function(newDate) {
        this.setSelectDate(null);
        this.setCalendarDate(null);
        this.setCalendarFilter(false);
        this.getCalendarPanel().getController().onRemoveSelectDate();

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        this.checkAndCombineFilter();
        var store = this.getSelectEventPanel().getStore();

        store.each(function(record) {
            meetingStore.add(record);
        });

        if (newDate) {
            meetingStore.filter(function(record) {
                var startDate = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                var endDate = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));

                if (startDate.getFullYear() * 100 + startDate.getMonth() <= newDate.getFullYear() * 100 + newDate.getMonth() && newDate.getFullYear() * 100 + newDate.getMonth() <= endDate.getFullYear() * 100 + endDate.getMonth()) {
                    return record;
                }
            });
        }

        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(meetingStore, storeManager);
        this.setIsSelectAll(true);
        this.getSelectEventItem().selectAll();
        this.setIsSelectAll(false);

        this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
        this.setCalendarFilter(true);
        this.setCalendarDate(newDate);
    },
    
    onSubmitFilter: function(record) {
        this.setPanelFilter(false);
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        this.checkAndCombineFilter();
        var store = this.getSelectEventPanel().getStore();

        store.each(function(record) {
            meetingStore.add(record);
        });

        var locationList = record.LocationListCountStore;
        var topicList = record.TopicListCountStore;

        if (locationList && locationList.getAllCount() > 0) {
            var location = new Array();

            locationList.each(function(formatRecord) {
                if (formatRecord.get('checked') == 'checked') {
                    location.push(formatRecord.get('code'));
                }
            });

            if (location.length > 0) {
                meetingStore.filter(function(record) {
                    var match = true;
                    for (var i = 0; i < location.length; i++) {
                        if (record.get('locationState') != location[i]) {
                            match = false;
                        }
                    }
                    if (match) {
                        return record;
                    }
                });
            }
        }

        if (topicList && topicList.getAllCount() > 0) {
            var topic = new Array();
            var subtopic = new Array();

            topicList.each(function(topicRecord) {
                if (topicRecord.get('checked') == 'checked') {
                    topic.push(topicRecord.get('code'));
                    var subArr = new Array();
                    if (topicRecord.SubcodeListEvent) {
                        topicRecord.SubcodeListEvent.each(function(subRecord) {
                            if (subRecord.get('checked') == 'checked') {
                                subArr.push(subRecord.get('code'));
                            }
                        });
                    }
                    subtopic.push(subArr);
                }
            });

            if (topic.length > 0) {
                meetingStore.filter(function(record) {
                    var match = false;
                    var topicListEvent = record.TopicListEvent;

                    topicListEvent.each(function(topicRecord) {
                        var index = Ext.Array.indexOf(topic, topicRecord.get('code'));

                        if (index >= 0) {
                            var subTopicString = subtopic[index];

                            if (subTopicString && subTopicString.length > 0) {
                                var subRecord = topicRecord.SubcodeListEvent;

                                subRecord.each(function(childRecord) {
                                    if (Ext.Array.contains(subTopicString, childRecord.get('code'))) {
                                        match = true;
                                    }
                                });
                            } else {
                                match = true;
                            }
                        }
                    })

                    if (match && topicListEvent.getAllCount() > 0) {
                        return record;
                    }
                });
            }
        }

        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(meetingStore, storeManager);
        this.setIsSelectAll(true);
        this.getSelectEventItem().selectAll();
        this.setIsSelectAll(false);
        this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
        this.setPanelFilter(true);
        this.setRecordFilter(record); 
    },
    
    onClearFilterListevent: function() {
        var record = this.getView().getRecord();
        Personify.utils.ItemUtil.onClearFilterStore(record.EventFormatListCountStore);
        Personify.utils.ItemUtil.onClearFilterStore(record.LocationListCountStore);
        Personify.utils.ItemUtil.onClearFilterStore(record.TopicListCountStore);
        this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true);
        this.getSearchEventPanel().down('#searchField').setValue('');
        this.getCalendarPanel().getController().onBackCurrentDate();
        this.setCalendarFilter(false);
        this.setPanelFilter(false);
        this.setRecordFilter(null);
        this.setCalendarDate(null);
        this.setValueSearch(null);
        this.setSelectDate(null);

        this.clearFilter();
        this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true);

    },

    clearFilter: function() {
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);

        var store = Ext.getStore('meetingListtingMain');
        store.each(function(record) {
            meetingStore.add(record);
        });

        meetingStore.clearFilter();
        this.removeItemsInnerSelectItem();
        this.updateRecordForSelectItems(meetingStore, storeManager);
    },
    
    checkAndCombineFilter: function() {
        this.combineFilter();
    },
    
    combineFilter: function() {
        this.clearFilter();
        var enableClearFilter = false;
        
        if (this.getValueSearch()) {
            this.onTapSearchButton(this.getValueSearch());
            enableClearFilter = true;
        }
        
        if (this.getPanelFilter()) {
            var recordFilter = this.getRecordFilter();
            this.onSubmitFilter(recordFilter);
            enableClearFilter = true;
        }
        
        if (this.getCalendarFilter()) {
            var calendarDate = this.getCalendarDate();
            this.onChangeCalendarView(calendarDate);
            enableClearFilter = true;
        }
        
        if (this.getSelectDate()) {
            this.onSelectionDateChange(this.getSelectDate());
            enableClearFilter = true;
        }

        return enableClearFilter;
    },
    
    onAllEventButtonTap: function() {
       this.getView().fireEvent('gotomyschedule');
    },

    onEventItemSelect: function(record) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Detail');
        }
        
        this.getView().fireEvent('eventitemlistselect',record);
    },
    
    refreshData: function(user) {
        this.onGetData();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        currentUser && currentUser.isLogged()? this.getPersonalButton().show(): this.getPersonalButton().hide();
    },
    
    refreshDataAgenda: function() {
        this.getView().fireEvent('refreshmyschedule');
    },

    onSeachclearicontap: function() {
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);

        var store = Ext.getStore('meetingListtingMain');
        store.each(function(record) {
            meetingStore.add(record);
        });
        meetingStore.clearFilter();
        var enableClearFilter = this.combineFilter();
        this.removeItemsInnerSelectItem();

        if (enableClearFilter) {
            this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
        } else {
            this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true);
        }
    },

    removeItemsInnerSelectItem: function() {
        var viewItems = this.getSelectEventItem().getViewItems();

        for (var i = 0; i < viewItems.length; i++) {
            var viewItem = Ext.get(viewItems[i].id);

            if (viewItem.eventList) {
                viewItem.eventList.destroy();
                viewItem.eventList = null;
            }
        }
    },

    onSelectEventItem: function(list, record) {
        if (this.getIsSelectAll() && !record.get('expanded'))
            record.set('expanded', true);
    }
});

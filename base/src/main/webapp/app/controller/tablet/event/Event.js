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
        isSelectAll: false,
        //// To Hold Total Count of Events
        totalEvents:0,
        //// To Hold start index to get next event data
        startIndex:0,
        //// To Hold to get next data of total number of event
        itemsPerPage:0,
        //// To Hold Total Count of Events Stored Locally
        totalLocalStoreCountofEvents:0,
        //// To Hold start index to get next event data from Local Store
        startIndexforLocalStoreofEvents:0,
        //// To Get / Set Value to fetch events from local store
        eventsFromLocalStore:false,
        //// To Get / Set already loaded events
        loadedEvents:null,
        //// To Get / Set True / False , if any record is checked in Filter Panel
        isFilterPanelCheckRecordExists:false
           
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
           onGetUpcomingEvents: 'onGetUpcomingEventListData' //// To Handle Scroll 
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
            //// To Set Total Count of Events
           this.setTotalEvents(record.get('totalCount'));
           
           //// To be reset from App Config Settings
           var eventItemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageEventList');

           this.setStartIndex(parseInt(eventItemsPerPage)+1  );
           this.setItemsPerPage(eventItemsPerPage);
           
           ////this.setItemsPerPage(parseInt(this.getTotalEvents()) - parseInt(eventItemsPerPage));
           
           //// Functionality to Retrieve Data of Events from Local Store
           
           //// If Local has more than Item Per Page then we will fetch records from Local Store
           if(store.getCount()>eventItemsPerPage)
           {
                /* To Clear the search & filter when user comes again to this view */
                Personify.utils.ItemUtil.onClearFilterStore(record.EventFormatListCountStore);
                Personify.utils.ItemUtil.onClearFilterStore(record.LocationListCountStore);
                Personify.utils.ItemUtil.onClearFilterStore(record.TopicListCountStore);
                this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true);
                this.getSearchEventPanel().down('#searchField').setValue('');
                ///this.getCalendarPanel().getController().onBackCurrentDate();
                ////this.setCalendarFilter(false);
                this.setPanelFilter(false);
                this.setRecordFilter(null);
           
                 /* End clear the search & filter when user comes again to this view */ 
           
                this.setStartIndexforLocalStoreofEvents(0);
                this.setEventsFromLocalStore(true);
                this.eventDataFromLocalStore();
           }
           else /// Old Process
           {
                this.setEventsFromLocalStore(false);
           
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var eventListStore = storeManager.getEventListStore();
                var meetingStore = Ext.create(eventListStore);

                store.each(function(record) {
                           meetingStore.add(record);
                           });

                this.removeItemsInnerSelectItem();
                this.updateRecordForSelectItems(meetingStore, storeManager);
                this.getView().setRecord(record);
           }
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
        if (eventMonthStore.getCount() > 0) {
           this.getSelectEventItem().setStore(eventMonthStore);
           }else {
            this.getSelectEventItem().setDeferEmptyText(false);
            this.getSelectEventItem().setEmptyText('<div class = "emptyText">No events found with your search criteria.</div>');
           this.getSelectEventItem().setStore(null);
        }
        this.getSelectEventPanel().setStore(meetingStore);
        
    },

    onEventItemTap: function(event) {
        var me = this;
        Ext.callback(function() {
            me.getView().fireEvent('eventitemlistselect', event);
        }, me, [], 50);
    },

    onGetData: function(callback, scope) {
        //// To be reset from App Config Settings
        this.setStartIndex(1);
        this.setEventsFromLocalStore(false);
           
       var eventItemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageEventList');
           
        this.setItemsPerPage(eventItemsPerPage);
           
        if (navigator.onLine && window.plugins.app47) {
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
            FromMonth: '0',
            ToMonth: '12',
            OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
            OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
            MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID: currentUser? currentUser.get('subCustomerId'): '0',
            //// To get Events
            StartIndex:me.getStartIndex(),
            ItemsPerPage:me.getItemsPerPage()
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
                    
                    //// To Set Total Count of Events
                    this.setTotalEvents(store.getAt(0).get('totalCount'));
                    
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
                    if(operation.error != null && (operation.error.status === 0 || operation.error.statusText === 'communication failure'))
                    {
                        Personify.utils.ItemUtil.cantLoadEvent(operation,"Cannot load events.");
                    }
                    me.getSelectEventItem().getStore().removeAll();
                }
                selectEventItem.setMasked(false);
                    
                //// Reset the start index
                me.setStartIndex(parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage()));


                if (callback) {
                    Ext.callback(callback, scope);
                }
            },
            scope: this
        });
        
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        currentUser && currentUser.isLogged()? this.getPersonalButton().show(): this.getPersonalButton().hide();
    },
           
    /* Event Performance Enhancements */
           
    checkAvailabilityofEvents: function()
    {
           var eventsAvailable=false;
           
           //// Get Store having OLD Data
           var meetingListtingMainStore = Ext.getStore('meetingListtingMain');
           
            //// Compare Counting of OLD Data and Total Count of Events
           /*if (meetingListtingMainStore!=null
               && this.getTotalEvents() > meetingListtingMainStore.getCount())
           {
                eventsAvailable=true;
           }*/
         
           eventsAvailable=meetingListtingMainStore!=null? (this.getTotalEvents() > meetingListtingMainStore.getCount()):false;
           return eventsAvailable;
    },
           
           
    onGetUpcomingEventListData: function(callback, scope) {
           
           var me =this;
           
           if (this.getEventsFromLocalStore())
           {
               //// If data is available in events local store than retrieve it from local store
                me.eventDataFromLocalStore();
           }
           else
           {
                me.eventDataFromService(callback, scope);
           }
           
    },
    
   //// To retrieve events data from service
    eventDataFromService:function(callback, scope)
    {
       //// Compare Count of OLD Data and Total Count of Events
       if (this.checkAvailabilityofEvents())
       {
           
           if (navigator.onLine && window.plugins.app47) {
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
           
           
          /////console.log('Start Index Before Service Call: ' + parseInt(me.getStartIndex()));
           
           var attributes = {
                IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
                IsMember: true,
                FromMonth: '0',
                ToMonth: '12',
                OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '0',
                //// To Get Events
                StartIndex:me.getStartIndex(),
                ItemsPerPage:me.getItemsPerPage()
           };
           
           
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var store = this.getICalendarStore();
           var agendaStore = Ext.getStore('agendaStoreListMain');
           store.setDataRequest(attributes);
           
           store.load ({
                       callback: function(records, operation, success) {
                       //// Commented Direct Insert to Calendar Store
                       /* Deft.Injector.configure({
                        iCalendarStore: {
                        value: store
                        }
                        }); */
                       
                       if (success) {
                       
                       //// Get fetched data for Events
                       var upcomingEvents = store.getAt(0);
                       //// Get Meeting List Store
                       var meetingListtingStoreMain = Ext.getStore('meetingListtingMain');
                      
                       if (records.length>0)
                       {
                            var storeSchedule = Ext.getStore('scheduleListtingMain');
                            var scheduleRecord = null;
                            if (storeSchedule && storeSchedule.getAt(0)) {
                                scheduleRecord = storeSchedule.getAt(0);
                            }
                            //// Get Data related to events and add the same to Meeting List Store
                            upcomingEvents.EventListStore.each(function(record)
                            {
                                  /*if(record)
                                  {
                                      meetingListtingStoreMain.add(record);
                                  }*/
                                                               
                                   
                                   if (meetingListtingStoreMain)
                                    {
                                        var recordIndex = meetingListtingStoreMain.findBy(function(existingrecord, id) {
                                            if (existingrecord.get('productID') === record.get('productID')){
                                                                                            return true;
                                                                                          }
                                                                                    return false; // there is no record in the store with this ID
                                                                                });
                                                               
                                         if (recordIndex == -1) {
                                            if (agendaStore) {
                                                for (var i = 0; i < agendaStore.getCount(); i++) {
                                                    var recordAgenda = agendaStore.getAt(i);
                                                    if (recordAgenda.get('type') != 'PERSONAL') {
                                                        if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0") {
                                                            if (recordAgenda.get('meetingId') == record.get('productID')) {
                                                               if (!record.get('appointmentId') || record.get('appointmentId') == '') {
                                                                    record.set('appointmentId', recordAgenda.get('appointmentId'));
                                                               }
                                                               
                                                               if (!record.get('isAdded')) {
                                                                    record.set('isAdded', true);
                                                               }
                                                               break;
                                                            }
                                                        }
                                                    }
                                                };
                                            }
                                            
                                            if(scheduleRecord && scheduleRecord.get('productID') == record.get('productID'))
                                            {
                                                if(scheduleRecord.SessionStore)
                                                {
                                                    record.SessionStore =scheduleRecord.SessionStore;
                                                }
                                                
                                                if(scheduleRecord.ExhibitorStore)
                                                {
                                                    record.ExhibitorStore =scheduleRecord.ExhibitorStore;
                                                }
                                                storeSchedule.removeAll();
                                                storeSchedule.destroy();
                                            }
                                            meetingListtingStoreMain.add(record);
                                         }
               
                                  }
                            },me);
                       
                       
                            //// Get Record From View that has Data related to Topic and Location
                            var record = this.getView().getRecord();
                       
                            /// Update Location related data to LocationListCountStore of new Store Data
                            me.updateLocationListCountStore(upcomingEvents,record);
                       
                            /// Update Topic related data to TopicListCountStore of new Store Data
                            me.updateTopicListCountStore(upcomingEvents,record);
                       
                            me.getView().setRecord(upcomingEvents);
                            ////me.getView().fireEvent('copymeetinglist', meetingListtingStoreMain, iCalStoreMain);
                            me.removeItemsInnerSelectItem();
                            me.updateRecordForSelectItems(meetingListtingStoreMain, storeManager);
                       
                       }
                       
                       
                       //// Reset the start index
                       ////me.setStartIndex((me.getStartIndex() + me.getItemsPerPage()));
                       
                       ////console.log('Start Index: ' + parseInt(parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage())));
                       
                       me.setStartIndex(parseInt(meetingListtingStoreMain.getCount()) + 1) ;
                       
                       
                       ////console.log('Get Start Index: ' + parseInt(me.getStartIndex()));
                       
                       //// To Filter Data
                       me.checkAndCombineFilter(false);
                       }
                       else {
                       
                       if(navigator.onLine) //// To Check Internet Connection
                       {
                            selectEventItem.setMasked(false);
                            Personify.utils.ItemUtil.cantLoadEvent(operation,"Cannot load events.");
                            ////me.getSelectEventItem().getStore().removeAll();
                       }
                       }
                       
                       filterButton.getController().setDisabledFilterEventButton(false);
                       
                       selectEventItem.setMasked(false);
                       
                       if (callback) {
                            Ext.callback(callback, scope);
                       }
                       },
                       scope: this
                       });
           
                var currentUser = Personify.utils.Configuration.getCurrentUser();
                currentUser && currentUser.isLogged()? this.getPersonalButton().show(): this.getPersonalButton().hide();
           
           }

    },
    
    //// To retrieve events data from local store
    eventDataFromLocalStore:function()
    {
           var me = this;
           
           ///this.removeItemsInnerSelectItem();
           var iCounterStartIndex=parseInt(me.getStartIndexforLocalStoreofEvents());////+1;
           var iCounterLastIndex=parseInt(me.getStartIndexforLocalStoreofEvents())+parseInt(me.getItemsPerPage());
           
           var store = Ext.getStore('meetingListtingMain');
           var iCalStore = Ext.getStore('iCalendarStoreMain');
           var record = iCalStore? iCalStore.getAt(0) : null;
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var eventListStore = storeManager.getEventListStore();
           var meetingStore = Ext.create(eventListStore);
           
           if (iCounterStartIndex>0 && this.getLoadedEvents()!=null)  /// If we have already Set data to local store then get meeting store from local variable with old data
           {
                meetingStore=this.getLoadedEvents();
           }
           
           this.setTotalLocalStoreCountofEvents(store.getCount());
           
           //// If scroll reached to end but local store has still has data
           if(me.getTotalLocalStoreCountofEvents()==this.getTotalEvents()
              && iCounterLastIndex>me.getTotalLocalStoreCountofEvents())
           {
                    iCounterLastIndex=me.getTotalLocalStoreCountofEvents();
           }
           
           
           
           for(var iCounter=iCounterStartIndex;iCounter<iCounterLastIndex;iCounter++)
           {
                meetingStore.add(store.getAt(iCounter));
           }
         
           
           this.removeItemsInnerSelectItem();
           
           //// Set meeting store to local store
           this.setLoadedEvents(meetingStore);
           
           /////this.updateRecordForSelectItems(meetingStore, storeManager);
           
           this.updateRecordForSelectItems(this.getLoadedEvents(), storeManager);
           
           this.getView().setRecord(record);
           
           //// Reset Start Index for Local Store
           me.setStartIndexforLocalStoreofEvents(parseInt(me.getStartIndexforLocalStoreofEvents()) + parseInt(me.getItemsPerPage()));
           
           //// If Start Index of Local Store + Items Per Page is greater than Total Count of Local store then no need to retreive data from Local Store
                if (me.getTotalLocalStoreCountofEvents()==this.getTotalEvents()
                    && iCounterLastIndex<me.getTotalLocalStoreCountofEvents())
                {
                    this.setEventsFromLocalStore(true);
                }
                else if ((parseInt(me.getStartIndexforLocalStoreofEvents()) + parseInt(me.getItemsPerPage()))>me.getTotalLocalStoreCountofEvents())
               {
                    this.setEventsFromLocalStore(false);
                    //// Reset the start index
                    me.setStartIndex(parseInt(me.getTotalLocalStoreCountofEvents()) + 1);
               }
               else
               {
                    this.setEventsFromLocalStore(true);
               }
           
           me.checkAndCombineFilter(false);
           
    },
           
    isFilterAdded:function()
    {
           var totalFilterApplied=0;
           
           if(this.getValueSearch()!=null)
           {
                totalFilterApplied=totalFilterApplied+1;
           }
           
           if(this.getPanelFilter()==true)
           {
                totalFilterApplied=totalFilterApplied+1;
           }
           
           if(this.getCalendarFilter()==true && this.getCalendarDate()!=null)
           {
                totalFilterApplied=totalFilterApplied+1;
           }
           
           if(this.getSelectDate()!=null)
           {
                totalFilterApplied=totalFilterApplied+1;
           }
           
           return totalFilterApplied;

    },
           
    resetEventsFromLocalStore:function(checkFilterApplied)
    {
           var canCallClearFilter = true;
           
           if(checkFilterApplied)
           {
                //// If more than 1 filters are applied then display as it is
                //// else reset values to Item Per Page
                canCallClearFilter=this.isFilterAdded()<=1?true:false;
           }
           
           if (canCallClearFilter)
           {
                //// If Local Store has value then clear the data and Retrieve Item Per Page from starting records
           
                ///if(store.getCount()>eventItemsPerPage && loadedEvents!=null)
                var store = Ext.getStore('meetingListtingMain');
                if(store.getCount()>this.getItemsPerPage())
                {
                    canCallClearFilter = false;
           
                    this.setStartIndexforLocalStoreofEvents(0);
                    this.setEventsFromLocalStore(true);
                    this.eventDataFromLocalStore();
           
                }
           
           }
           
           return canCallClearFilter;
           
    },
           
    /// To Update Location related data to LocationListCountStore of new Store Data
    updateLocationListCountStore:function(upcomingEvents,record)
    {
           if (upcomingEvents.LocationListCountStore
               && upcomingEvents.LocationListCountStore.getCount()>0)
           {
           //// First Loop to Fetch Records from Store
           upcomingEvents.LocationListCountStore.each(function(storeLocationListCountStore)
            {
                if (storeLocationListCountStore)
                {
                 var addNewLocation=true;
                                                      
                if (record.LocationListCountStore && record.LocationListCountStore.getCount()>0)
                {
                   record.LocationListCountStore.each(function(recordLocationListCountStore)
                    {
                     addNewLocation=true;
                      if(recordLocationListCountStore.get('code')==storeLocationListCountStore.get('code'))
                       {
                         var updatedCount=parseInt(recordLocationListCountStore.get('count')) + parseInt(storeLocationListCountStore.get('count'));
                         recordLocationListCountStore.set('count', updatedCount);
                         addNewLocation=false;
                         return false;
                        }
                    });
                                                      
                  if(addNewLocation)
                  {
                    record.LocationListCountStore.add(storeLocationListCountStore);
                  }
                }
                else
                {
                    record.LocationListCountStore.add(storeLocationListCountStore);
                }
                }
            });
          
           }
           upcomingEvents.LocationListCountStore=null;
           upcomingEvents.LocationListCountStore=record.LocationListCountStore;
    },
           
     /// To Update Topic List related data to TopicListCountStore of new Store Data
    updateTopicListCountStore: function(upcomingEvents, record){
        var topicListCountStore = record.TopicListCountStore;
           
        if (upcomingEvents.TopicListCountStore
               && upcomingEvents.TopicListCountStore.getCount()>0)
        {
            upcomingEvents.TopicListCountStore.each(function(record) {
                var isTopicExists = false;
                if (topicListCountStore) {
                    for (var k = 0; k < topicListCountStore.getCount(); k++) {
                        var recordTopicListCount = topicListCountStore.getAt(k);
                        var topicCnt = 0;
                        if (recordTopicListCount.get('code') == record.get('code')) {
                            topicCnt =parseInt(topicListCountStore.getAt(k).get('count')) + parseInt(record.get('count'));
                            topicListCountStore.getAt(k).set('count',topicCnt);
                            isTopicExists = true;
                                                   
                            var subcodeListEventStore = topicListCountStore.getAt(k).SubcodeListEvent;
                            record.SubcodeListEvent.each(function(subCodeRecord) {
                                var isSubCodeExists = false;
                                if(subcodeListEventStore){
                                    for (var j = 0; j < subcodeListEventStore.getCount(); j++) {
                                        var subCodeCnt = 0;
                                        if (subcodeListEventStore.getAt(j).get('code') == subCodeRecord.get('code')) {
                                            subCodeCnt =parseInt(subcodeListEventStore.getAt(j).get('count')) + parseInt(subCodeRecord.get('count'));
                                            subcodeListEventStore.getAt(j).set('count',subCodeCnt);
                                            isSubCodeExists = true;
                                            break;
                                        }
                                    }
                                if(!isSubCodeExists){
                                          subcodeListEventStore.add(subCodeRecord);
                                        }
                                    }
                                });
                                                   
                              }
                            }
                            if(!isTopicExists){
                                            topicListCountStore.add(record);
                                        }
                                    }
                        });
           }
           
           upcomingEvents.TopicListCountStore=null;
           upcomingEvents.TopicListCountStore=topicListCountStore;
        },
           
 
    /* End Event Performance Enhancements */
           
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
        if (navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Event Search');
        }
        
        this.setValueSearch(null);
        
        if (value) {
            var eventsRecord = this.getEventRecord();
            this.checkAndCombineFilter(true);
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
        
        if (navigator.onLine && window.plugins.app47) {
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
        this.checkAndCombineFilter(true);
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
        this.checkAndCombineFilter(true);
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
           
           
           this.setIsFilterPanelCheckRecordExists(false);
           this.setPanelFilter(false);
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var eventListStore = storeManager.getEventListStore();
           var meetingStore = Ext.create(eventListStore);
           this.checkAndCombineFilter(true);
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
           this.setIsFilterPanelCheckRecordExists(true);

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
           
           if(this.getIsFilterPanelCheckRecordExists()==false)
           {
                this.setIsFilterPanelCheckRecordExists(true);
           }
           
           if(this.getIsFilterPanelCheckRecordExists()==false && subtopic.length>0)
           {
                this.setIsFilterPanelCheckRecordExists(true);
           }
           
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
           
           if(this.getIsFilterPanelCheckRecordExists()==false)
           {
                this.resetEventsFromLocalStore(false);
                this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
                /////this.setPanelFilter(true);
                this.setRecordFilter(null);
                this.checkAndCombineFilter(false);
           }
           else
           {
                this.removeItemsInnerSelectItem();
                this.updateRecordForSelectItems(meetingStore, storeManager);
                this.setIsSelectAll(true);
                this.getSelectEventItem().selectAll();
                this.setIsSelectAll(false);
                this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);
                this.setPanelFilter(true);
                this.setRecordFilter(record);
           }
           
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

       if(this.resetEventsFromLocalStore(false))
       {
           this.clearFilter();
       }
           
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
    
    checkAndCombineFilter: function(callClearFilter) {
        this.combineFilter(callClearFilter);
    },
    
    combineFilter: function(callClearFilter) {
        
        if(callClearFilter==true)
        {
           this.clearFilter();
        }
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
        if(navigator.onLine && window.plugins.app47) {
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
       
        if(this.resetEventsFromLocalStore(false))
        {
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var eventListStore = storeManager.getEventListStore();
            var meetingStore = Ext.create(eventListStore);

            var store = Ext.getStore('meetingListtingMain');
            store.each(function(record) {
                        meetingStore.add(record);
                        });
                meetingStore.clearFilter();
           
           var enableClearFilter = this.combineFilter(true);
           this.removeItemsInnerSelectItem();
        }
       

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

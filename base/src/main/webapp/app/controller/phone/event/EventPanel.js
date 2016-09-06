Ext.define('Personify.controller.phone.event.EventPanel', {
    extend: 'Personify.controller.event.Event',
    inject: 'personify',
           
    config: {
        location: null,
        topic: null,
        searchText : null,
        eventRecord: null,
        flagSelected: false,
        futureEvents: null,
        currentStore: null,
        itemSelected: false,
        expandEvent: null,
        indexExpandEvent: null,
        isSelectAll: false,
        //Performance Enhancement
        totalEvents: 0,
        loadedEventsCount: 0,
        params: null,
        itemsPerPage: 10,
        loadedEvents: null
        //Performance Enhancement
    },
           
    control: {
        eventToolbar: {
           onNavigationButtonTap: 'onBack',
           actionButtonTap: 'addPersonalEvent'
        },
        eventListFilter: {
           gotomyschedule: 'goToMySchedule',
           locationbtntap: 'onLocationbtnTap',
           topicbtntap: 'onTopicbtnTap',
           seachkeyup: 'onTapSearchButton',
           clearicontap: 'onClearIconTap'
        },
        selectEventItem: {
           eventitemtap: 'onEventItemTap',
           select: 'onSelectEventItem',
           scrollend: 'onNextButtonTap'
        },
        selectEventPanel: true,
           locationList: {
           itemtap: 'onItemLocationTap'
        },
        filterTopicList: {
           onsubmitfilter: 'onSubmitFilterTopic',
           show:'showPopupPanel',
           hide:'hidePopupPanel'
        },
        locationListPanel: {
           show:'showPopupPanel',
           hide:'hidePopupPanel'
        },
        clearLocationButton: {
           tap: 'clearLocationSelectTap'
        }
    },
           
    init: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
           
        if (currentUser && currentUser.isLogged()) {
           this.getEventToolbar().getController().setActionText(' + Add');
        } else {
           this.getEventToolbar().getController().setActionText('Login' );
        }
    },
           
    updateRecordForSelectItems: function(meetingStore) {       
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var eventMonthStore = currentUser.getEventMonthStore(meetingStore);
        if (eventMonthStore.getCount() > 0) {
           me.getSelectEventItem().setStore(eventMonthStore);
        }else{
           me.getSelectEventItem().setDeferEmptyText(false);
           me.getSelectEventItem().setEmptyText('<div style = "color: black; font-size: 13px;" class = "emptyText">No events found with your search criteria.</div>');
           me.getSelectEventItem().setStore(null);
        }
           
        me.getSelectEventPanel().setStore(meetingStore);
           
    },
           
    onGetData: function() {
        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});
        var eventItemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageEventList');
        me.setItemsPerPage(eventItemsPerPage);
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var params = {
           IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
           IsMember: true,
           FromMonth: '0',
           ToMonth: '12',
           OrgID: currentUser.get('organizationId'),
           OrgUnitID:  currentUser.get('organizationUnitId'),
           MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
           SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0',
           StartIndex: 1,
           ItemsPerPage: me.getItemsPerPage()
        };
        me.setParams(params);
           
        Ext.callback(function() {
            var store = Ext.getStore('meetingListtingMain');
            var iCalStore = Ext.getStore('iCalendarStoreMain');
            var recordIcal = iCalStore? iCalStore.getAt(0) : null;
                        
            if (recordIcal != null) {
                me.getLocationList().setStore(recordIcal.LocationListCountStore);
                me.getFilterTopicList().setStore(recordIcal.TopicListCountStore);
                me.setTotalEvents(recordIcal.get('totalCount'));
            }
                        
            if (store && store.getCount() > 0) {
                //me.setLoadedEventsCount(me.getItemsPerPage());
                //me.setTotalEvents(33);
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var eventListStore = storeManager.getEventListStore();
                var meetingStore = Ext.create(eventListStore);
                var agendaStore = Ext.getStore('agendaStoreListMain');
                var ctr = 0;
                var endCtr = me.getItemsPerPage() > store.getCount()?store.getCount():me.getItemsPerPage();
                //store.each(function(record) {
                for (var j = 0; j < endCtr; j++) {
                    record = store.getAt(j);
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
                            } else {
                                if (recordAgenda.get('meetingId') == record.get('productID')) {
                                    if (!record.get('isAdded')) {
                                        record.set('isAdded', true);
                                    }
                                }
                            }
                        }
                    }
                     
                    //// To Set store values from schedule
                    me.resetStoresFromSchedule(record);
                     
                    meetingStore.add(record);
                    ctr = ctr +1;
                    me.setLoadedEventsCount(ctr);
                    //});
                }
                me.updateRecordForSelectItems(meetingStore);
                me.setLoadedEvents(meetingStore);
                me.getView().setMasked(false);
            } else {
                me.onUpdateEventList();
            }
        }, me, [], 1);
    },
           
    onEventItemTap: function(event) {
        var me = this;
           
        Ext.callback(function() {
            me.openView(event);
        }, me, [], 1);
    },
           
    openView: function(record) {
        this.getView().fireEvent('requestopendetail','Personify.view.phone.event.EventDetail', {record:record});
    },
           
    onUpdateEventList: function() {
        var me = this;
        if(me.getView().getMasked().getHidden()){
           me.getView().setMasked({xtype: 'loadmask'});
        }
        me.getParams()['StartIndex'] = 1;
        me.setLoadedEventsCount(0);
        var selectEventItem = me.getSelectEventItem();
        var currentUser = Personify.utils.Configuration.getCurrentUser();
           
        if (currentUser && currentUser.isLogged()) {
           this.getEventToolbar().getController().setActionText(' + Add');
        } else {
           this.getEventToolbar().getController().setActionText('Login' );
        }
/*
 var attributes = {
 IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
 IsMember: true,
 FromMonth: '0',
 ToMonth: '12',
 OrgID: currentUser.get('organizationId'),
 OrgUnitID:  currentUser.get('organizationUnitId'),
 MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
 SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0',
 StartIndex: 1,
 ItemsPerPage: me.getItemsPerPage()
 };
 */
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var iCalendarStoreName = storeManager.getICalendarStore();
        var store = Ext.create(iCalendarStoreName);
        var iCalendar = Ext.create(iCalendarStoreName);
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        var agendaStore = Ext.getStore('agendaStoreListMain');
        meetingStore.setStoreId('meetingListtingMain');
        iCalendar.setStoreId('iCalendarStoreMain');
        //store.setDataRequest(attributes);
        store.setDataRequest(me.getParams());
        
        store.load({
            callback: function(records, operation, success) {
                me.getView().setMasked(false);
                if (success) {
                    store.getAt(0).EventListStore.each(function(record) {
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
                                                       
                        meetingStore.add(record);
                        me.setLoadedEventsCount(me.getLoadedEventsCount()+1);
                        //add event item
                                                       
                    });
                    me.setTotalEvents(store.getAt(0).get('totalCount'));
                    store.each(function(record) {
                        iCalendar.add(record);
                    })
                      
                    me.updateRecordForSelectItems(meetingStore);
                      
                    var recordIcal = store.getAt(0);
                    me.getLocationList().setStore(recordIcal.LocationListCountStore);
                    me.getFilterTopicList().setStore(recordIcal.TopicListCountStore);
                      
                      //me.onUpdateNextEventList(agendaStore, meetingStore, iCalendar, currentUser);
                }
            },
            scope: this
        });
    },
    onBack: function() {
        this.getView().fireEvent('backtomain',this);
    },
           
    goToMySchedule: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        
        if (currentUser && currentUser.isLogged()) {
           this.getView().fireEvent('requestchangeview','Personify.view.phone.Schedule', null);
        } else {
           this.getView().fireEvent('requestopendetail','Personify.view.phone.login.LoginPhone', null);
        }
    },
           
    onItemLocationTap: function(dataView, index, target, record, e, eOpts) {
        this.getLocationListPanel().hide();
        this.filterByLocation(record);
    },
           
    filterByLocation: function(record) {
        this.setLocation(null);
        this.checkAndCompileFilter(false);
        var store = this.getSelectEventPanel().getStore();
        if(record != null)
        {
           store.filter(function (recordEvent){
                if(recordEvent.get('locationState') == record.get('code')){
                    return recordEvent;
                }
            });
           this.setLocation(record);
           this.getEventListFilter().getController().setSearchViewText("Location: " + record.get('description'));
           this.updateRecordForSelectItems(store);
           this.setIsSelectAll(true);
           this.getSelectEventItem().selectAll();
           this.setIsSelectAll(false);
        }else if(this.getTopic() == null && this.getSearchText() == null){
           this.onGetData();
        }
    },
           
    onSubmitFilterTopic: function(topicList){
        this.setTopic(null);
        this.checkAndCompileFilter(false);
        var store = this.getSelectEventPanel().getStore();
        var numberOfRecordSelection = 0;
           
        if(topicList && topicList.getCount() > 0){
           var topic = new Array();
           var subtopic = new Array();
           topicList.each(function(topicRecord){
                if(topicRecord.get('checked') == 'checked'){
                    topic.push(topicRecord.get('code'));
                    var subArr = new Array();
                    if(topicRecord.SubcodeListEvent){
                        topicRecord.SubcodeListEvent.each(function(subRecord){
                            if(subRecord.get('checked') == 'checked'){
                                subArr.push(subRecord.get('code'));
                            }
                        });
                    }
                    subtopic.push(subArr);
                }
            });
           if(topic.length > 0){
                store.filter(function(record){
                    var match = false;
                    var topicListEvent = record.TopicListEvent;
                    topicListEvent.each( function(topicRecord){
                        var index = Ext.Array.indexOf(topic, topicRecord.get('code'));
                        if(index >= 0 ){
                            var subTopicString = subtopic[index];
                            if(subTopicString && subTopicString.length > 0){
                                var subRecord = topicRecord.SubcodeListEvent;
                                subRecord.each(function (childRecord){
                                    if(Ext.Array.contains(subTopicString, childRecord.get('code'))){
                                        match = true;
                                    }
                                });
                            }else{
                                match = true;
                            }
                        }
                    })
                    if(match && topicListEvent.getAllCount() > 0){
                        return record;
                    }
                });
                this.setTopic(topicList);
            }
           
           this.updateRecordForSelectItems(store);
           
           this.getSelectEventItem().deselectAll(true);
           var numberRecordOfListEvent = this.getSelectEventItem().getStore().getCount();
           
           for (var i = numberOfRecordSelection; i < numberRecordOfListEvent; i++) {
                if (Ext.get(this.getSelectEventItem().getViewItems()[i].id.trim()).down('.p-filter-button-new')) {
                    this.getSelectEventItem().select(i);
                }
           }
        } else if(this.getLocation() == null && this.getSearchText() == null){
           this.onGetData();
        }
        else{
           this.setTopic(null);
        }
    },
           
    onLocationbtnTap: function(button) {
        this.getLocationListPanel().showBy(button);
    },
           
    onTopicbtnTap: function(button) {
        this.getFilterTopicList().showBy(button);
    },
    showPopupPanel: function(obj) {
        Personify.utils.BackHandler.pushActionAndTarget('forceHide', this, obj);
   },
           
   hidePopupPanel: function(obj) {
           Personify.utils.BackHandler.popActionAndTarget('forceHide', this, obj);
   },
           
   forceHide: function(obj) {
        obj.hide();
        this.checkAndCompileFilter();
   },
           
    onTapSearchButton: function(value) {
        this.setSearchText(null);
        this.checkAndCompileFilter(false);
        if(value.trim() != ''){
           var store = this.getSelectEventPanel().getStore();
           store.filter(function(record) {
                didMatch =  (record.get('shortName').trim().toLowerCase() + " "
                    + record.get('shortDescription').trim().toLowerCase() + " "
                    + record.get('eventType').trim().toLowerCase() + " "
                    + record.get('location').trim().toLowerCase()
                    ).match(value.trim().toLowerCase());
                        
                var speakers = record.SpeakersListEvent;
                speakers.each( function(speaker){
                    didMatch = didMatch || speaker.get('name').trim().toLowerCase().match(value.trim().toLowerCase());
                });
            
                if (didMatch) {
                    return record;
                }
            });
           this.setSearchText(value);
           this.updateRecordForSelectItems(store);
           this.setIsSelectAll(true);
           this.getSelectEventItem().selectAll();
           this.setIsSelectAll(false);
        }else if(this.getLocation() == null && this.getTopic() == null){
           this.onGetData();
        }
           
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
        this.setLoadedEventsCount(meetingStore.getCount());
        this.updateRecordForSelectItems(meetingStore);
    },
           
    checkAndCompileFilter: function(isCalledFromParent) {
        if(!isCalledFromParent)
        {
           this.clearFilter();
           
           if(this.getLocation() != null){
                this.filterByLocation(this.getLocation());
           }
           
           if(this.getSearchText() != null){
                this.onTapSearchButton(this.getSearchText());
           }
           
           if(this.getTopic() != null){
            this.onSubmitFilterTopic(this.getTopic());
           }
        }
        else if(this.getLocation() != null || this.getSearchText() != null || this.getTopic() != null){
           
           this.clearFilter();
           
           if(this.getLocation() != null){
                this.filterByLocation(this.getLocation());
           }
           
           if(this.getSearchText() != null){
                this.onTapSearchButton(this.getSearchText());
           }
           
           if(this.getTopic() != null){
                this.onSubmitFilterTopic(this.getTopic());
           }
        }
        else{
           this.onGetData();
        }
    },
    
    addPersonalEvent: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser && currentUser.isLogged()) {
           this.getView().fireEvent('requestopendetail','Personify.view.phone.addevent.AddEvent', null);
        } else {
           this.getView().fireEvent('requestopendetail','Personify.view.phone.login.LoginPhone', null);
        }
    },
           
    onClearIconTap: function() {
        var me = this;
        /* this.setSearchText(null);
        var store = Ext.getStore('meetingListtingMain');
        this.getSelectEventPanel().setStore(store);
        if(this.getLocation() == null && this.getSearchText() == null && this.getTopic() == null){
            me.reloadData();
        }
        else{
        if(this.getLocation() != null){
            this.filterByLocation(this.getLocation());
        }
        
        if(this.getSearchText() != null){
            this.onTapSearchButton(this.getSearchText());
        }
            
        if(this.getTopic() != null){
            this.onSubmitFilterTopic(this.getTopic());
        }
            
        store = this.getSelectEventPanel().getStore();
        this.updateRecordForSelectItems(store);
         }*/
        me.onTapSearchButton('');
    },
        
    clearLocationSelectTap: function() {
        var me = this;
        this.getLocationListPanel().hide();
        this.getLocationList().deselectAll();
        this.setLocation(null);
        this.getEventListFilter().getController().setSearchViewText('');
        /*var store = Ext.getStore('meetingListtingMain');
        this.getSelectEventPanel().setStore(store);
        if(this.getLocation() == null && this.getSearchText() == null && this.getTopic() == null){
            me.reloadData();
        }
        else{
            this.checkAndCompileFilter(false);
        }*/
        me.filterByLocation(null);
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
    },
    onNextButtonTap: function() {
        var me = this;
        var meetingStore = Ext.getStore('meetingListtingMain');
        if (me.getLoadedEventsCount() < meetingStore.getCount()) {
           me.getView().setMasked({xtype:'loadmask'});
           startCtr =me.getLoadedEventsCount();
           endCtr =startCtr + me.getItemsPerPage();
           for(i=startCtr; i < endCtr; i++)
           {
                me.getLoadedEvents().add(meetingStore.getAt(i));
                me.setLoadedEventsCount(me.getLoadedEventsCount() +1);
           }
           me.updateRecordForSelectItems(me.getLoadedEvents());
           me.getView().setMasked(false);
           
        } else if ((me.getLoadedEventsCount() < me.getTotalEvents()) || (me.getLoadedEventsCount() == me.getItemsPerPage())) {
           
           ////me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + me.getItemsPerPage();
            var msCount=meetingStore.getCount();
            me.getParams()['StartIndex'] = msCount + 1;
            me.loadEventModel();
        }
    },
    loadEventModel:function() {
        var me = this;
        me.getView().setMasked({xtype:'loadmask'});
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var iCalendarStoreName = storeManager.getICalendarStore();
        var store = Ext.create(iCalendarStoreName);
           
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.getStore('meetingListtingMain');
        var meetingStore1 = Ext.create(eventListStore);
        var agendaStore = Ext.getStore('agendaStoreListMain');
           
        store.setDataRequest(me.getParams());
           
        store.load({
            callback: function(records, operation, success) {
                me.getView().setMasked(false);
                if (success) {
                    store.getAt(0).EventListStore.each(function(record) {
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
                                                         
                        /*meetingStore.add(record);
                        meetingStore1.add(record);
                        me.setLoadedEventsCount(me.getLoadedEventsCount()+1);*/
                        //add event item
                                                       
                        if (meetingStore)
                        {
                            var recordIndex = meetingStore.findBy(function(existingrecord, id) {
                                if (existingrecord.get('productID') === record.get('productID')){
                                    return true;
                                }
                                return false; // there is no record in the store with this ID
                            });
                                                       
                            if (recordIndex == -1) {
                                                       
                                me.resetStoresFromSchedule(record);
                                
                                meetingStore.add(record);
                                meetingStore1.add(record);
                                me.setLoadedEventsCount(me.getLoadedEventsCount()+1);
                            }
                                                       
                        }
                                   
                                                       
                                                         
                    });
                    me.setTotalEvents(store.getAt(0).get('totalCount'));
                    me.updateRecordForSelectItems(meetingStore);
                    var iCalStore = Ext.getStore('iCalendarStoreMain');
                      
                    me.updateLocationListCountStore(store,iCalStore);
                    me.updateTopicListCountStore(store,iCalStore);
                    me.checkAndCompileFilter(false);
                      
                }
                else
                {
                    Ext.Msg.alert('Personify', 'Unable to load events.', Ext.emptyFn);
                }
                me.getView().setMasked(false);
            },
            scope: me
        });
    },
           
    resetStoresFromSchedule:function(recodEvent)
    {
           var scheduleListStore = Ext.getStore('scheduleListtingMain');
           if(scheduleListStore)
           {
                var recordSchedule = scheduleListStore.getAt(0);       
           
                //// If Product IDs matched then it Means other data of this record is already downloaded in schedule
                if(recodEvent.get('productID')==recordSchedule.get('productID'))
                {
                    if(recordSchedule.SessionStore)
                    {
                        recodEvent.SessionStore=recordSchedule.SessionStore;
                    }
           
                    if(recordSchedule.ExhibitorStore)
                    {
                        recodEvent.ExhibitorStore=recordSchedule.ExhibitorStore;
                    }
           
                    scheduleListStore.removeAll();
                    scheduleListStore.destroy();
                }
           }
           
    },
           
    updateLocationListCountStore: function(store, iCalStore){
        
        var locationListCountStore = iCalStore.getAt(0).LocationListCountStore;
           
        store.getAt(0).LocationListCountStore.each(function(record) {
            var isExists = false;
            if (locationListCountStore) {
                for (var i = 0; i < locationListCountStore.getCount(); i++) {
                    var recordLocationListCount = locationListCountStore.getAt(i);
                    var cnt = 0;
                    if (recordLocationListCount.get('code') == record.get('code')) {
                        cnt =locationListCountStore.getAt(i).get('count') + record.get('count');
                        locationListCountStore.getAt(i).set('count',cnt);
                        isExists = true;
                        break;
                    }
                }
                if(!isExists){
                    locationListCountStore.add(record);
                }
            }
        });
    
    },
    updateTopicListCountStore: function(store, iCalStore){
        //var iCalStore = Ext.getStore('iCalendarStoreMain');
        var topicListCountStore = iCalStore.getAt(0).TopicListCountStore;
        
        store.getAt(0).TopicListCountStore.each(function(record) {
            var isTopicExists = false;
            if (topicListCountStore) {
                for (var k = 0; k < topicListCountStore.getCount(); k++) {
                    var recordTopicListCount = topicListCountStore.getAt(k);
                    var topicCnt = 0;
                    if (recordTopicListCount.get('code') == record.get('code')) {
                        topicCnt =topicListCountStore.getAt(k).get('count') + record.get('count');
                        topicListCountStore.getAt(k).set('count',topicCnt);
                        isTopicExists = true;
                                                
                                                   
                                                   
                        var subcodeListEventStore = topicListCountStore.getAt(k).SubcodeListEvent;
                        record.SubcodeListEvent.each(function(subCodeRecord) {
                            var isSubCodeExists = false;
                            if(subcodeListEventStore){
                                for (var j = 0; j < subcodeListEventStore.getCount(); j++) {
                                    var subCodeCnt = 0;
                                    if (subcodeListEventStore.getAt(j).get('code') == subCodeRecord.get('code')) {
                                        subCodeCnt =subcodeListEventStore.getAt(j).get('count') + subCodeRecord.get('count');
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
                                
                        break;
                    }
                }
                if(!isTopicExists){
                    topicListCountStore.add(record);
                }
            }
        });
        
    }
});

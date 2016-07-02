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
        isSelectAll: false
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
            select: 'onSelectEventItem'
        },
        selectEventPanel: true,
        locationList: {
            itemtap: 'onItemLocationTap'
        },
        filterTopicList: {
            onsubmitfilter: 'onSubmitFilterTopic'
        },
        locationListPanel: true,
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
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var eventMonthStore = currentUser.getEventMonthStore(meetingStore);
        if (eventMonthStore.getCount() <= 0) {
            this.getSelectEventItem().setDeferEmptyText(false);
            this.getSelectEventItem().setEmptyText('<div style = "color: black; font-size: 13px;" class = "emptyText">No events found with your search criteria.</div>');
        }

        this.getSelectEventItem().setStore(eventMonthStore);
        this.getSelectEventPanel().setStore(meetingStore);
    },

    onGetData: function() {
        var me = this;
        me.getView().setMasked({xtype: 'loadmask'});

        Ext.callback(function() {
            var store = Ext.getStore('meetingListtingMain');
            var iCalStore = Ext.getStore('iCalendarStoreMain');
            var recordIcal = iCalStore? iCalStore.getAt(0) : null;

            if (recordIcal != null) {
                me.getLocationList().setStore(recordIcal.LocationListCountStore);
                me.getFilterTopicList().setStore(recordIcal.TopicListCountStore);
            }

            if (store && store.getCount() > 0) {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var eventListStore = storeManager.getEventListStore();
                var meetingStore = Ext.create(eventListStore);
                var agendaStore = Ext.getStore('agendaStoreListMain');

                store.each(function(record) {
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

                    meetingStore.add(record);
                });

                me.updateRecordForSelectItems(meetingStore);
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
        var selectEventItem = me.getSelectEventItem();
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            this.getEventToolbar().getController().setActionText(' + Add');
        } else {
            this.getEventToolbar().getController().setActionText('Login' );
        }

        var attributes = {
            IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
            IsMember: true,
            FromMonth: '1',
            ToMonth: '12',
            OrgID: currentUser.get('organizationId'),
            OrgUnitID:  currentUser.get('organizationUnitId'),
            MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
            SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0'
        };

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var iCalendarStoreName = storeManager.getICalendarStore();
        var store = Ext.create(iCalendarStoreName);
        var iCalendar = Ext.create(iCalendarStoreName);
        var eventListStore = storeManager.getEventListStore();
        var meetingStore = Ext.create(eventListStore);
        var agendaStore = Ext.getStore('agendaStoreListMain');
        meetingStore.setStoreId('meetingListtingMain');
        iCalendar.setStoreId('iCalendarStoreMain');
        store.setDataRequest(attributes);

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
                        //add event item

                    });

                    store.each(function(record) {
                        iCalendar.add(record);
                    })

                    me.updateRecordForSelectItems(meetingStore);

                    var recordIcal = store.getAt(0);
                    me.getLocationList().setStore(recordIcal.LocationListCountStore);
                    me.getFilterTopicList().setStore(recordIcal.TopicListCountStore);
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
        this.checkAndCompileFilter();
        var store = this.getSelectEventPanel().getStore();

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
    },

    onSubmitFilterTopic: function(topicList){
        this.setTopic(null);
        this.checkAndCompileFilter();
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
        } else {
            this.setTopic(null);
        }
    },

    onLocationbtnTap: function(button) {
        this.getLocationListPanel().showBy(button);
    },

    onTopicbtnTap: function(button) {
        this.getFilterTopicList().showBy(button);
    },

    onTapSearchButton: function(value) {
        this.setSearchText(null);
        this.checkAndCompileFilter();
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
        this.updateRecordForSelectItems(meetingStore);
    },

    checkAndCompileFilter: function() {
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
        this.setSearchText(null);
        var store = Ext.getStore('meetingListtingMain');
        this.getSelectEventPanel().setStore(store);

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
    },

    clearLocationSelectTap: function() {
        this.getLocationListPanel().hide();
        this.getLocationList().deselectAll();
        this.setLocation(null);
        this.getEventListFilter().getController().setSearchViewText('');
        this.checkAndCompileFilter();
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

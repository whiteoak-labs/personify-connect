Ext.define('Personify.controller.phone.schedule.SchedulePanel', {
    extend: 'Personify.base.Controller',

    config: {
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
        searchField :{
            change: 'onTapSearchButton',
            clearicontap: 'onClearIconTap',
           keyup: 'onTapSearchButton',
        },
        selectScheduleItem: {
            removeitem: 'removeMyScheduleItem',
            eventitemtap: 'openMyScheduleItem',
            select: 'onSelectMyScheduleItem'
        },
        selectSchedulePanel: true,
        allEventButton: {
            tap: 'goToAllEvent'
        }
    },

    init: function() {
        this.getEventToolbar().getController().setActionText(' + Add');
    },

    updateRecordForSelectItems: function(scheduleStore) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var store = currentUser.getScheduleMonthStore(scheduleStore);
        this.getSelectScheduleItem().setStore(store);
        this.getSelectSchedulePanel().setStore(scheduleStore);
    },

    onGetData: function() {
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this;

        Ext.callback(function() {
            var store = Ext.getStore('agendaStoreListMain');
            if (store && store.getCount() > 0) {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var agendaStoreName = storeManager.getAgendaStore();
                var agendaStore = Ext.create(agendaStoreName);
                store.each(function(record) {
                    agendaStore.add(record);
                });
                me.updateRecordForSelectItems(agendaStore);
            } else {
                me.onUpdateMySchedule();
            }

            Ext.Viewport.setMasked(false);
        }, me, [], 1);
    },

    onUpdateMySchedule: function(isLogin) {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (currentUser && currentUser.isLogged()) {
            if (window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Agenda List');
            }

            var me = this;
            me.getView().setMasked({xtype: 'loadmask'});

            var attributes = {
                MasterCustomerID: currentUser? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID: currentUser? currentUser.get('subCustomerId'): '',
                MeetingID: ''
            };

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var agendaStoreName = storeManager.getAgendaStore();
            var store = Ext.create(agendaStoreName);
            var agendaStore = Ext.create(agendaStoreName);
            store.setDataRequest(attributes);
            store.setStoreId('agendaStoreListMain');
            store.load ({
                callback: function(records, operation, success) {
                    me.getView().setMasked(false);
                    if (records.length > 0) {
                        store.each(function(record){
                            agendaStore.add(record);
                        });
                    }

                    me.updateRecordForSelectItems(agendaStore);
                    me.getView().setMasked(false);
                },
                scope: this
            });
        }
    },

    onBack: function() {
        this.getView().fireEvent('backtomain', this);
    },

    onTapSearchButton: function(field, e) {
        var value = field.getValue().trim();
        var store = this.getSelectSchedulePanel().getStore();
        store.clearFilter();
        if (value != '') {
            store.filter(function(record) {
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
            this.updateRecordForSelectItems(store);
            this.setIsSelectAll(true);
            this.getSelectScheduleItem().selectAll();
            this.setIsSelectAll(false);
        }
    },

    addOrRemoveRecordToStore: function(records) {
        var store = this.getSelectSchedulePanel().getStore();
        store.removeAll();

        for (var i = 0; i < records.length; i++) {
            store.add(records[i]);
        }
        this.updateRecordForSelectItems(store);
        Ext.Viewport.setMasked(false);
    },

    addOrRemoveByMeetingRecord: function(record, add, records) {
        var me = this;
        me.addOrRemoveRecordToStore(records);
    },

    addPersonalEvent: function() {
        this.getView().fireEvent('requestopendetail','Personify.view.phone.addevent.AddEvent', null);
    },

    onClearIconTap: function() {
        var store = this.getSelectSchedulePanel().getStore();
        store.clearFilter();
        this.updateRecordForSelectItems(store);
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

    goToAllEvent: function() {
        this.getView().fireEvent('requestchangeview','Personify.view.phone.Event', null);
    },

    removeMyScheduleItem: function(record) {
        var me = this;
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);

        Ext.Msg.confirm('', message.msg, processResult);
        function processResult(clickedButton) {
            Ext.Msg.hide();
            if(clickedButton == 'yes'){
                Ext.Viewport.setMasked(false);
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('removeagenda', record, function(success) {
                    if(success) {
                        me.getSelectSchedulePanel().getStore().remove(record);
                        Ext.Msg.alert('', message.msgSuccess, Ext.emptyFn);
                        Ext.Viewport.setMasked(false);
                    }
                });
            }
        }
    },

    openMyScheduleItem: function(record) {
           
        var me = this;

        if (record.get('type').toUpperCase() == 'PERSONAL') {
            me.getView().fireEvent('requestopendetail', 'Personify.view.phone.schedule.PersonalAgenda', {record:record});
        } else {
            var meetingID = record.get('meetingId'),
                sessionID = record.get('sessionID'),
                store = Ext.getStore('meetingListtingMain');
            if(store) {
                var noMeetingFound = true;
                store.each(function(recordEvent) {
                    if(recordEvent.get('productID') == meetingID) {
                        noMeetingFound = false;
                        recordEvent.set('appointmentId', record.get('appointmentId'));
                        if(sessionID > 0) {
                            var storeSession = recordEvent.SessionStore;
                            if (!storeSession || storeSession.getCount() <= 0) {
                                var clsLoadMask = '';
                                var mask = {xtype: 'loadmask',message: 'Loading..',fullscreen: true, centered: true, cls: clsLoadMask};
                                Ext.Viewport.setMasked(mask);
                                var currentUser = Personify.utils.Configuration.getCurrentUser();
                                var attributes = {
                                    "MeetingID": record.get('meetingId'),
                                    "IsStaffMember": currentUser? currentUser.isStaffMember().toString() : false,
                                    "IsMember": currentUser ? currentUser.isMember().toString() : false,
                                    "ItemsPerPage": "100000",
                                    "StartIndex": "0"
                                };
                                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                                var storeSessionName = storeManager.getSessionStore();
                                var storeSession = Ext.create(storeSessionName);
                                storeSession.setDataRequest(attributes);
                                record.SessionStore = storeSession;
                                storeSession.load({ scope: me, callback: function() {
                                    Ext.Viewport.setMasked(false);
                                    storeSession.each(function(recordSession) {
                                        if(recordSession.get('sessionID') == sessionID) {
                                            recordSession.set('appointmentId', record.get('appointmentId'));

                                            if (!recordSession.get('isAdded')) {
                                                recordSession.set('isAdded', true);
                                            }
                                            me.loadDetailSessionStore(recordSession, function(sessionRecords) {
                                                me.getView().fireEvent('requestopendetail', 'Personify.view.phone.session.SessionDetail', {record: recordSession, meetingRecord: recordEvent, locationDescription: recordSession.get('locationDescription'), sessionRecords: sessionRecords});
                                            });
                                        }
                                    })
                                }});
                            } else {
                                storeSession.each(function(recordSession) {
                                    if(recordSession.get('sessionID') == sessionID) {
                                        recordSession.set('appointmentId', record.get('appointmentId'));

                                        if (!recordSession.get('isAdded')) {
                                            recordSession.set('isAdded', true);
                                        }

                                        me.loadDetailSessionStore(recordSession, function(sessionRecords) {
                                            me.getView().fireEvent('requestopendetail', 'Personify.view.phone.session.SessionDetail', {record: recordSession, meetingRecord: recordEvent, locationDescription: recordSession.get('locationDescription'), sessionRecords: sessionRecords});
                                        });
                                    }
                                })
                            }
                        } else {
                            recordEvent.set('isAdded', true);
                            me.getView().fireEvent('requestopendetail', 'Personify.view.phone.event.EventDetail', {record:recordEvent});
                        }
                    }
                });

                if(noMeetingFound){
                    Ext.Msg.alert('', 'Cannot find associated meeting, please help to report this problem.');
                }
            }
        }
    },

    onSelectMyScheduleItem: function(list, record) {
        if (this.getIsSelectAll() && !record.get('expanded'))
            record.set('expanded', true);
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
    }
});

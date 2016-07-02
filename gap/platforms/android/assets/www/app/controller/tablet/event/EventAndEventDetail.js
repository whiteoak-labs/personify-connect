Ext.define('Personify.controller.tablet.event.EventAndEventDetail', {
    extend: 'Personify.base.Controller',
    control: {
        eventListPage: {
            eventitemlistselect: 'onItemSelect',
            copymeetinglist: 'onCopyMeetingList',
            gotomyschedule: 'onGoToMySchedule',
            refreshmyschedule: 'refreshMySchedule'
        },

        view: {
            activeitemchange: 'activeItemChange'
        }

    },

    config: {
        simpleEventPage: null,
        complexEventPage: null,
        simpleEventIndex: null,
        complexEventIndex: null
    },

    init: function() {
           
        this.getView().setMasked(false);
    },

    onPainted: function(){
           
        Ext.Viewport.setMasked(false);
    },

    onItemSelect: function(record, masked) {
        var me = this;
        var isConference = record.get('isConference');
        var eventView = null;
        if (isConference) {
           var viewMode = '';
           if(Ext.Viewport.supportsOrientation())
           {
                if (Ext.Viewport.getWindowOrientation() % 180 === 0) {
                    viewMode = 'portrait';
                }
                else
                {
                    viewMode = 'landscape';
                }
           }
           else
           {
                if (Ext.Viewport.getWindowHeight() >= Ext.Viewport.getWindowWidth()) {
                    viewMode = 'portrait';
                }
                else
                {
                    viewMode = 'landscape';
                }
           }
           
            var clsLoadMask = '';
            /*var temp = record.data.shortName.toLowerCase();

            if (temp.indexOf('july week-end retreat') == 0 || temp.indexOf('tma resources annual users group 2013') == 0) {
                if (Ext.Viewport.getOrientation() == 'landscape') {
                    clsLoadMask = 'p-loading-special-events-landscape';
                } else {
                    clsLoadMask = 'p-loading-special-events-portrait';
                }
            } else {*/
                if (viewMode == 'landscape') {
                    clsLoadMask = 'p-loading-normal-events-landscape';
                } else {
                    clsLoadMask = 'p-loading-normal-events-portrait';
                }
            /*}*/
           
           
            var mask = {xtype: 'loadmask', message: 'Loading…', fullscreen: true, centered: true, cls: clsLoadMask};

            if (masked !== true) {
                Ext.Viewport.setMasked(mask);
            }

            Ext.callback(function() {
                eventView = Ext.create('Personify.view.event.complexevent.ComplexEvent', {
                    itemId: 'complexeventPage',
                    listeners: {
                        backtoevent: {
                            scope: me,
                            fn: me.onBackToEvent
                        },
                        updateagendalist: {
                            scope: me,
                            fn: me.refreshMySchedule
                        }
                    }
                });
                         
                me.getView().add(eventView);
                eventView.setRecord(record);
                eventView.getController().setCountLoad(0);
                        
                eventView.getController().getAllDataOfChild(record, 'sessionsAndDetail');
                        
                me.getView().setActiveItem(1);
                        
            }, me, [], 1);
        } else {
            eventView = Ext.create('Personify.view.event.simpleEvent.SimpleEvent', {
                itemId: 'simpleEventPage',
                listeners: {
                    backtoevent: {
                        scope: me,
                        fn: me.onBackToEvent
                    },
                    updatemeetinglist: {
                        scope: me,
                        fn: me.onUpdateEventList
                    },
                    refreshmyschedule: {
                        scope: me,
                        fn: me.refreshMySchedule
                    }
                }
            });
            me.getView().add(eventView);

            eventView.setRecord(record);
            eventView.getController().initView();
            me.getView().setActiveItem(1);
        }
        this.getView().fireEvent('updatetitle',record.get('shortName'));
    },
    
    onBackToEvent: function(){
        this.getView().setActiveItem(0);
        this.getView().fireEvent('updatetitle', 'Events', 'eventmenuitem', true);
    },
    
    onGoToMySchedule: function() {
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if(currentUser && currentUser.isLogged()){
            this.getView().fireEvent('requestchangeview', 'Personify.view.ScheduleAndEventDetail', null, 'My Schedule', 'schedulemenuitem');
        }else{
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },
    refreshData: function(){
           
        var me = this;
        var view = this.getView().getActiveItem();

        if (view.getItemId() != 'eventListPage') {
            var mask = null;

            if (Ext.Viewport.getOrientation() == 'landscape') {
                mask = { xtype: 'loadmask', message: 'Loading..', fullscreen: true, centered: true, cls: 'p-loading-ipad-landscape' };
            } else {
                mask = { xtype: 'loadmask', message: 'Loading..', fullscreen: true, centered: true, cls: 'p-loading-ipad-portrait' };
            }

            Ext.Viewport.setMasked(mask);
            this.getEventListPage().getController().onGetData(function() {
                var meetingStore = Ext.getStore('meetingListtingMain');
                var currentEvent = view.getRecord();
                var event = null;

                for (var i = 0; i < meetingStore.getCount(); i++) {
                    event = meetingStore.getAt(i);

                    if (event.get('productID') == currentEvent.get('productID')) {
                        currentEvent.set('badgeData', event.get('badgeData'));
                        break;
                    }
                }

                view.refresh();
            });
        } else {
            view.refresh();
        }
    },
    
    onUpdateEventList: function(){
           
        this.getEventListPage().getController().onGetData();
        this.getEventListPage().getController().combineFilter();
    },
    
    onCopyMeetingList: function(store, iCalStore){
        this.getView().getParent().fireEvent('copymeetinglist', store, iCalStore);
    },
    
    refreshMySchedule: function(){
        this.getView().getParent().fireEvent('updateagendalist');
    },

    activeItemChange: function(panel, newActiveItem, oldActiveItem, eOpts) {
           
        if (newActiveItem.getItemId() == 'eventListPage') {
            panel.remove(oldActiveItem, true);
        }
    }
});

Ext.define('Personify.view.event.complexevent.sessions.eventschedule.EventSchedule',{
    extend: 'Ext.Container',
    xtype: 'eventschedule',
    controller: 'Personify.controller.event.complexevent.sessions.eventschedule.EventSchedule',

    requires: [
        'Personify.controller.event.complexevent.sessions.eventschedule.EventSchedule',
        'Personify.view.event.complexevent.sessions.myschedule.CalendarSegment',
        'Personify.view.event.complexevent.sessions.myschedule.FilterSession',
        'Personify.view.event.complexevent.sessions.eventschedule.EventList',
        'Personify.view.event.complexevent.sessions.myschedule.FilterList'
    ],

    config: {
        cls: 'event-schedule',
        layout: 'vbox',
        items: [
            {
                itemId: 'filterSession',
                xtype: 'filtersession',
                cls:'filter-session-panel'
            },
            {
                cls: 'p-text-viewing',
                itemId: 'filterTextLabel'
            },
            {
                layout: 'vbox',
                cls: 'p-segment-panel',
                items: [
                    {
                        docked: 'left',
                        xtype: 'button',
                        itemId: 'backSegmentButton',
                        cls: 'p-segment-control-btn-back',
                        hidden: true
                    },
                    {
                        itemId: 'calendarSegmentEventSchedule',
                        cls: 'segmented-button-container',
                        xtype: 'container'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        itemId: 'nextSegmentButton',
                        cls: 'p-segment-control-btn-next',
                        hidden: true
                    }
                ]
            },
            {
                itemId: 'eventList',
                flex: 1,
                xtype: 'eventlist'/*,
                listeners: {
                    initialize: function(c) {
                        c.element.on({
                            swipe: function(e, node, options) {
                                c.fireEvent('onSwipeEventList',e.direction);
                            }
                        });
                    }
                }*/
            },
            {
                itemId: 'filterListEventSchedule',
                xtype: 'filterlist',
                hidden: true,
                modal: true,
                hideOnMaskTap: true
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
})
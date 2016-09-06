Ext.define('Personify.view.event.complexevent.sessions.Sessions', {
    extend: 'Ext.Container',
    xtype: 'sessionsComplexEvent',
    controller: 'Personify.controller.event.complexevent.sessions.Sessions',

    requires: [
        'Personify.controller.event.complexevent.sessions.Sessions',
        'Personify.view.event.complexevent.sessions.eventschedule.EventSchedule',
        'Personify.view.event.complexevent.sessions.myschedule.MySchedule',
        'Personify.view.event.advertising.SponsorPanel'
    ],

    config: {
        meetingRecord: null,
        layout: 'vbox',
        items: [
            {
                flex: 1,
                layout: 'vbox',
                cls: 'complex-event-content-view',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        cls: 'segmented-button-container',
                        itemId: 'segmentedbutton',
                        allowMultiple: false,
                        items: [
                            {
                                itemId: 'eventScheduleSegment',
                                text: 'All Sessions',
                                cls: 'event-schedule-tab',
                                pressed: true
                            },
                            {
                                itemId: 'myScheduleSegment',
                                text: 'My Sessions',
                                cls: 'my-schedule-tab'
                            }
                        ]
                    },
                    {
                        itemId:'complexEventContentCard',
                        flex:1,
                        layout: 'card',
                        cls: 'complex-event-content-card',
                        items: [
                            {
                                itemId:'eventScheduleView',
                                xtype: 'eventschedule',
                                cls: 'event-schedule'
                            },
                            {
                                itemId:'myScheduleView',
                                xtype: 'myschedule',
                                cls: 'my-schedule'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'sponsorPanel',
                itemId: 'sponsorPanel',
                hidden: true
            }
        ]
    },
    
    updateRecord: function(record){
        if(record && record != null){
            this.getController().setRecord(record);
        }
    }
});
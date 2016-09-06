Ext.define('Personify.view.event.complexevent.sessions.myschedule.MySchedule',{
    extend: 'Ext.Container',
    xtype: 'myschedule',
    controller: 'Personify.controller.event.complexevent.sessions.myschedule.MySchedule',
    requires: [
        'Personify.controller.event.complexevent.sessions.myschedule.MySchedule',
        'Personify.view.event.complexevent.sessions.myschedule.CalendarSegment',
        'Personify.view.event.complexevent.sessions.myschedule.FilterSession',
        'Personify.view.event.complexevent.sessions.eventschedule.EventList',
        'Personify.view.event.complexevent.sessions.myschedule.MyScheduleList'
    ],
    config: {
        cls: 'my-schedule',
        layout: 'vbox',
        items: [
            {
                itemId: 'filterSession',
                xtype: 'filtersession',
                cls:'filter-session-panel'
            },
            {
                layout: 'vbox',
                cls: 'p-segment-panel',
                items: [
                    {
                        docked: 'left',
                        xtype: 'button',
                        itemId: 'backSegmentButtonMySchedule',
                        cls: 'p-segment-control-btn-back',
                        hidden: true
                    },
                    {
                        itemId: 'calendarSegmentMySchedule',
                        cls: 'segmented-button-container',
                        xtype: 'container',
                        height: '35px'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        itemId: 'nextSegmentButtonMySchedule',
                        cls: 'p-segment-control-btn-next',
                        hidden: true
                    }
                ]
            },
            {
                itemId: 'myScheduleList',
                flex: 1,
                xtype: 'mysessionschedulelist'
            }
        ]
    },
    
    updateRecord: function(record){
        if(record){
            this.getController().setRecord(record);
        }
    }
})
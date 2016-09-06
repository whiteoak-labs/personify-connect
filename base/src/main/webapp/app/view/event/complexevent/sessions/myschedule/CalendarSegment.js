Ext.define('Personify.view.event.complexevent.sessions.myschedule.CalendarSegment',{
    extend: 'Ext.SegmentedButton',
    xtype: 'calendarsegment',
    
    config: {
        cls: 'calendar-segmented-button',
        pressedCls:'pressed-segment',
            
        items: [
            {
                flex: 1,
                pressed: true,
                cls: ['agendaSegmentFirst','item-segment'],
                text: 'Jan 11'
            },
            {
                flex: 1,
                cls: ['agendaSegmentNotFirst','item-segment'],
                text: 'Jan 12'
            },
            {
                flex: 1,
                cls: ['agendaSegmentNotFirst','item-segment'],
                text: 'Jan 13'
            }
        ]
    } 
})
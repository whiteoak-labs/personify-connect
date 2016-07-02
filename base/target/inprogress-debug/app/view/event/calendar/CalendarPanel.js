Ext.define('Personify.view.event.calendar.CalendarPanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.event.calendar.CalendarPanel',
    xtype: 'calendarPanel',
    requires: [
        'Personify.controller.event.calendar.CalendarPanel',
        'Personify.view.event.calendar.CalendarButton'
    ],
    config: {
        layout: 'vbox',
        width: '100%',
        items: [
            {
                cls: 'p-label-title',
                itemId: 'calendarText',
                html: 'Jump to a Specific Date'
            },
            {
                xtype: 'calendarbutton',
                itemId: 'calendarButton'
            },
            {
                height: 255,
                cls: 'p-calendar-panel',
                itemId:'calendar',
                layout: 'fit'
            }
        ]
    }
});
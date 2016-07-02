Ext.define('Personify.view.phone.schedule.SchedulePanel', {
    extend: 'Ext.Panel',
    xtype: 'myschedulePanel',
    controller: 'Personify.controller.phone.schedule.SchedulePanel',
    
    requires: [
        'Personify.controller.phone.schedule.SchedulePanel',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.schedule.schedules.SelectSchedulePanel',
        'Personify.view.phone.schedule.PersonalAgenda'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-background-white',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'My Schedule',
                itemId: 'eventToolbar'
            },
            {
                layout: 'hbox',
                items: [
                    {
                        flex: 1,
                        itemId: 'searchField',
                        cls: 'p-phone-search-field',
                        xtype: 'searchfieldwithsearchkeyboard'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        cls: 'p-phone-button-event-filter',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId:'allEventButton',
                        text: 'All Events',
                        style: 'margin-right: 10px; margin-left:2px'
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'phone-selectschedulepanel',
                itemId: 'selectSchedulePanel',
                style: 'margin-bottom: 51px'
            }
        ]
    }//end config
});
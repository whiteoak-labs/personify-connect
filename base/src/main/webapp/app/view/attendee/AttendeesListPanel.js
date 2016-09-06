Ext.define('Personify.view.attendee.AttendeesListPanel', {
    extend: 'Ext.Panel',
    xtype: 'attendeeslistpanel',
    controller: 'Personify.controller.attendees.AttendeesListPanel',

    requires: [
        'Personify.controller.attendees.AttendeesListPanel',
        'Personify.view.attendee.AttendeesList',
        'Personify.view.event.search.SearchPanel'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                style: 'margin: 10px 0px;',
                items: [
                    {
                        flex: 1,
                        xtype: 'searchEventPanel',
                        itemId: 'searchFieldAttendees'
                    }
                    /*,
                    {
                        xtype: 'button',
                        cls: 'clearFilter',
                        pressedCls: 'red-button-pressing-background',
                        itemId: 'btnClearFilter',
                        text: 'Clear Filters',
                        docked: 'right',
                        disabled: true,
                        disabledCls: 'p-button-disabled'
                    }*/
                ]
            },
            {
                flex: 1,
                xtype: 'attendeeslist',
                itemId: 'attendeesList'                
            }
        ]
    }
});
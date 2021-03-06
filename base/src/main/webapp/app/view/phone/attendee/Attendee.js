Ext.define('Personify.view.phone.attendee.Attendee', {
    extend: 'Ext.Panel',
    xtype: 'attendeesphone',
    controller: 'Personify.controller.phone.attendee.Attendee',

    requires: [
        'Personify.controller.phone.attendee.Attendee',
        'Personify.view.phone.attendee.AttendeesListPanel',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.directory.ContactInfoManagement'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: false,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarAttendeesPhone',
                title: 'Attendees'
            },
            {
                layout: 'card',
                flex: 1,
                itemId: 'attendeeContent',
                cls: 'exhibitorScreenPhone',
                items: [
                    {
                        flex: 1,
                        xtype: 'attendeeslistpanelphone',
                        itemId: 'attendeeslistpanelphone'
                    },
                    {
                        flex: 1,
                        xtype: 'pcontactinfomanagement',
                        itemId: 'attendeeInfo'
                    }
                ]
            }
        ]
    }
});
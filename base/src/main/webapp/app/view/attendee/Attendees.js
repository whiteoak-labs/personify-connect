Ext.define('Personify.view.attendee.Attendees', {
    extend: 'Ext.Panel',
    xtype: 'attendees',
    controller: 'Personify.controller.attendees.Attendees',

    requires: [
        'Personify.controller.attendees.Attendees',
        'Personify.view.profile.ContactInfoManagement',
        'Personify.view.attendee.AttendeesListPanel'
    ],

    config: {
        layout: 'card',
        flex: 1,
        items: [
            {
                flex: 1,
                xtype:'attendeeslistpanel',
                itemId: 'attendeeslistpanel'
            },
            {
                flex: 1,
                xtype:'contactinfomanagement',
                itemId: 'attendeeInfo'
            }
        ]
    }
});
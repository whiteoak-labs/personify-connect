Ext.define('Personify.view.event.complexevent.sessions.myschedule.FilterSession', {
    extend: 'Ext.Container',
    xtype: 'filtersession',
    controller: 'Personify.controller.event.complexevent.sessions.myschedule.FilterSession',

    requires: [
        'Personify.controller.event.complexevent.sessions.myschedule.FilterSession',
        'Personify.view.event.search.SearchPanel'
    ],

    config: {
        layout: 'hbox',
        scrollable: null,
        items: [
            {
                width: '55%',
                itemId: 'searchSession',
                xtype: 'searchEventPanel'
            },
            {
                itemId: 'filterByTrackButton',
                xtype: 'button',
                cls: 'filterEventButton',
                text: 'Filter by Track',
                style: 'width: 37.5%; height: 35px; margin: 10px 0px 10px 15px;',
                zIndex: 0
            },
            {
                docked: 'right',
                itemId:'addPersonalAppointmentButton',
                xtype: 'button',
                cls: 'p-button-addAppointment'
            }
          ]
    }
});
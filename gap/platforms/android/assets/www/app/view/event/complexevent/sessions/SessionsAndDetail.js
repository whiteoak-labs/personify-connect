Ext.define('Personify.view.event.complexevent.sessions.SessionsAndDetail', {
    extend: 'Ext.Container',
    xtype: 'sessionsAndDetail',
    controller: 'Personify.controller.event.complexevent.sessions.SessionsAndDetail',

    requires: [
        'Personify.controller.event.complexevent.sessions.SessionsAndDetail',
        'Personify.view.event.map.Map',
        'Personify.view.event.complexevent.sessions.Sessions',
        'Personify.view.event.complexevent.detailsession.SessionDetail'
    ],

    config: {
        layout: 'card',
        itemId: 'sessionsAndDetail',
        record: null,
        meetingRecord: null,
        items:[
            {
                xtype: 'sessionsComplexEvent',
                itemId: 'sessionPage'
            },
            {
                xtype: 'sessiondetail',
                itemId: 'sessionDetail'
            },
            {
                xtype: 'mapevent',
                itemId: 'mapSessionPanel'
            }
        ]
    }
});
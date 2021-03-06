Ext.define('Personify.view.event.complexevent.detailsession.SessionDescription', {
    extend:'Ext.Container',
    xtype: 'sessionDetailDescription',
    controller:'Personify.controller.event.complexevent.detailsession.SessionDescription',
    requires:'Personify.controller.event.complexevent.detailsession.SessionDescription',
    config: {
        layout: 'fit',
        scrollable: null,
        items: [
            {
                cls: 'description-session-container',
                itemId: 'descriptionSession',
                scrollable: true
            }
        ]
    }
});
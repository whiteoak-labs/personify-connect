Ext.define('Personify.view.event.simpleEvent.SimpleEventContent', {
    extend: 'Ext.Container',
    xtype: 'simpleeventcontent',
    controller: 'Personify.controller.event.simpleEvent.SimpleEventContent',
    requires: [
        'Personify.controller.event.simpleEvent.SimpleEventContent',
        'Personify.view.event.simpleEvent.SimpleEventHeader',
        'Personify.view.event.advertising.SponsorPanel',
        'Personify.view.eventdescription.DescriptionContent',
        'Personify.view.event.complexevent.detailsession.Rate'
    ],
    config:{
        layout: 'vbox',
        hidden: true,
        style: 'background-color: transparent',
        items: [
            {
                xtype: 'simpleEventHeader',
                itemId: 'simpleEventHeader'
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'card',
                itemId: 'cardMainDetailContainer',
                style: 'background: white'
            },
            {
                xtype: 'sponsorPanel',
                itemId: 'sponsorPanel',
                hidden: true
            }
        ]
    }
});
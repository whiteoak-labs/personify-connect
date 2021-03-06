Ext.define('Personify.view.event.advertising.SponsorPanel', {
    extend : 'Ext.Container',
    xtype : 'sponsorPanel',
    controller : 'Personify.controller.event.advertising.SponsorPanel',
    requires : [
        'Personify.controller.event.advertising.SponsorPanel',
        'Personify.view.event.advertising.AdvertisingPanel'
    ],

    config : {
        xtype : 'container',
        items : [{
            html : 'Platinum Sponsors',
            cls : 'p-label-title'
        }, {
            xtype : 'carousel',
            indicator: false,
            style : 'background-color: transparent; height: 120px; padding: 0',
            itemId : 'advertisingCarousel'
        }]
    }

});

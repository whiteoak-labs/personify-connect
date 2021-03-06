Ext.define('Personify.view.home.BigEvent',{
    extend: 'Ext.Container',
    xtype: 'bigevent',
    controller: 'Personify.controller.home.BigEvent',
    requires: [
        'Personify.controller.home.BigEvent',
        'Ext.carousel.Carousel'
    ],

    config: {
        layout: 'vbox',
        items:[
            {
                cls: 'p-label-title p-label-righthometitle',
                html: 'Featured Events'
            },
            {
                flex: 7,
                xtype:'carousel',
                indicator: false,
                itemId: 'carouselImg',
                cls: 'p-home-bigeventpanel'
            }
        ]
    }
});
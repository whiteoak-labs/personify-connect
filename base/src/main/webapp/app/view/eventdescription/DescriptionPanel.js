Ext.define('Personify.view.eventdescription.DescriptionPanel', {
    extend: 'Ext.Container',
    xtype: 'descriptioneventpanel',
    controller: 'Personify.controller.eventdescription.DescriptionPanel',
    requires: [
        'Personify.controller.eventdescription.DescriptionPanel',
        'Personify.view.eventdescription.DescriptionHeader',
        'Personify.view.eventdescription.DescriptionLinks',
        'Personify.view.event.advertising.SponsorPanel',
        'Personify.view.eventdescription.DescriptionContent'
    ],
    config:{
        style: 'background: transparent;',
        layout: 'vbox',
        hidden: true,
        items: [
            {
                xtype: 'descriptionheadercontent',
                itemId: 'descriptionEventHeader'
            },
            {
                flex: 3,
                itemId: 'descriptionContent',
                xtype: 'descriptioncontent',
                scrollable: true,
                layout: 'card'
            },
            {
                xtype: 'container',
                itemId: 'quickLinkPanel',
                items: [
                    {
                        html: 'Quick links',
                        cls: 'p-label-title'
                    },
                    {
                        xtype: 'descriptionlinks',
                        itemId: 'descriptionLinks'
                    }
                ]
            },
            {
                xtype: 'sponsorPanel',
                itemId: 'sponsorPanel',
                hidden: true
            }
        ]
    }
});
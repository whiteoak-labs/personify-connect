Ext.define('Personify.view.phone.twitter.Twitter', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.twitter.Twitter',
    requires: [
        'Personify.view.event.complexevent.TwitterPanel',
        'Personify.controller.phone.twitter.Twitter',
        'Personify.view.phone.twitter.TwitterManagement'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                itemId: 'twitterNavigationView',
                xtype: 'navigationview',
                navigationBar: false,
                flex: 1,
                items: [
                    {
                        itemId: 'twitterMainPanel',
                        xtype: 'twittermanagement'
                    }
                ]
            }
        ]
    }
});

Ext.define('Personify.view.phone.news.News', {
    extend: 'Ext.Container',
    requires: [
        'Personify.controller.phone.news.News',
        'Personify.view.phone.news.SelectNewsFeed',
        'Personify.view.phone.common.Toolbar'
    ],
    controller: 'Personify.controller.phone.news.News',
    
    config: {
        layout: 'vbox',
        items: [
            {
                itemId: 'newsNavigationView',
                xtype: 'navigationview',
                navigationBar: false,
                flex: 1,
                items: [
                    {
                        itemId: 'newsMainPanel',
                        xtype: 'newsmanagement'
                    }
                ]
            }
        ]
    }
});

Ext.define('Personify.view.phone.news.NewsManagement', {
    extend: 'Ext.Container',
    xtype: 'newsmanagement',
    requires: [
        'Personify.controller.phone.news.NewsManagement',
        'Personify.view.phone.news.SelectNewsFeed',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.news.NewsList',
        'Personify.view.event.search.SearchPanel'
    ],
    controller: 'Personify.controller.phone.news.NewsManagement',

    config: {
        layout: 'vbox',
        itemId: 'newsManagementPanel',
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'newsToolbar',
                title: 'News'
            },
            {
                xtype: 'container',
                itemId: 'newsView',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'searchEventPanel',
                        width: '100%',
                        itemId: 'searchNewsPhone'
                    },
                    {
                        xtype: 'newslistphone',
                        itemId: 'newsList',
                        cls: 'p-news-list-phone',
                        scrollable: true,
                        flex: 1
                    }
                ]
            }
        ]
    }
});

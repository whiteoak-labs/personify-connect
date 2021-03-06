Ext.define('Personify.view.news.SelectNewsFeedPanel', {
    extend: 'Ext.Panel',
    xtype: 'selectnewsfeedpanel',
    controller: 'Personify.controller.news.NewsFeedUrl',
    requires: [
        'Personify.controller.news.NewsFeedUrl',
        'Personify.view.news.SelectNewsFeed',
        'Personify.view.news.NewsFeedItem',
        'Personify.view.event.search.SearchPanel',
        'Personify.view.news.NewsList'
    ],
    
    config: {
        layout: 'vbox',
        cls: 'selectnewsfeedpanel',
        fullscreen: true,
        items: [
            {
                xtype: 'searchEventPanel',
                width: '100%',
                itemId: 'searchfieldNews'
            },
            {
                xtype: 'label',
                html: 'Select News Feed',
                cls: 'p-label-title'
            },
            {
                xtype: 'newslist',
                itemId: 'newsList',
                scrollable: true,
                flex: 1
            },
            {
                itemId: 'newsFeedItems',
                xtype: 'newsfeeditem',
                style: 'float: left;width: 100%;',
                scrollable: true
            }
        ]
    }
});

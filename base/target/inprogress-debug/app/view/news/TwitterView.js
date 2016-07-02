Ext.define('Personify.view.news.TwitterView', {
    extend: 'Ext.Container',
    xtype: 'twitterviewnews',
    controller: 'Personify.controller.news.TwitterView',
    
    requires: [
        'Personify.controller.news.TwitterView',
        'Personify.view.news.TwitterNewsPanel',
        'Personify.view.profile.twitterview.ConnectTwitter'
    ],
    
    config: {
        itemId:'twitterViewNews',
        cls:'twitter-view-news',
        layout: 'card'
    },//end config
    
    initialize: function() {
        var me =this,
            subView;

        me.callParent(arguments);
        if(TMA.Twitter.isAuthorized())
            subView = {xtype: 'twitternewspanel'};
        else
            subView = {xtype: 'connecttwitter'};
        
       me.add(subView);
    }
});

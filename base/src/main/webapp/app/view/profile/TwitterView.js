Ext.define('Personify.view.profile.TwitterView', {
    extend: 'Ext.Container',
    xtype: 'twitterview',
    controller: 'Personify.controller.profile.TwitterView',
    
    requires: [
        'Personify.controller.profile.TwitterView',
        'Personify.view.profile.twitterview.ConnectedTwitter',
        'Personify.view.profile.twitterview.ConnectTwitter'
    ],
    
    config: {
        itemId:'twitterView',
        layout: 'card',
        cls:'twitter-view-container'
        
    },//end config
    
    initialize: function(){
        var me =this,
            subView;
        
        me.callParent(arguments);
        if(TMA.Twitter.isAuthorized())
            subView = {xtype: 'connectedtwitter'};
        else
            subView = {xtype: 'connecttwitter'};
        
       me.add(subView);
    }
});
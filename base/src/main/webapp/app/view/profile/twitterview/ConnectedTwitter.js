Ext.define('Personify.view.profile.twitterview.ConnectedTwitter', {
    extend: 'Ext.Container',
    xtype: 'connectedtwitter',
    controller: 'Personify.controller.profile.twitterview.ConnectedTwitter',
    requires: 'Personify.controller.profile.twitterview.ConnectedTwitter',

    config: {
        itemId:'connectedTwitter',
        cls:'connected-twitter-container',
        layout:'vbox',
        items:[
        ]
    },//end config
    
    initialize: function(){
        var me= this,
            twitterUserData = TMA.Twitter.getUser();
        me.callParent(arguments);
        var headItem = {
                xtype:'container',
                cls:'container-connectTwitter',
                html:'<div id="image-container-connectTwitter"></div><div id="text-container-connectTwitter">Twitter</div>'
            },
            contentItem = {
                xtype:'container',
                cls:'title-container',
                html:'<div id="text-title-twitter-authorize">APA Mobile is being authorized by <div id="name-account-twitter">'+ twitterUserData.get('name') +'</div></div>'
            },
            unAuthorizeButton = {
               itemId:'unAuthorizeButton',
               xtype:'button',
               cls:'unauthorize-button',
               width:'20%',
               text:'Unauthorize app'
            },
            notMeButton = {
               itemId:'notMeButton',
               xtype:'button',
               cls:'not-me-button',
               width:'20%',
               text:'Not me?'
            },
            buttonContainer = {
                xtype:'container',
                cls:'button-container',
                layout:'hbox',
                items: [unAuthorizeButton,notMeButton]
            };
            
        me.add([headItem,contentItem,buttonContainer]);
    }
});
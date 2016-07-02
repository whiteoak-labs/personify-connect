Ext.define('Personify.view.profile.ConnectedTwitter', {
    extend: 'Ext.Container',
    xtype: 'connectedtwitter',
    controller: 'Personify.controller.profile.ConnectedTwitter',
    requires: 'Personify.controller.profile.ConnectedTwitter',

    config: {
        itemId:'connectTwitter',
        cls:'connect-twitter-container',
        items:[
            {
                xtype:'container',
                cls:'container-connectTwitter',
                html:'<div id="image-container-connectTwitter"></div><div id="text-container-connectTwitter">Twitter</div>'
           },
           {
                layout: 'hbox',
                items: [
                    {
                        xtype:'container',
                        html:'<div id="text-title-twitter-authorize">APA Mobile was Authorized with name: </div>'
                    },
                    {
                        itemId: 'nameTwitter',
                        html: 'Name',
                        cls: 'name-account-twitter'
                    }
                ]
           },
           {
               itemId:'unAuthorizeButton',
               xtype:'button',
               cls:'unauthorize-button',
               width:'20%',
               text:'unAuthorize app'
           }
        ]
    },//end config
    
    initialize: function(){
        this.callParent(arguments);
        
    }
});
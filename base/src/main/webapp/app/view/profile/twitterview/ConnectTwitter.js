Ext.define('Personify.view.profile.twitterview.ConnectTwitter', {
    extend: 'Ext.Container',
    xtype: 'connecttwitter',
    controller: 'Personify.controller.profile.twitterview.ConnectTwitter',
    requires: [
        'Personify.controller.profile.twitterview.ConnectTwitter'
    ],
    config: {
        itemId:'connectTwitter',
        cls:'connect-twitter-container',
        width: '100%',
        layout:'vbox',
        items:[
            {
                xtype:'label',
                cls:'container-connectTwitter',
                html:'<div id="image-container-connectTwitter"></div><div id="text-container-connectTwitter">Twitter</div>'
           },
            {
                xtype:'label',
                cls:'info-container',
                html:'<div id="text-title-twitter-login">Authorize APA Mobile to use your account?</div>' +
                    '<div><div id="question-twitter-login">This application </div><div id="post-question-twitter-login">will be able to:</div></div>' +
                    '<div id="content-twitter-login">' +
                    '- Read Tweets from your timeline. <br>' +
                    '- See who you follow, and follow new people. <br>' +
                    '- Update your profile. <br>' +
                    '- Post Tweets on your behalf. <br></div>'
           },
           {
                itemId:'userNameLabel',
                cls:'user-name-label',
                xtype:'label',
                html:'Username or Email'
           },
           {
           	    itemId:'usernameTextfield',
           	    cls:'username-textfield',
                xtype:'textfield',
                autoCapitalize: false
           },
           {
                itemId:'passwordlabel',
                xtype:'label',
                cls:'password-label',
                html:'Password'
           },
           {
           	    itemId:'passwordTextfield',
           	    cls:'password-field',
                xtype:'passwordfield',
                autoCapitalize: false
           },
           {
           	    xtype:'container',
           	    layout:'hbox',
           	    cls:'login-twitter-container',
           	    items:[
               	    {               	    	
               	    	itemId:'authorizeButton',
                        xtype:'button',
                        cls:'authorize-button',
                        text:'Authorize app'
                   },
                   {                   		
                   	    itemId:'noButton',
                        xtype:'button',
                        cls:'no-button',
                        text:'No, thanks'                        
                   }
           	    ]
           }
        ]
    },//end config
    
    initialize: function(){
        this.callParent(arguments);
        
    }
});
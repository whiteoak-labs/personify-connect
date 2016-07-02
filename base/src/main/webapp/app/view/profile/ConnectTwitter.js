Ext.define('Personify.view.profile.ConnectTwitter', {
    extend: 'Ext.Container',
    xtype: 'connecttwitter',
    controller: 'Personify.controller.profile.ConnectTwitter',
    requires: [
        'Personify.controller.profile.ConnectTwitter'
    ],
    config: {
        itemId:'connectTwitter',
        cls:'connect-twitter-container',
        items:[
            {
                xtype:'label',
                cls:'container-connectTwitter',
                html:'<div id="image-container-connectTwitter"></div><div id="text-container-connectTwitter">Twitter</div>'
            },
            {
                xtype:'container',
                cls:'info-twitter-container',
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
                xtype:'textfield'
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
                xtype:'passwordfield'
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
                        width:'20%',
                        text:'Authorize app'
                   },
                   {
                   	    itemId:'noButton',
                        xtype:'button',
                        cls:'no-button',
                        width:'20%',
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
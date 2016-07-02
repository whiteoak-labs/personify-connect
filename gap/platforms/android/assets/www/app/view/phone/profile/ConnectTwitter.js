Ext.define('Personify.view.phone.profile.ConnectTwitter', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.profile.ConnectTwitter',
    requires: [
        'Personify.controller.phone.profile.ConnectTwitter'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'connectTwitterToolbar',
                docked: 'top',
                title: 'Connect Twitter'
            },
            {
                layout: 'vbox',
                flex: 1,
                scrollable: true,
                style: 'margin-bottom: 40px;',
                items: [
                    {
                        xtype: 'label',
                        cls: 'container-connectTwitter',
                        html: '<div id="image-container-connectTwitter"></div><div id="text-container-connectTwitter">Twitter</div>'
                    },
                    {
                        xtype: 'container',
                        cls: 'info-twitter-container-phone',
                        html: '<div id="text-title-twitter-login">Authorize APA Mobile to use your account?</div>' +
                             '<div><div id="question-twitter-login">This application </div><div id="post-question-twitter-login">will be able to:</div></div>' +
                             '<div id="content-twitter-login">' +
                             '- Read Tweets from your timeline. <br>' +
                             '- See who you follow, and follow new people. <br>' +
                             '- Update your profile. <br>' +
                             '- Post Tweets on your behalf. <br></div>'
                    },
                    {
                        xtype: 'label',
                        itemId: 'userNameLabel',
                        cls: 'user-name-label-phone',
                        html: 'Username or Email'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'usernameTextfield',
                        cls: 'username-textfield-phone'
                    },
                    {
                        xtype: 'label',
                        itemId: 'passwordlabel',
                        cls: 'password-label-phone',
                        html: 'Password'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordTextfield',
                        cls: 'password-field-phone'
                    },
                    {
                        itemId: 'authorizeButton',
                        xtype: 'button',
                        cls: 'authorize-button-phone',
                        text: 'Authorize app'
                    }
                ]
            }
        ]
    }
});

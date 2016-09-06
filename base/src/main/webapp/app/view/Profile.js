Ext.define('Personify.view.Profile', {
    extend: 'Ext.Container',
    controller:'Personify.controller.Profile',
    
    requires: [
        'Personify.controller.Profile',
        'Personify.view.profile.DisplayOption',
        'Personify.view.profile.DisplayOptionItem',
        'Personify.view.profile.TwitterView',
        'Personify.view.profile.ContactInfoManagement',
        'Personify.view.profile.ConnectFacebook',
        'Personify.view.profile.ChangePassword',
        'Personify.view.profile.twitterview.ConnectedTwitter',
        'Personify.view.profile.twitterview.ConnectTwitter'
    ],
    
    config: {
        itemId: 'profilePanel',
        layout: 'hbox',
        store: null,
        items: [
            {
                itemId: 'displayOptionPanel',
                xtype: 'displayoption',
                width: 340
            },
            {
                itemId: 'contactInfoPanel',
                xtype: 'panel',
                layout: 'fit',
                flex: 2,
                cls: 'profile-panel-right',
                scrollable: null,
                items: [
                    {
                        itemId:'contactInfoManagement',
                        xtype:'contactinfomanagement'
                    }
                ]
            }
        ]
    }
});
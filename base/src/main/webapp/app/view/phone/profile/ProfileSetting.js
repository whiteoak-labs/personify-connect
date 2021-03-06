Ext.define('Personify.view.phone.profile.ProfileSetting', {
    extend: 'Ext.Panel',
    xtype: 'profilesettingphone',
    
    controller: 'Personify.controller.phone.profile.ProfileSetting',
    
    requires: [
        'Personify.controller.phone.profile.ProfileSetting',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.profile.ToggleOption'
    ],
    
    config: {
        layout: 'vbox',
        flex:1,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Additional Info',
                itemId: 'profileSettingToolbar'
            },
            {
                xtype: 'container',
                cls: 'p-phone-container-profilesetting',
                scrollable: true,
                flex: 1,
                items:[
                    {
                        padding: 10,
                        items:[
                            {
                                html: 'My Information:',
                                cls: 'p-phone-membersettingtitle'
                            },
                            {
                                xtype: 'button',
                                text: 'View My Online Profile',
                                itemId: 'goOnlineProfile',
                                cls: 'p-phone-button-viewmyonlineprofile',
                                pressedCls: 'p-phone-button-red-pressing'
                            },
                            {
                                html: 'My Activity:',
                                cls: 'p-phone-membersettingtitle'
                            },
                            {
                                xtype: 'button',
                                text: 'View My Purchase History',
                                itemId: 'viewMyPurchaseHistoryButton',
                                cls: 'p-phone-button-viewmypurchasehistory',
                                pressedCls: 'p-phone-button-blue-pressing'
                            },
                            {
                                xtype: 'button',
                                text: 'View My Participation History',
                                itemId: 'viewMyParticipationHistoryButton',
                                cls: 'p-phone-button-viewmyparticipationhistory',
                                pressedCls: 'p-phone-button-blue-pressing'
                            },
                            {
                                html: 'Social:',
                                cls: 'p-phone-membersettingtitle'
                            },
                            {
                                xtype: 'button',
                                itemId: 'connectTwitterButton',
                                text: 'Connect Twitter',
                                cls: 'p-phone-button-viewmypurchasehistory',
                                pressedCls: 'p-phone-button-blue-pressing'
                            },
                            {
                                xtype: 'button',
                                itemId: 'disconnectTwitterButton',
                                text: 'Disconnect Twitter',
                                cls: 'p-phone-button-viewmypurchasehistory',
                                pressedCls: 'p-phone-button-blue-pressing',
                                hidden: true
                            },
                            {
                                xtype: 'toggleoptionphone',
                                itemId: 'toggleOption'
                            }
                        ]
                    }

                ]
            }
        ]
    }
});
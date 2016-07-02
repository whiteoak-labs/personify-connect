Ext.define('Personify.view.phone.profile.ProfileManagement', {
    extend: 'Ext.Panel',
    xtype: 'profilemanagement',
    controller: 'Personify.controller.phone.profile.ProfileManagement',

    requires: [
        'Personify.controller.phone.profile.ProfileManagement',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.directory.contactinfo.ContactInfo'
    ],

    config: {
        store: null,
        layout: 'vbox',
        flex: 1,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Profile',
                itemId: 'profileToolbar'
            },
            {
                xtype: 'panel',
                cls: 'p-phone-panel-contactInfoManagememt',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        flex: 1,
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        items: [
                            {
                                xtype: 'contactinfophone',
                                itemId: 'contactinfo',
                                margin: '5 10 0 10'
                            }
                        ]
                    },
                    {
                        layout: 'vbox',
                        itemId: 'staffButtonsPanel',
                        margin: '0 10 50 10',
                        items: [
                            {
                                xtype: 'button',
                                text: 'View Additional Information',
                                itemId: 'viewMySettingButton',
                                cls:'p-phone-button-viewmysetting',
                                pressedCls: 'p-phone-button-red-pressing'
                            },
                            {
                                xtype: 'button',
                                text: 'Logout',
                                itemId: 'logOutButton',
                                cls:'p-phone-button-logout',
                                pressedCls: 'p-phone-button-gray-pressing'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

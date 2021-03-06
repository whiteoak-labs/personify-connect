Ext.define('Personify.view.phone.aboutAPA.Settings', {
    extend: 'Ext.Container',
    requires: [
        'Personify.controller.phone.aboutAPA.Settings',
        'Personify.view.phone.common.Toolbar'
    ],
    controller: 'Personify.controller.phone.aboutAPA.Settings',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarSettings',
                title: 'Settings'
            },
            {
                xtype: 'container',
                cls: 'p-phone-container-profilesetting',
                scrollable: true,
                flex: 1,
                items: [
                    {
                        padding: 10,
                        items: [
                            {
                                layout: 'hbox',
                                items:[
                                    {
                                        html: 'Config ID: ',
                                        cls: 'p-phone-label-app47idsetting'
                                    },
                                    {
                                        xtype: 'fieldset',
                                        cls: 'p-fieldset-settingsapp47id',
                                        flex:1,
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                cls: 'p-phone-field-directory-editform',
                                                itemId: 'settingOption'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        width: '50%',
                                        cls: 'p-phone-button-applysettings',
                                        pressedCls:'p-phone-button-red-pressing',
                                        text: 'Apply',
                                        itemId: 'applySetting'
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }
        ]
    }
});

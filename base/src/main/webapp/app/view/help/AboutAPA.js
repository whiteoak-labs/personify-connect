Ext.define('Personify.view.help.AboutAPA', {
    extend: 'Ext.Panel',
    xtype: 'aboutAPApanel',
    controller: 'Personify.controller.help.AboutAPA',

    requires: [
        'Personify.controller.help.AboutAPA',
        'Personify.view.profile.contactinfo.Photo',
        'Personify.view.help.ImportantContacts',
        'Personify.view.help.Description',
        'Personify.view.help.ImportantNumbers',
        'Personify.view.help.Address',
        'Personify.view.help.Website',
        'Personify.view.help.Email',
        'Personify.view.help.Settings'
    ],

    config: {
        layout: 'vbox',
        style: 'margin: 10px;',
        scrollable: null,
        items: [
            {
                itemId: 'photoAndTitlePanel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'vbox',
                        width: 135,
                        items: [
                             {
                                 xtype: 'photo',
                                 style: 'margin-right: 10px; min-height: 130px; min-width: 130px'
                             },
                             {
                                 xtype: 'label',
                                 itemId: 'version',
                                 style: 'word-wrap: break-word'
                             }
                        ]
                    },
                    {
                        flex: 1,
                        layout: 'vbox',
                        items:[
                            {
                                itemId: 'titlePanel',
                                style: 'font-size: 15pt; margin: 0px 0px 5px;'
                            },
                            {
                                itemId: 'addToMyAddressBookButton',
                                xtype: 'button',
                                text: 'Add to My Address Book',
                                cls: 'p-button-past-event',
                                style: 'margin: 0px 0px 10px;'
                            },
                            {
                                itemId: 'tellAFriend',
                                xtype: 'button',
                                text: 'Tell a Friend',
                                cls: 'p-button-past-event',
                                style: 'margin: 0px 0px 10px;'
                            }
                        ]
                    }
                ]
            },
            {
                flex: 1,
                layout: 'vbox',
                style: 'margin-top: 10px;',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        marign: '10 0 0 0',
                        items: [
                            {
                                itemId: 'descriptionPanel',
                                xtype: 'descriptionpanel'
                            },
                            {
                                itemId: 'importantNumbersPanel',
                                xtype: 'importantnumberspanel'
                            },
                            {
                                itemId: 'addressPanel',
                                xtype: 'addressPanel'
                            },
                            {
                                itemId: 'emailPanel',
                                xtype: 'emailPanel'
                            },
                            {
                                itemId: 'websitePanel',
                                xtype: 'websitePanel'
                            },
                            {
                                xtyle: 'container',
                                itemId: 'configContainer',
                                hidden: true,
                                items: [
                                    {
                                        html: 'Settings: <hr class="helpHR"/>',
                                        cls: 'aboutAPAHeaders'
                                    },
                                    {
                                        layout: {
                                            type: 'hbox',
                                            pack: 'center'
                                        },
                                        items: [
                                            {
                                                itemId: 'bntApp47IdSettings',
                                                xtype: 'button',
                                                text: 'Go To Settings Page',
                                                cls: 'p-button-configsettings',
                                                pressedCls: 'blue-button-pressing-background'
                                            }
                                        ]
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

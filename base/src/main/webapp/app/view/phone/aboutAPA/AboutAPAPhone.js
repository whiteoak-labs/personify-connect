Ext.define('Personify.view.phone.aboutAPA.AboutAPAPhone', {
    extend: 'Ext.Panel',
    xtype: 'aboutAPAPhone',
    controller: 'Personify.controller.phone.aboutAPA.AboutAPAPhone',

    requires: [
        'Personify.controller.phone.aboutAPA.AboutAPAPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.help.Description',
        'Personify.view.help.ImportantNumbers',
        'Personify.view.help.Address',
        'Personify.view.help.Website',
        'Personify.view.help.Email',
        'Personify.view.phone.aboutAPA.Settings'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarAboutAPA',
                title: 'About'
            },
            {
                layout: 'vbox',
                flex: 1,
                style: 'padding: 10px;',
                cls: 'p-phone-information',
                items: [
                    {
                        layout: 'hbox',
                        items: [
                            {
                                layout: 'vbox',
                                width: 110,
                                items: [
                                     {
                                        xtype: 'image',
                                        itemId:'imageFrame',
                                        cls: 'imageFrame-AboutAPAPhone'
                                     },
                                     {
                                         itemId: 'versionAPAPhone',
                                         style: 'padding: 0 10px 0 2px; word-wrap: break-word'
                                     }
                                ]
                            },
                            {
                                flex: 1,
                                layout: 'vbox',
                                items:[
                                    {
                                        itemId: 'titlePanel',
                                        style: 'font-size: 12pt; margin: 0px 0px 5px;'
                                    },
                                    {
                                        itemId: 'addToMyAddressBookButton',
                                        xtype: 'button',
                                        text: 'Add to My Address Book',
                                        cls: 'p-button-aboutAPA'
                                    },
                                    {
                                        itemId: 'tellAFriendButton',
                                        xtype: 'button',
                                        text: 'Tell a Friend',
                                        cls: 'p-button-aboutAPA'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        flex: 1,
                        layout: 'vbox',
                        style: 'margin-top: 10px;',
                        cls: 'p-phone-aboutpagedescription',
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        items: [
                            {
                                marigin: '10 0 0 0',
                                items: [
                                    {
                                        itemId: 'descriptionPanel',
                                        xtype: 'descriptionpanel',
                                        cls: 'p-descriptionpanel-aboutpageitem'
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
                                        xtype: 'container',
                                        itemId: 'configContainer',
                                        hidden: true,
                                        items: [
                                            {
                                                html: 'Settings: <hr class="helpHR"/>',
                                                cls: 'aboutAPAHeaders'
                                            },
                                            {
                                                layout: 'vbox',
                                                items: [
                                                    {
                                                        itemId: 'bntApp47IdSettings',
                                                        xtype: 'button',
                                                        text: 'Go To Settings Page',
                                                        cls: 'p-phone-button-configsettings',
                                                        pressedCls: 'blue-button-pressing-background'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]// scrollable container
                    }
                ]//info main page
            }
        ]// include tool bar
    }
});

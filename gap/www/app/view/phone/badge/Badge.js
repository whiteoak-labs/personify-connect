Ext.define('Personify.view.phone.badge.Badge', {
    extend: 'Ext.Panel',
    xtype: 'badgepanel',
    controller: 'Personify.controller.phone.badge.Badge',
    requires: [
        'Personify.controller.phone.badge.Badge',
        'Personify.view.phone.common.Toolbar'
    ],
    config: {
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        cls: 'p-phone-panel-badge',
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarBadgePanelPhone',
                title: 'Badge'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'badgeTitleBar'
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                xtype: 'panel',
                flex: 1,
                layout: 'vbox',
                cls: 'p-phone-panelscrollable-badge',
                items:[
                    {
                        layout: 'hbox',
                        xtype: 'panel',
                        cls: 'p-phone-panel-badgeinfo',
                        items:[
                            {
                                cls: 'p-phone-panle-leftbadgeinfo'
                            },
                            {
                                flex: 1,
                                items:[
                                    {
                                        cls: 'p-phone-panel-badgeinfoname',
                                        itemId: 'badgeName',
                                        html: ''
                                    },
                                    {
                                        layout: 'vbox',
                                        cls: 'p-phone-panel-badgeinfodetails',
                                        items:[
                                            {
                                                cls: 'p-phone-panel-badgeinfojobtitle',
                                                html: '',
                                                itemId: 'badgeJobTitle'
                                            },
                                            {
                                                cls: 'p-phone-panel-badgeinfoassociation',
                                                html: 'association',
                                                itemId: 'badgeAssociation',
                                                hidden: true
                                            }
                                        ]
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
                        items:[
                            {
                                cls: 'p-phone-badge-barcode',
                                itemId: 'badgeCode'
                            }
                        ]
                    }
                ]
            }

        ]
    }//end config
})
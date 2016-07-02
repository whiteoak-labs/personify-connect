Ext.define('Personify.view.event.complexevent.badge.Badge', {
    extend: 'Ext.Panel',
    xtype: 'badgepanel',
    controller: 'Personify.controller.event.complexevent.badge.Badge',
    requires: 'Personify.controller.event.complexevent.badge.Badge',

    config: {
        layout: 'vbox',
        cls: 'p-panel-badge',
        items: [
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                xtype: 'panel',
                flex: 1,
                layout: 'vbox',
                cls: 'p-panelscrollable-badge',
                items:[
                    {
                        layout: 'hbox',
                        xtype: 'panel',
                        cls: 'p-panel-badgeinfo',
                        items:[
                            {
                                cls: 'p-panle-leftbadgeinfo'
                            },
                            {
                                flex: 1,
                                items:[
                                    {
                                        cls: 'p-panel-badgeinfoname',
                                        itemId: 'badgeName',
                                        html: ''
                                    },
                                    {
                                        layout: 'vbox',
                                        cls: 'p-panel-badgeinfodetails',
                                        items:[
                                            {
                                                cls: 'p-panel-badgeinfojobtitle',
                                                html: '',
                                                itemId: 'badgeJobTitle'
                                            },
                                            {
                                                cls: 'p-panel-badgeinfoassociation',
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
                                cls: 'p-badge-barcode',
                                itemId: 'badgeCode'
                            }
                        ]
                    }
                ]
            }
        ]
    }//end config
})
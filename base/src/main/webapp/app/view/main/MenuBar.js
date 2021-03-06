Ext.define('Personify.view.main.MenuBar',{
    extend: 'Ext.Container',
    xtype: 'menubar',
    controller: 'Personify.controller.main.MenuBar',
    requires: [
        'Personify.controller.main.MenuBar',
        'Personify.view.main.MenuList',
        'Personify.view.main.TopMenu'
    ],
    config: {
        width: '100%',
        cls: 'clsover',
        layout: 'card',
        height: 51,
        items: [
            {
                showAnimation: {
                    type:'slideIn', direction: 'down', duration: 100
                },
                xtype: 'topmenubar',
                itemId: 'topMenubarButton'
            },
            {
                itemId: 'expandedMenu',
                showAnimation: {
                    type:'slideIn', direction: 'up', duration: 250
                },
                hideAnimation: {
                    type:'slideIn', direction: 'down', duration: 100
                },
                layout: 'vbox',
                items: [
                    {
                        xtype: 'topmenubar',
                        itemId: 'bottomMenuButton',
                        height: 55
                    },
                    {
                        xtype: 'menubarlist',
                        itemId: 'menubarListItems',
                        flex: 1
                    }
                ]
            }
        ]
    }
});

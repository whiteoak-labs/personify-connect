Ext.define('Personify.view.phone.menubar.MenuBar',{
    extend: 'Ext.Container',
    xtype: 'menubarphone',
    controller: 'Personify.controller.phone.menubar.MenuBar',
    requires: [
        'Personify.controller.phone.menubar.MenuBar',
        'Personify.view.phone.menubar.MenuList',
        'Personify.view.phone.menubar.TopMenu'
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
                xtype: 'topmenubarphone',
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
                items: [
                    {
                        xtype: 'topmenubarphone',
                        itemId: 'bottomMenuButton'
                    },
                    {
                        xtype: 'menubarlistphone',
                        itemId: 'menubarListItems'
                    }
                ]
            }
        ]
    }
});

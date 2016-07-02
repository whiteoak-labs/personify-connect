Ext.define('Personify.view.phone.menubar.MenuList',{
    extend: 'Ext.Container',
    xtype: 'menubarlistphone',
    controller: 'Personify.controller.phone.menubar.MenuList',
    requires: 'Personify.controller.phone.menubar.MenuList',
    config: {
        layout: 'hbox',
        type: 'panel',
        cls: 'menubarPanel',
        items: [
            {
                layout: 'hbox',
                docked:'left',
                flex: 4,
                items: [
                    {
                        xtype: 'button',
                        text: 'Main',
                        itemId: 'headerMainBtn',
                        cls: 'headerMainBtn'
                    }
                ]
            },
            {
            	xtype: 'button',
                itemId: 'previousMenuItems',
                cls: 'navigationMenuBarPrevious',
                hidden:true
            },
            {
                flex: 8,
                itemId: 'menuItemList',
                xtype: 'dataview',
                inline: { wrap: false },
                scrollable: {
                    direction: 'horizontal',
                    directionLock: true
                },
                itemTpl: '<div class="menuItem {css}">{name}</div>'
            },
            {
            	xtype: 'button',
                itemId: 'nextMenuItems',
                cls: 'navigationMenuBarNext',
                hidden:true
            },
            {

                layout: 'hbox',
                docked: 'right',
                flex: 4,
                items: [
                    {
                        xtype: 'button',
                        text: 'Info',
                        cls: 'headerInfoBtn',
                        itemId: 'headerInfoBtn'
                    }
                ]
            }
        ]
    }
});

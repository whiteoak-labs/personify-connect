Ext.define('Personify.view.main.MenuList',{
    extend: 'Ext.Container',
    xtype: 'menubarlist',
    controller: 'Personify.controller.main.MenuList',
    requires: 'Personify.controller.main.MenuList',
    config: {
        layout: 'hbox',
        type: 'container',
        cls: 'menubarPanel',
        items: [
            {
                layout: 'hbox',
                docked:'left',
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
            	flex: 1,
                itemId: 'menuItemList',
                xtype: 'dataview',
                centered:true,
                inline: { wrap: false },
                scrollable: {direction: 'horizontal', directionLock: true},
                height: window.innerHeight/10,
                width: window.innerWidth/3 * 2.3,
                itemTpl: '<div class="menuItem {css}">{name}</div>'
            },
            {
            	xtype: 'button',
                itemId: 'nextMenuItems',
                cls: 'navigationMenuBarNext',
                hidden: true
            },
            {
                
                layout: 'hbox',
                docked: 'right', 
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

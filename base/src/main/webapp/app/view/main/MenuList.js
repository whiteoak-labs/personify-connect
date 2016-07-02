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
            	xtype: 'panel',
            	layout: 'fit',
            	centered: true,
            	baseCls: 'p-baseclass-clearstyle',
            	items:[
            	    {
            	    	flex: 1,
            	    	itemId: 'menuItemList',
                        xtype: 'dataview',
                        inline: { wrap: false },
                        scrollable: null,
                        itemTpl: '<div class="menuItem {css}">{name}</div>'
            		}
            	]
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

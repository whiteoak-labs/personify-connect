Ext.define('Personify.view.event.eventmenu.EventMenuList', {
    extend: 'Ext.Panel',
    xtype: 'eventmenulist',
    controller: 'Personify.controller.event.EventMenuList',
    requires: 'Personify.controller.event.EventMenuList',

    config: {
        cls: 'evenMenuListContainer',
        layout: 'vbox',
        items: [
            {
                html: 'Event Menu',
                itemId: 'titleLabel',
                cls: 'p-label-title p-label-righthometitle',
                hidden: true
            },
            {
                xtype:'dataview',
                itemId: 'eventMenuList',
                selectedCls: 'x-menu-selected',
                scrollable: null,
                itemTpl: '<div class="menu-item {css}">{title}</div>',
                baseCls: 'p-list-menu-item',
                store: null
            }
        ]
    }//end config
});

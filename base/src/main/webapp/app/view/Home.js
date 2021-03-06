Ext.define('Personify.view.Home', {
    extend: 'Ext.Container',
    xtype: 'homeview',
    controller: 'Personify.controller.home.Home',
    requires: [
        'Personify.controller.home.Home',
        'Personify.view.event.eventmenu.EventMenuList',
        'Personify.view.home.LastNew',
        'Personify.view.home.BigEvent',
        'Personify.view.home.NextEvent'
    ],
    config: {
        layout: 'vbox',
        itemId: 'homeView',
        items: [
            {
                layout: 'hbox',
                flex: 1,
                items: [
                    {
                        flex: 1.3,
                        xtype:'lastnew',
                        itemId: 'lastNewsPanel',
                        cls: 'p-panel-component-left panel-left'
                    },
                    {
                        flex: 1,
                        xtype: 'eventmenulist',
                        itemId: 'menuHome',
                        cls: 'panel-right'
                    }
                ]
            },
            {
                flex: 1.2,
                layout: 'hbox',
                items: [
                    {
                        flex: 1.3,
                        xtype: 'nextevent',
                        itemId: 'nextThreeEventList',
                        cls: 'p-panel-component-left panel-left'
                    },
                    {
                        flex: 1,
                        xtype: 'bigevent',
                        itemId: 'bigEventPanel',
                        cls: 'panel-right'
                    }
                ]
            }
        ]
    }
});
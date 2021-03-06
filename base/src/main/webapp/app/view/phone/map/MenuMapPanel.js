Ext.define('Personify.view.phone.map.MenuMapPanel', {
    extend: 'Ext.Container',
    xtype: 'menumappanel',
    controller: 'Personify.controller.phone.map.MenuMapPanel',
    requires: [
        'Personify.controller.phone.map.MenuMapPanel',
        'Personify.view.phone.map.MenuMapList'
    ],
    config: {
        fullscreen: true,
        locationData: null,
        layout: {
            type: 'vbox'
        },
        items: [
            {
                    xtype: 'ptoolbar',
                    title: 'Map Menu',
                    itemId: 'eventToolbar'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'mapTitleBar'
            },
            {
                flex: 1,
                xtype: 'menumaplist',
                itemId: 'menuMapList'
            }
        ]
    }
});

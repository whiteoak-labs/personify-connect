Ext.define('Personify.view.phone.map.MapNavigation', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.map.MapNavigation',
    requires: [
        'Personify.controller.phone.map.MapNavigation',
        'Personify.view.phone.map.MenuMapPanel'
    ],
    xtype: 'mapNavigation',
    config: {
        fullscreen: true,
        locationData: null,
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left'
            }
        },
        items: [
            {
                flex: 1,
                xtype: 'menumappanel',
                itemId:'menumappanel',
                locationData: this.locationData
            }, {
                flex: 1,
                xtype: 'mapdetail',
                itemId: 'mapdetail',
                locationData: this.locationData
            }

        ]
    }
});

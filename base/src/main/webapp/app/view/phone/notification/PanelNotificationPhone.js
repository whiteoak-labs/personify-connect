Ext.define('Personify.view.phone.notification.PanelNotificationPhone', {
    extend: 'Ext.Container',
    xtype: 'panelNotificationPhone',
    controller: 'Personify.controller.phone.notification.PanelNotificationPhone',
    requires: [
        'Personify.controller.phone.notification.PanelNotificationPhone',
        'Personify.view.phone.notification.NotificationsPhone'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
           {
               itemId: 'navigationNotificationPhone',
               xtype: 'navigationview',
               navigationBar: false,
               flex:1,
               items: [
                    {
                        itemId:'notificationsPhone',
                        xtype:'notificationsPhone'
                    }
               ]
           }
        ]
    }
});
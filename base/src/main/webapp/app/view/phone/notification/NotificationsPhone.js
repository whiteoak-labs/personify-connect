Ext.define('Personify.view.phone.notification.NotificationsPhone', {
    extend: 'Ext.Panel',
    xtype: 'notificationsPhone',
    controller: 'Personify.controller.phone.notification.NotificationsPhone',

    requires: [
        'Personify.controller.phone.notification.NotificationsPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.notification.ListNotificationPhone',
        'Personify.view.phone.notification.ItemListNotificationPhone'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: false,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarNotificationsPhone',
                title: 'Notifications'
            },
            {
                layout: 'vbox',
                flex: 1,
                cls: 'exhibitorScreenPhone',
                items: [
                    {
                        xtype: 'listNotificationPhone',
                        itemId: 'listNotificationPhone',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
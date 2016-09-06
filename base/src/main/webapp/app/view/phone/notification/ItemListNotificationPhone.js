Ext.define('Personify.view.phone.notification.ItemListNotificationPhone', {
    extend: 'Ext.Container',
    xtype: 'itemListNotificationPhone',
    controller: 'Personify.controller.phone.notification.ItemListNotificationPhone',

    requires: [
        'Personify.controller.phone.notification.ItemListNotificationPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.notification.TemplateItemNotificationPhone'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: false,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarItemListNotificationPhone',
                title: 'Notification Detail'
            },
            {
                flex: 1,
                cls: 'exhibitorScreenPhone',
                xtype: 'templateItemNotificationPhone',
                itemId: 'templateItemNotificationPhone'
            }
        ]
    }
});
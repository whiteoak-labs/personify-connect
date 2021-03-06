Ext.define('Personify.view.main.NotificationItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'vbox',
        items: [
            {
                cls: 'p-panel-notification-title {[Personify.utils.ItemUtil.getClsNotification(values.isRead)]}',
                html: '{description}'
            },
            {
                cls: 'p-panel-notification-item',
                html: '{[Personify.utils.ItemUtil.timeAgoInWords(values.startDate)]}'
            },
            {
                xtype: 'button',
                cls: 'p-button-trash',
                hidden: true
            }
        ]
    }
});
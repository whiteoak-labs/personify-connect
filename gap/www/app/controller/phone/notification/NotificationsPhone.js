Ext.define('Personify.controller.phone.notification.NotificationsPhone', {
    extend: 'Personify.base.Controller',
    inject: ['notificationStore'],

    config: {
        notificationStore: null
    },

    control: {
        ptoolbarNotificationsPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        listNotificationPhone: {
            itemtap: 'onTapListNotificationPhone'
        }
    },

    init: function() {
        var me = this,
            notificationStore = me.getNotificationStore();
        me.getPtoolbarNotificationsPhone().getController().setHiddenActionButton(true);
        me.getListNotificationPhone().setStore(notificationStore);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('backToMain', this);
    },

    onTapListNotificationPhone: function(me, index, target, record, e, eOpts) {
        this.getView().fireEvent('requestOpenDetail', 'Personify.view.phone.notification.ItemListNotificationPhone', {record:record});
        this.getView().fireEvent('markReadNotificationPhone', record);
    }
})
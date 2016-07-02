Ext.define('Personify.controller.phone.notification.PanelNotificationPhone', {
    extend: 'Personify.base.Controller',

    control: {
        navigationNotificationPhone: true,
        notificationsPhone: {
            live:true,
            listeners: {
                requestOpenDetail: 'openDetailItemView',
                backToMain: 'onBackToMain',
                backToNavigationView: 'onBackToNavigationView',
                markReadNotificationPhone: 'markReadNotificationPhone',
                deleteItemNotificationPhone: 'deleteItemNotificationPhone'
            }
        }
    },

    openDetailItemView: function(view, config) {
        if(typeof view == 'string') {
            view = Ext.create(view, config);
        }

        view.addListener('backToMain', this.onBackToMain, this);
        view.addListener('backToNavigationView', this.onBackToNavigationView, this);
        view.addListener('requestOpenDetail', this.openDetailItemView, this);
        view.addListener('markReadNotificationPhone', this.markReadNotificationPhone, this);
        view.addListener('deleteItemNotificationPhone', this.deleteItemNotificationPhone, this);

        if(config) {
            var listeners = config.record.get('listeners');

            if(listeners) {
                for(var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var navigationNotificationPhone = this.getNavigationNotificationPhone();
        navigationNotificationPhone.push(view);
    },

    onBackToMain: function() {
        this.getView().fireEvent('back', this);
        this.getView().fireEvent('enableBtnOpenNotificationPhone');
    },

    onBackToNavigationView: function() {
        var me = this,
            navigationNotificationPhone = me.getNavigationNotificationPhone();
        navigationNotificationPhone.pop();
    },

    markReadNotificationPhone: function(record) {
        var countReadNotificationPhone = 0,
            storeNotiPhone = this.getNotificationsPhone().getController().getListNotificationPhone().getStore();

        storeNotiPhone.each(function(item) {
            if(item.get('isRead') == true) {
                countReadNotificationPhone++;
            } else {
                if(item.get('messageId') == record.get('messageId')) {
                    item.set('isRead', true);
                    countReadNotificationPhone++;
                }
            }
        });
        this.getView().fireEvent('setTextNotiBtnPhone', countReadNotificationPhone);
        this.getNotificationsPhone().getController().getListNotificationPhone().refresh();

        Personify.utils.Sqlite.insertTableNotification(record.get('messageId'), 0, function(success){});
    },

    deleteItemNotificationPhone: function(record) {
        var me = this,
            storeNotiPhone = this.getNotificationsPhone().getController().getListNotificationPhone().getStore(),
            messageId = record.get('messageId');

        storeNotiPhone.each(function(item) {
            if(item.get('messageId') == messageId) {
                storeNotiPhone.remove(record);
            }
        });

        Personify.utils.Sqlite.insertTableNotification(messageId, 1, function(success) {
            if(success) {
                me.onBackToNavigationView();
                me.getNotificationsPhone().getController().getListNotificationPhone().refresh();
            } else {
                Ext.Msg.alert('Delete Notification', 'Delete failed.', Ext.emptyFn);
            }
        });
    }
});

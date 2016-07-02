Ext.define('Personify.controller.main.Notifications', {
    extend: 'Personify.base.Controller',
    requires: [
        'Personify.view.main.NotificationDetails'
    ],
    
    control: {
        lblNumberNoti: true,
        notification: {
            itemtap: 'onNotificationItemTap'
        },
        view: {
            closenotification: 'onCloseNotification'
        }
    }, // end control

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Notifications');
        }
    },
    onCloseNotification: function(){
        this.disableNotificationButton(false);
    },
    
    setNotificationLabel: function(unread, allCount) {
        this.getLblNumberNoti().setHtml(unread + ' unread of ' + allCount);
        this.getView().fireEvent('changenotificationlabel', unread);
    },
    
    disableNotificationButton: function(value) {
        this.getView().fireEvent('disablenotificationbutton', value);
    },
    
    onNotificationItemTap: function(bookmarkView, index, item, record, event) {
        var me = this;
        var messageId = record.get('messageId');
        if (event.target.className.indexOf('x-button') >= 0) { // click remove button
            Ext.Msg.confirm("", "Are you sure you want to delete?", processResult);
            
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes') {
                    me.deleteNotification(record);
                }
            };
        } else { // click item
            var panel = Ext.Viewport.add({xtype: 'notificationdetails', record: record, viewParent: me.getView()});
            panel.setRecord(record);
            panel.show();
            me.markReadNotification(record);
            
            Personify.utils.Sqlite.insertTableNotification(messageId, 0, function(success) {
                if (success) { // show pop up notification details
                }
            });
        }
    },
    
    deleteNotification: function(record) {
        var me = this;
        var store = me.getNotification().getStore();
        var messageId = record.get('messageId');
        var countRead = 0;
        Personify.utils.Sqlite.insertTableNotification(messageId, 1, function(success) {
            if (success) { // remove this notification from the list
                store.remove(record);
                store.each(function(item) {
                    if (item.get('isRead') == true) {
                        countRead++;
                    }
                });
                var allCount = store.getCount();
                me.setNotificationLabel(allCount - countRead, allCount);
                me.getNotification().refresh();
            } else {
                Ext.Msg.alert('Delete Notification', 'Delete failed.', Ext.emptyFn);
            }
        });
    },
    
    markReadNotification: function(record) {
        var countRead = 0;
        var store = this.getNotification().getStore();
        var allCount = store.getCount();
        store.each(function(item) {
            if (item.get('isRead') == true) {
                countRead++;
            } else {
                if (item.get('messageId') == record.get('messageId')) {
                    item.set('isRead', true);
                    countRead++;
                }
            }
        });
        this.setNotificationLabel(allCount - countRead, allCount);
        this.getNotification().refresh();
    }
});

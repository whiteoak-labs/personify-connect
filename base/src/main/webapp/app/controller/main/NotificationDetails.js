Ext.define('Personify.controller.main.NotificationDetails', {
    extend: 'Personify.base.Controller',
    
    control: {
        btnCancel: {
            tap: 'onCloseForm'
        },
        
        notificationDetailsTemplate: {
            onOpenHyberLink: 'onOpenHyberLink'
        },
        
        closeLogoutForm: {
            tap: 'onCloseForm'
        },
        
        btnDelete: {
            tap: 'onDeleteNotification'
        }
    },
    
    init: function() {
        var store = Ext.create('Ext.data.Store', {
            model: 'Personify.model.jsonp.Notification'
        });
        store.setData([this.getView().getRecord()]);
        this.getNotificationDetailsTemplate().setStore(store);
    },
    
    onCloseForm: function() {
        this.getView().destroy();
    },
    
    onOpenHyberLink: function(record) {
           var ref =null;
        if (Ext.os.is.Android) {
            ref = window.open(record.get('hyperLink'), '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            ref = window.open(record.get('hyperLink'), '_blank', 'location=yes,enableViewportScale=yes');
        }
           Personify.utils.BackHandler.pushActionAndTarget('close', ref);
           ref.addEventListener('exit', function() {
            Personify.utils.BackHandler.popActionAndTarget('close', ref);
            });
    },
    
    onDeleteNotification: function() {
        var me = this;
        Ext.Msg.confirm("", "Are you sure you want to delete?", processResult);
        function processResult(clickedButton) {
            Ext.Msg.hide();
            if(clickedButton == 'yes') {
                var record = me.getView().getRecord();
                me.getView().getViewParent().getController().deleteNotification(record);
                me.onCloseForm();
            }
        };
    }
});

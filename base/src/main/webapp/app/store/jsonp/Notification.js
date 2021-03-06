Ext.define('Personify.store.jsonp.Notification', {
    extend: 'Personify.store.base.Notification',
    requires: 'Personify.model.jsonp.Notification',
    
    config: {
        model: 'Personify.model.jsonp.Notification',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('userNotifications'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'NotificationList'
            }
        };

        this.setProxy(proxy);
    }
});
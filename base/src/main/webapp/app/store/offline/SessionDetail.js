Ext.define('Personify.store.offline.SessionDetail', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.proxy.OfflineProxy',
        'Personify.model.jsonp.Session'
    ],

    config: {
        model: 'Personify.model.jsonp.Session',
        haveData: false,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventSessionDetails'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'SessionDetail'
            }
        };

        this.setProxy(proxy);
    }
});
Ext.define('Personify.store.jsonp.SessionDetail', {
    extend: 'Personify.store.base.Session',
    requires: [
        'Personify.proxy.RestService',
        'Personify.model.jsonp.Session'
    ],
    
    config: {
        model: 'Personify.model.jsonp.Session',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'restservice',
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
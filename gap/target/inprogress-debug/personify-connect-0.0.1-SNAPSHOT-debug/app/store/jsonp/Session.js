Ext.define('Personify.store.jsonp.Session', {
    extend: 'Personify.store.base.Session',
    requires: [
        'Personify.model.jsonp.Session',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.Session',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
        
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventSessions'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'SessionList'
            }
        };

        this.setProxy(proxy);
    }
});
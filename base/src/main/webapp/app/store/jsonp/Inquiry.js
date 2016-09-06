Ext.define('Personify.store.jsonp.Inquiry', {
    extend: 'Personify.store.base.Inquiry',
    requires: [
        'Personify.model.jsonp.Inquiry',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Inquiry',
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('inquiry'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

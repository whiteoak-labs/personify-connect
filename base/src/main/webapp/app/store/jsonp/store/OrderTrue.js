Ext.define('Personify.store.jsonp.store.OrderTrue', {
    extend: 'Personify.store.base.store.OrderTrue',
    requires: 'Personify.model.jsonp.store.OrderTrue',
    
    config: {
        model: 'Personify.model.jsonp.store.OrderTrue',
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('storeOrder'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

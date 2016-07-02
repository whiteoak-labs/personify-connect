Ext.define('Personify.store.jsonp.store.OrderFalse', {
    extend: 'Personify.store.base.store.OrderFalse',
    requires: 'Personify.model.jsonp.store.OrderFalse',
    
    config: {
        model: 'Personify.model.jsonp.store.OrderFalse',
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

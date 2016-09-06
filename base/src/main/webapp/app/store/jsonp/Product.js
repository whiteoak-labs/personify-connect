Ext.define('Personify.store.jsonp.Product', {
    extend: 'Personify.store.base.product.Product',
    requires: [
        'Personify.model.jsonp.product.Product',
        'Personify.proxy.RestService'
    ],
    
    config: {
    storeId: 'Product',
    model: 'Personify.model.jsonp.product.Product',
    haveData: false,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            dataRequests: data,
            url: Personify.utils.ServiceManager.getUrlWS('storeProductDetails'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
Ext.define('Personify.store.jsonp.store.AddToShoppingCart', {
    extend: 'Personify.store.base.store.AddToShoppingCart',
    requires: 'Personify.model.jsonp.store.AddToShoppingCart',
    
    config: {
        model: 'Personify.model.jsonp.store.AddToShoppingCart',
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
            url: Personify.utils.ServiceManager.getUrlWS('storeShoppingCartAdd'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

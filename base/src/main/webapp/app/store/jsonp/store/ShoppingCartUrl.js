Ext.define('Personify.store.jsonp.store.ShoppingCartUrl', {
    extend: 'Personify.store.base.store.ShoppingCartUrl',
    requires: 'Personify.model.jsonp.store.ShoppingCartUrl',
    
    config: {
        model: 'Personify.model.jsonp.store.ShoppingCartUrl',
        listeners:{
            beforeload: 'onBeforeLoad'
        },
        autoLoad: true,
        implicitIncludes: true
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();

        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('storeShoppingCartUrl'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                implicitIncludes: true,
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

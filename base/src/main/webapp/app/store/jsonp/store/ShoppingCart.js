Ext.define('Personify.store.jsonp.store.ShoppingCart', {
    extend: 'Personify.store.base.store.ShoppingCart',
    requires: 'Personify.model.jsonp.store.ShoppingCart',
    
    config: {
        storeId: 'shoppingCartJSON',
        model: 'Personify.model.jsonp.store.ShoppingCart',
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
            url: Personify.utils.ServiceManager.getUrlWS('storeShoppingCart'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'ShoppingCartItems'
            }
        };

        this.setProxy(proxy);
    }
});

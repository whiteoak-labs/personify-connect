Ext.define('Personify.store.jsonp.ProductList', {
    extend: 'Personify.store.base.product.ProductList',
    requires: [
        'Personify.model.jsonp.product.ProductList',
        'Personify.proxy.RestService'
    ],
    
    config: {
        storeId: 'ProductList',
        model: 'Personify.model.jsonp.product.ProductList',
        implicitIncludes: true,
        productItemStore: null,
        listeners: {
            beforeload: 'onBeforeLoad',
            load: 'loadData'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            dataRequests: data,
            url: Personify.utils.ServiceManager.getUrlWS('storeProducts'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    },
    
    loadData: function(store, data) {
        if (data.length > 0) {
            if (store.getDataRequest().ItemsPerPage < data[0].getData().totalResults) {
                store.getDataRequest().ItemsPerPage = data[0].getData().totalResults;
            } else {
                store.setProductItemStore(
                    Ext.create('Personify.store.jsonp.Product')
                );
                //set data PurchaseListStore
                if (store.getData().items[0] != null) {
                    store.getProductItemStore().add(store.getData().items[0].ProductItem.getData().items);
                }
            }
       }
    }
});

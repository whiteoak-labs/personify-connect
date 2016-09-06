Ext.define('Personify.store.jsonp.PurchaseHistory', {
    extend: 'Personify.store.base.PurchaseHistory',

    requires: [ 
        'Personify.model.jsonp.PurchaseHistory',
        'Personify.store.jsonp.PurchaseList',
        'Personify.store.jsonp.SubSystemList',
        'Personify.proxy.RestService'
    ],

    config: {
        storeId: 'PurchaseHistory',
        model: 'Personify.model.jsonp.PurchaseHistory',
        haveData: false,
        purchaseListStore: null,
        subSystemListStore: null,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad',
            load: 'loadData'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profilePurchases'),
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
            store.setPurchaseListStore(
                Ext.create('Personify.store.jsonp.PurchaseList')
            );
            //set data PurchaseListStore
            if (store.getAt(0) != null) {
                store.getPurchaseListStore().add(store.getAt(0).PurchaseHistory.getData().items);
            }
            store.setSubSystemListStore(
                Ext.create('Personify.store.jsonp.SubSystemList')
            );
            //set dataSubSystemListStore
            if (store.getAt(0) != null) {
                store.getSubSystemListStore().add(store.getAt(0).SubSystemHistory.getData().items);
            }
            store.setHaveData(true);
       }
    }
});

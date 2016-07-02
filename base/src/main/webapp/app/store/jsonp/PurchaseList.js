Ext.define('Personify.store.jsonp.PurchaseList', {
    extend: 'Personify.base.Store',
    requires: [ 'Personify.model.jsonp.purchaseHistory.Purchase' ],
    config: {
        model: 'Personify.model.jsonp.purchaseHistory.Purchase',
        autoLoad: true
    }
});
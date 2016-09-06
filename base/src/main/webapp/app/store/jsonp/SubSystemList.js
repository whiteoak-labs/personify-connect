Ext.define('Personify.store.jsonp.SubSystemList', {
    extend: 'Personify.base.Store',
    requires: ['Personify.model.jsonp.purchaseHistory.SubSystem'],
    
    config: {
        model: 'Personify.model.jsonp.purchaseHistory.SubSystem',
        autoLoad: true
    }
});

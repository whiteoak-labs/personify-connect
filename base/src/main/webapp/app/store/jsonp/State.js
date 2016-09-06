Ext.define('Personify.store.jsonp.State', {
    extend: 'Personify.store.base.State',
    requires: 'Personify.model.jsonp.State',
    
    config: {
        storeId: 'stateStore',
        model: 'Personify.model.jsonp.State',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        sorters: 'stateDescription'
    }
});
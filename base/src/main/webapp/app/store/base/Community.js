Ext.define('Personify.store.base.Community', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.Community'
    ],
    
    config: {
        model: 'Personify.model.base.Community',
        autoLoad: true,
        storeId: 'noteStore',
        proxy: {
            type: 'ajax',
            url : 'data/Community.json',
            reader: {
                type: 'json',
                rootProperty: 'community'
            }
        }
    }
});
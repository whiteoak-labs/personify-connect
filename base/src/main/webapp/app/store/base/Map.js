Ext.define('Personify.store.base.Map', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.Map'
    ],
    
    config: {
        model: 'Personify.model.base.Map',
        autoLoad: false,
        storeId: 'mapStore',
        proxy: {
            type: 'ajax',
            url : 'data/events_maps.json',
            reader: {
                type: 'json',
                rootProperty: 'maps'
            }
        }
    }
});

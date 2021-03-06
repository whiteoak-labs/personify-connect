Ext.define('Personify.store.base.FilterTopic', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.FilterTopic'
    ],
    
    config: {
        model: 'Personify.model.base.FilterTopic',
        storeId: 'FilterTopicStore',
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                rootProperty: 'topic'
            }
        }
    }
});

Ext.define('Personify.store.base.FilterProductStore', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.FilterTopic'
    ],
    
    config: {
        model: 'Personify.model.base.FilterTopic',
        grouper: {
            groupFn: function(record) {
                return record.get('description')[0];
            }
        },
        storeId: 'FilterTopicStore',
        proxy: {
            type: 'ajax',
            url : 'data/Personify.json',
            reader: {
                type: 'json',
                rootProperty: 'store.filterProductStore'
            }
        }
    }
});

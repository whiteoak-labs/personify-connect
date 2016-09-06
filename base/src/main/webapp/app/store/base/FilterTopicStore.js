Ext.define('Personify.store.base.FilterTopicStore', {
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
            reader: {
                type: 'json',
                rootProperty: 'topic'
            }
        }
    }
});

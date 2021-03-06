Ext.define('Personify.model.base.purchaseHistory.SubSystem', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'subSystem', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'subSystemListReference', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
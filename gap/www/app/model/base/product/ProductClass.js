Ext.define('Personify.model.base.product.ProductClass', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'productClassList', type: 'string'},
            {name: 'prdClassListReference', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
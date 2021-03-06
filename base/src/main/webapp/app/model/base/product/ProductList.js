Ext.define('Personify.model.base.product.ProductList', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'pageSize', type: 'int'},
            {name: 'startIndex', type: 'int'},
            {name: 'totalResults', type: 'int'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});

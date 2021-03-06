Ext.define('Personify.model.base.store.AddToShoppingCart', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'cartItemId', type: 'int'},
            {name: 'cartMessage', type: 'string'}
        ]
    }
});

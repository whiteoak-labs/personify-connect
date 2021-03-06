Ext.define('Personify.model.base.store.ShoppingCartUrl', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'shoppingCartUrl', type: 'string'}
        ]
    }
});

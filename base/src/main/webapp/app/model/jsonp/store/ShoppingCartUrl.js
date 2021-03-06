Ext.define('Personify.model.jsonp.store.ShoppingCartUrl', {
    extend: 'Personify.model.base.store.ShoppingCartUrl',
    
    config: {
        fields: [
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'shoppingCartUrl', type: 'string', mapping: 'ShoppingCartURL'}
        ]
    }
});

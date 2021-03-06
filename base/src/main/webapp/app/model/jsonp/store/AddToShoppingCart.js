Ext.define('Personify.model.jsonp.store.AddToShoppingCart', {
    extend: 'Personify.model.base.store.AddToShoppingCart',
    
    config: {
        fields: [
            {name: 'recordId',type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', mapping: 'InternalKey'},
            {name: 'navigationKey', mapping: 'NavigationKey'},
            {name: 'cartItemId', type: 'int', mapping: 'CartItemId', allowNull: false},
            {name: 'cartMessage', type: 'string', mapping: 'CartMessage', allowNull: false}
        ]
    }
});

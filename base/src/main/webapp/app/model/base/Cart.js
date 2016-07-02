Ext.define('Personify.model.base.Cart', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'totalItems', type: 'int'},
            {name: 'totalAmount', type: 'string'}
        ]
    }
});
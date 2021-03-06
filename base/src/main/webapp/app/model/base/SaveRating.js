Ext.define('Personify.model.base.SaveRating', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
            {name: 'internalKey', type: 'string', defaultValue: null},
            {name: 'navigationKey', type: 'string', defaultValue: null},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string', defaultValue: null},
            {name: 'starRating', type: 'int'},
            {name: 'comments', type: 'string'},
            {name: 'productId', type: 'string'}
        ]
    }
});


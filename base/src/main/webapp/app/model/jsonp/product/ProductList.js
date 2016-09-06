Ext.define('Personify.model.jsonp.product.ProductList', {
    extend: 'Personify.model.base.product.ProductList',

    requires: [
        'Personify.model.jsonp.product.Product',
        'Personify.model.jsonp.product.ProductClass'
    ],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'pageSize', type: 'int', mapping: 'PageSize', allowNull: false},
            {name: 'startIndex', type: 'int', mapping: 'StartIndex', allowNull: false},
            {name: 'totalResults', type: 'int', mapping: 'TotalResults', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        associations: [
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.product.Product' ,
                associationKey: 'ProductList',
                name: 'ProductList',
                storeName: 'ProductItem',
                reader: {
                    type:'json',
                    rootProperty: 'ProductList'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.product.ProductClass' ,
                associationKey: 'PrdClassList',
                name: 'PrdClassList',
                storeName: 'ProductClassItem',
                reader: {
                    type:'json',
                    rootProperty: 'PrdClassList'
                }
            }
        ]
    }
});

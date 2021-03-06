Ext.define('Personify.model.jsonp.PurchaseHistory', {
    extend: 'Personify.model.base.PurchaseHistory',
    requires: [
        'Personify.model.jsonp.purchaseHistory.Purchase',
        'Personify.model.jsonp.purchaseHistory.SubSystem'
    ],
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'startIndex', type: 'int', mapping: 'StartIndex', allowNull: false},
            {name: 'pageSize', type: 'int', mapping: 'PageSize', allowNull: false},
            {name: 'totalResults', type: 'int', mapping: 'TotalResults', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        associations: [
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.purchaseHistory.Purchase' ,
                associationKey: 'PurchaseList',
                name: 'PurchaseList',
                storeName: 'PurchaseHistory',
                reader: {
                    type:'json',
                    rootProperty: 'PurchaseList'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.purchaseHistory.SubSystem',
                associationKey: 'SubSystemList',
                name: 'SubSystemList',
                storeName: 'SubSystemHistory',
                reader: {
                    type:'json',
                    rootProperty: 'SubSystemList'
                }
            }
        ]
    }
});

Ext.define('Personify.model.base.PurchaseHistory', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'startIndex', type: 'int'},
            {name: 'pageSize', type: 'int'},
            {name: 'totalResults', type: 'int'}
        ]/*,
        associations: [
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.purchaseHistory.Purchase' ,
                autoLoad: true,
                associationKey: 'purchaseList',
                name: 'purchaseList'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.purchaseHistory.SubSystem' ,
                autoLoad: true,
                associationKey: 'subSystemList',
                name: 'subSystemList'
            }
        ]*/
    }
});

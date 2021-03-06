Ext.define('Personify.model.base.purchaseHistory.Purchase', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'orderNo', type: 'string'},
            {name: 'orderLineNo', type: 'int'},
            {name: 'orderDate', type: 'string'},
            {name: 'invoiceNo', type: 'string'},
            {name: 'shortName', type: 'string'},
            {name: 'totalAmount', type: 'string'},
            {name: 'openBalance', type: 'string'},
            {name: 'subSystem', type: 'string'},
            {name: 'purchaseListReference', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});

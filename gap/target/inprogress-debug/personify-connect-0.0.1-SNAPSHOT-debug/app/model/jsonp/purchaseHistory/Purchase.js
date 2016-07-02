Ext.define('Personify.model.jsonp.purchaseHistory.Purchase', {
    extend: 'Personify.model.base.purchaseHistory.Purchase',
    
    config: {
        belongsTo: 'Personify.model.jsonp.PurchaseHistory',
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'orderNo', type: 'string', mapping: 'OrderNo', allowNull: false},
            {name: 'orderLineNo', type: 'int', mapping: 'OrderLineNo', allowNull: false},
            {name: 'orderDate', type: 'datetime', mapping: 'OrderDate', allowNull: false, convert: function(value) {
                var bits = value.split(/[-T:]/g);
                var d = new Date(bits[0], bits[1]-1, bits[2]);
                d.setHours(bits[3], bits[4], bits[5]);
                return d;
            }},
            {name: 'invoiceNo', type: 'string', mapping: 'InvoiceNo', allowNull: false},
            {name: 'shortName', type: 'string', mapping: 'ShortName', allowNull: false},
            {name: 'totalAmount', type: 'string', mapping: 'TotalAmount', allowNull: false},
            {name: 'openBalance', type: 'string', mapping: 'OpenBalance', allowNull: false},
            {name: 'subSystem', type: 'string', mapping: 'SubSystem', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        associations: [
            {
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'PurchaseList',
                name: 'PurchaseList'
            }
        ]
    }
});

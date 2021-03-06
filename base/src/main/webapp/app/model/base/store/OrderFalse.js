Ext.define('Personify.model.base.store.OrderFalse', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'baseAmount', type: 'float'},
            {name: 'cCard', type: 'string'},
            {name: 'currencyCode', type: 'string'},
            {name: 'curSymbol', type: 'string'},
            {name: 'orderNumber', type: 'string'},
            {name: 'currencySymbol', type: 'string'},
            {name: 'orderMessage', type: 'string'},
            {name: 'productName', type: 'string'},
            {name: 'productType', type: 'string'},
            {name: 'shipAddress', type: 'string'},
            {name: 'shipAddressID', type: 'float'},
            {name: 'totalAmount', type: 'float'},
            {name: 'totalDiscounts', type: 'float'},
            {name: 'totalShipping', type: 'float'},
            {name: 'address', type: 'string'},
            {name: 'totalTax', type: 'float'}
        ]
    }
});

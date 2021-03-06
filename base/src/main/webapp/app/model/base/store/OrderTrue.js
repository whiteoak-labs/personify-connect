Ext.define('Personify.model.base.store.OrderTrue', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'baseAmount', type: 'float'},
            {name: 'cCard', type: 'string'},
            {name: 'currencyCode', type: 'string'},
            {name: 'invBackOrdered', type: 'string'},
            {name: 'mtgWaitListed', type: 'string'},
            {name: 'orderNumber', type: 'string'},
            {name: 'currencySymbol', type: 'string'},
            {name: 'productName', type: 'string'},
            {name: 'productType', type: 'string'},
            {name: 'shipAddress', type: 'string'},
            {name: 'shipAddressID', type: 'float'},
            {name: 'totalAmount', type: 'float'},
            {name: 'totalDiscounts', type: 'float'},
            {name: 'totalShipping', type: 'float'}
        ]
    }
});

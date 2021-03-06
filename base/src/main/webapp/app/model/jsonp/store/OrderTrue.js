Ext.define('Personify.model.jsonp.store.OrderTrue', {
    extend: 'Personify.model.base.store.OrderTrue',
    
    config: {
        fields: [
            {name: 'baseAmount', type: 'float', mapping: 'BaseAmount'},
            {name: 'cCard', type: 'string', mapping: 'CCard'},
            {name: 'currencyCode', type: 'string', mapping: 'CurrencyCode'},
            {name: 'invBackOrdered', type: 'string', mapping: 'InvBackOrdered'},
            {name: 'mtgWaitListed', type: 'string', mapping: 'MtgWaitListed'},
            {name: 'orderNumber', type: 'string', mapping: 'OrderNumber'},
            {name: 'currencySymbol', type: 'string', mapping: 'CurrencySymbol'},
            {name: 'productName', type: 'string', mapping: 'ProductName'},
            {name: 'productType', type: 'string', mapping: 'ProductType'},
            {name: 'shipAddress', type: 'string', mapping: 'shipAddress'},
            {name: 'shipAddressID', type: 'float', mapping: 'ShipAddressID'},
            {name: 'totalAmount', type: 'float', mapping: 'TotalAmount'},
            {name: 'totalDiscounts', type: 'float', mapping: 'TotalDiscounts'},
            {name: 'totalShipping', type: 'float', mapping: 'TotalShipping'}
        ]
    }
});

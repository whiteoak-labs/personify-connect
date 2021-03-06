Ext.define('Personify.model.jsonp.store.OrderFalse', {
    extend: 'Personify.model.base.store.OrderFalse',
    
    config: {
        fields: [
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'baseAmount', type: 'float', mapping: 'BaseAmount'},
            {name: 'cCard', type: 'string', mapping: 'CCard'},
            {name: 'currencyCode', type: 'string', mapping: 'CurrencyCode'},
            {name: 'curSymbol', type: 'string', mapping: 'CurSymbol'},
            {name: 'orderNumber', type: 'string', mapping: 'OrderNumber'},
            {name: 'currencySymbol', type: 'string', mapping: 'CurrencySymbol'},
            {name: 'orderMessage', type: 'string', mapping: 'OrderMessage'},
            {name: 'productName', type: 'string', mapping: 'ProductName'},
            {name: 'productType', type: 'string', mapping: 'ProductType'},
            {name: 'shipAddress', type: 'string', mapping: 'shipAddress'},
            {name: 'shipAddressID', type: 'float', mapping: 'ShipAddressID'},
            {name: 'totalAmount', type: 'float', mapping: 'TotalAmount'},
            {name: 'totalDiscounts', type: 'float', mapping: 'TotalDiscounts'},
            {name: 'totalShipping', type: 'float', mapping: 'TotalShipping'},
            {name: 'address', type: 'string', mapping: 'Address'},
            {name: 'totalTax', type: 'float', mapping: 'TotalTax'}
        ]
    }
});

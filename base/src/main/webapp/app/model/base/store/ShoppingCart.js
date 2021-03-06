Ext.define('Personify.model.base.store.ShoppingCart', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'cartItemId', type: 'int'},
            {name: 'relatedCartItemId', type: 'int'},
            
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'productId', type: 'string'},
            {name: 'subProductId', type: 'string'},
            {name: 'productType', type: 'string'},
            
            {name: 'subsystem', type: 'string'},
            {name: 'shortName', type: 'string'},
            {name: 'longName', type: 'string'},
            {name: 'quantity', type: 'int'},
            {name: 'listPrice', type: 'int'},
            
            {name: 'price', type: 'int'},
            {name: 'rateCode', type: 'string'},
            {name: 'rateStructure', type: 'string'},
            {name: 'isWishList', type: 'boolean'},
            {name: 'addDate', type: 'string'},
            
            {name: 'modDate', type: 'string'},
            {name: 'maxBadges', type: 'int'},
            {name: 'shipMasterCustomerId', type: 'string'},
            {name: 'shipSubCustomerId', type: 'string'},
            {name: 'shipCustomerLabelName', type: 'string'},
            
            {name: 'portalId', type: 'int'},
            {name: 'isDirectPriceUpdate', type: 'boolean'},
            {name: 'componentExists', type: 'boolean'},
            {name: 'userDefinedField1', type: 'string'},
            {name: 'userDefinedField2', type: 'string'},
            
            {name: 'userDefinedField3', type: 'string'},
            {name: 'marketCode', type: 'string'},
            {name: 'hasValidScheduledPrice', type: 'boolean'},
            {name: 'maximumTickets', type: 'int'},
            {name: 'orderNo', type: 'string'},
            
            {name: 'currencyCode', type: 'string'},
            {name: 'lockedCurrencyCode', type: 'string'},
            {name: 'orderLineNo', type: 'int'},
            {name: 'membersOnlyProduct', type: 'boolean'},
            {name: 'cartSessionId', type: 'int'},
            
            {name: 'isAutoRenew', type: 'false'},
            {name: 'entityKey', type: 'string'}
        ],
        associations: {
            type: 'hasOne',
            model: 'Personify.model.jsonp.Reference',
            autoLoad: true,
            associationKey: 'ShoppingCartItems',
            name: 'ShoppingCartItems'
        }
    }
});

Ext.define('Personify.model.jsonp.store.ShoppingCart', {
    extend: 'Personify.model.base.store.ShoppingCart',
    requires: ['Personify.model.jsonp.Reference'],
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'cartItemId', type: 'int', mapping: 'CartItemId', allowNull: false},
            {name: 'relatedCartItemId', type: 'int', mapping: 'RelatedCartItemId', allowNull: false},
            
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId', allowNull: false},
            {name: 'productId', type: 'string', mapping: 'ProductId', allowNull: false},
            {name: 'subProductId', type: 'string', mapping: 'SubProductId', allowNull: false},
            {name: 'productType', type: 'string', mapping: 'ProductType', allowNull: false},
            
            {name: 'subsystem', type: 'string', mapping: 'Subsystem', allowNull: false},
            {name: 'shortName', type: 'string', mapping: 'ShortName', allowNull: false},
            {name: 'longName', type: 'string', mapping: 'LongName', allowNull: false},
            {name: 'quantity', type: 'int', mapping: 'Quantity', allowNull: false},
            {name: 'listPrice', type: 'int', mapping: 'ListPrice', allowNull: false},
            
            {name: 'price', type: 'int', mapping: 'Price', allowNull: false},
            {name: 'rateCode', type: 'string', mapping: 'RateCode', allowNull: false},
            {name: 'rateStructure', type: 'string', mapping: 'RateStructure', allowNull: false},
            {name: 'isWishList', type: 'boolean', mapping: 'IsWishList', allowNull: false},
            {name: 'addDate', type: 'string', mapping: 'AddDate', allowNull: false},
            
            {name: 'modDate', type: 'string', mapping: 'ModDate', allowNull: false},
            {name: 'maxBadges', type: 'int', mapping: 'MaxBadges', allowNull: false},
            {name: 'shipMasterCustomerId', type: 'string', mapping: 'ShipMasterCustomerId', allowNull: false},
            {name: 'shipSubCustomerId', type: 'string', mapping: 'ShipSubCustomerId', allowNull: false},
            {name: 'shipCustomerLabelName', type: 'string', mapping: 'ShipCustomerLabelName', allowNull: false},
            
            {name: 'portalId', type: 'int', mapping: 'PortalId', allowNull: false},
            {name: 'isDirectPriceUpdate', type: 'boolean', mapping: 'IsDirectPriceUpdate', allowNull: false},
            {name: 'componentExists', type: 'boolean', mapping: 'ComponentExists', allowNull: false},
            {name: 'userDefinedField1', type: 'string', mapping: 'UserDefinedField1', allowNull: false},
            {name: 'userDefinedField2', type: 'string', mapping: 'UserDefinedField2', allowNull: false},
            
            {name: 'userDefinedField3', type: 'string', mapping: 'UserDefinedField3', allowNull: false},
            {name: 'marketCode', type: 'string', mapping: 'MarketCode', allowNull: false},
            {name: 'hasValidScheduledPrice', type: 'boolean', mapping: 'HasValidScheduledPrice', allowNull: false},
            {name: 'maximumTickets', type: 'int', mapping: 'MaximumTickets', allowNull: false},
            {name: 'orderNo', type: 'string', mapping: 'OrderNo', allowNull: false},
            
            {name: 'currencyCode', type: 'string', mapping: 'CurrencyCode', allowNull: false},
            {name: 'lockedCurrencyCode', type: 'string', mapping: 'LockedCurrencyCode', allowNull: false},
            {name: 'orderLineNo', type: 'int', mapping: 'OrderLineNo', allowNull: false},
            {name: 'membersOnlyProduct', type: 'boolean', mapping: 'MembersOnlyProduct', allowNull: false},
            {name: 'cartSessionId', type: 'int', mapping: 'CartSessionId', allowNull: false},
            
            {name: 'isAutoRenew', type: 'false', mapping: 'IsAutoRenew', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
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

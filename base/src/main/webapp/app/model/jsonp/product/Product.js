Ext.define('Personify.model.jsonp.product.Product', {
    extend: 'Personify.model.base.product.Product',

    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'brandName', type: 'string', mapping: 'BrandName', allowNull: false},
            {name: 'category', type: 'string', mapping: 'Category', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'subCategory', type: 'string', mapping: 'SubCategory', allowNull: false},
            {name: 'productsId', type: 'string', mapping: 'ID', allowNull: false},
            {name: 'descr', type: 'string', mapping: 'Descr', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            {name: 'memberPrice', type: 'float', mapping: 'MemberPrice', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'parentProduct', type: 'string', mapping: 'ParentProduct', allowNull: false},
            {name: 'price', type: 'float', mapping: 'Price', allowNull: false},
            {name: 'productClass', type: 'string', mapping: 'ProductClass', allowNull: false},
            {name: 'productCode', type: 'string', mapping: 'ProductCode', allowNull: false},
            {name: 'productID', type: 'string', mapping: 'ProductID', allowNull: false},
            {name: 'purchaseActionTitle', type: 'string', mapping: 'purchaseActionTitle', allowNull: false},
            {name: 'subSystem', type: 'string', mapping: 'SubSystem', allowNull: false},
            {name: 'productReference', type: 'string', mapping: 'ProductReference', allowNull: false},
            {name: 'productListReference', type: 'string', mapping: 'ProductListReference', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'allowbackorders', type: 'boolean', mapping: 'AllowBackOrders'},
            {name: 'availablequantity', type: 'int', mapping: 'AvailableQuantity'},
            {name: 'soldout', type: 'boolean', mapping: 'SoldOut'},
            {name: 'membersonly', type: 'boolean', mapping: 'MembersOnly'},
            {name: 'featuredProduct', type: 'boolean', mapping: 'FeaturedProduct'},
            {name: 'inventoriedProduct', type: 'boolean', mapping: 'InventoriedProduct'},
            {name: 'featuredProductSortOrder', type: 'int', mapping: 'FeaturedProductSortOrder'},
            {name: 'yourPrice', type: 'float', mapping: 'YourPrice', allowNull: false},
            {name: 'yourPriceRateStructure', type: 'string', mapping: 'YourPriceRateStructure', allowNull: false},
            {name: 'yourPriceRateCode', type: 'string', mapping: 'YourPriceRateCode', allowNull: false}
        ],

        belongsTo: [
            'Personify.model.jsonp.product.ProductList',
            'Personify.model.jsonp.Exhibitor'
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Products',
                name: 'Products',
                storeName: 'ReferenceProducts',
                reader: {
                    type: 'json',
                    rootProperty: 'Products'
                }
            }
        ]
    }
});

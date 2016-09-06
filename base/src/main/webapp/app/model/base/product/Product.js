Ext.define('Personify.model.base.product.Product', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'brandName', type: 'string'},
            {name: 'category', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'subCategory', type: 'string'},
            {name: 'productsId', type: 'string'},
            {name: 'descr', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'memberPrice', type: 'float'},
            {name: 'name', type: 'string'},
            {name: 'parentProduct', type: 'string'},
            {name: 'price', type: 'float'},
            {name: 'productClass', type: 'string'},
            {name: 'productCode', type: 'string'},
            {name: 'productID', type: 'int'},
            {name: 'purchaseActionTitle', type: 'string'},
            {name: 'subSystem', type: 'string'},
            {name: 'productReference', type: 'string'},
            {name: 'productListReference', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'allowbackorders', type: 'boolean'},
            {name: 'availablequantity', type: 'int'},
            {name: 'soldout', type: 'boolean'},
            {name: 'membersonly', type: 'boolean'},
            {name: 'featuredProduct', type: 'boolean'},
            {name: 'inventoriedProduct', type: 'boolean'},
            {name: 'featuredProductSortOrder', type: 'int'},
            {name: 'yourPrice', type: 'float'},
            {name: 'yourPriceRateStructure', type: 'string'},
            {name: 'yourPriceRateCode', type: 'string'}
        ]
    }
});
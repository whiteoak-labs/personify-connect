Ext.define('Personify.model.jsonp.product.ProductClass', {
    extend: 'Personify.model.base.product.ProductClass',
    requires: 'Personify.model.jsonp.Reference',

    config:{
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'code', type: 'string', mapping: 'ProductClassList', allowNull: false},
            {name: 'description', type: 'string', mapping: 'ProductClassList', allowNull: false, 
                convert: function(value) {
                    if (value != null) {
                        value = value.toLowerCase();
                        return value.charAt(0).toUpperCase() + value.slice(1);
                    }
                }
            },
                 {name: 'text', type: 'string', mapping: 'Descr', allowNull: false},
            //    convert: function(value) {
            //        if (value != null) {
            //            value = value.toLowerCase();
            //            return value.charAt(0).toUpperCase() + value.slice(1);
            //        }
            //    }
            //},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'checked',type: 'string'},
            {name: 'count', type: 'string'}
        ],

        belongsTo: 'Personify.model.jsonp.product.ProductList',

        associations: [
           {
               type: 'hasOne', 
               model: 'Personify.model.jsonp.Reference',
               associationKey: 'PrdClassList',
               name: 'PrdClassList',
               storeName: 'ReferencePrdClassList',
                reader: {
                    type:'json',
                    rootProperty: 'PrdClassList'
                }
           }
       ]
    }
});
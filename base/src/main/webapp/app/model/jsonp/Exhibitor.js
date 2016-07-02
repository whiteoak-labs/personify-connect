Ext.define('Personify.model.jsonp.Exhibitor', {
    extend: 'Personify.model.base.Exhibitor',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.product.Product',
               'Personify.model.jsonp.Contact'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'boothNos', type: 'string', mapping: 'BoothNos', allowNull: false},
            {name: 'exhibitionID', type: 'int', mapping: 'ExhibitionID', allowNull: false},
            {name: 'exhibitionParentCode', type: 'string', mapping: 'ExhibitionParentCode', allowNull: false},
            {name: 'exhibitionProductCode', type: 'string', mapping: 'ExhibitionProductCode', allowNull: false},
            {name: 'masterCustomerID', type: 'string', mapping: 'MasterCustomerID', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'subCustomerID', type: 'string', mapping: 'SubCustomerID', allowNull: false},
            {name: 'status', type: 'string', mapping: 'Status', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            {name: 'email', type: 'string', mapping: 'Email', allowNull: false},
            {name: 'phone', type: 'string', mapping: 'Phone', allowNull: false},
            {name: 'webSiteURL', type: 'string', mapping: 'WebSiteURL', allowNull: false},
            {name: 'directoryDescription', type: 'string', mapping: 'DirectoryDescription', allowNull: false},
            {name: 'fax', type: 'string', mapping: 'Fax', allowNull: false},
            {name: 'isAdded', type: 'boolean', defaultValue: false}
        ],

        associations: [
            {
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ExhibitorList',
                name: 'ExhibitorList',
                storeName: 'ReferenceExhibitorList',
                reader: {
                    type: 'json',
                    rootProperty: 'ExhibitorList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.product.Product',
                associationKey: 'Products',
                name: 'Products',
                storeName: 'ProductsExhibitor',
                reader: {
                    type: 'json',
                    rootProperty: 'Products'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.Contact',
                associationKey: 'Contacts',
                name: 'Contacts',
                storeName: 'ContactsExhibitor',
                reader: {
                    type: 'json',
                    rootProperty: 'Contacts'
                }
            }
        ]
    }
});

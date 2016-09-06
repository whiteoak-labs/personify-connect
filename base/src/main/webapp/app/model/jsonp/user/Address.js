Ext.define('Personify.model.jsonp.user.Address', {
    extend: 'Personify.model.base.user.Address',
    config: {
        belongsTo: 'Personify.model.jsonp.User',
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'interNalKey', type: 'string', mapping:'InterNalKey'},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'},
            {name: 'id', type: 'string',mapping: 'Id', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type'},
            {name: 'streetAddress', type: 'string', mapping: 'StreetAddress', allowNull: false},
            {name: 'address2', type: 'boolean', mapping: 'Address2', allowNull: false},
            {name: 'address3', type: 'string', mapping: 'IAddress3d', allowNull: false},
            {name: 'address4', type: 'string', mapping: 'Address4', allowNull: false},
            {name: 'locality', type: 'string', mapping: 'Locality', allowNull: false},
            {name: 'region', type: 'string', mapping: 'Region', allowNull: false},
            {name: 'postalCode', type: 'boolean', mapping: 'PostalCode', allowNull: false},
            {name: 'country', type: 'string', mapping: 'Country', allowNull: false},
            {name: 'formatted', type: 'string', mapping: 'Formatted', allowNull: false},
            {name: 'canEdit', type: 'boolean', mapping: 'CanEdit', allowNull: false},
            {name: 'primary', type: 'string', mapping: 'Primary', allowNull: false},
            {name: 'markForDelete', type: 'string', mapping: 'MarkForDelete'},
            {name: 'address', type: 'string', mapping: 'Address'},
            {name: 'addresses', type: 'string', mapping: 'Addresses'}
        ],
        
        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ProfileAddresses',
                name: 'ProfileAddresses',
                storeName: 'ReferenceProfileAddresses',
                reader: {
                    type: 'json',
                    rootProperty: 'ProfileAddresses'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.user.Geo',
                associationKey: 'Geo',
                name: 'Geo',
                storeName: 'GeoAddress',
                reader: {
                    type: 'json',
                    rootProperty: 'Geo'
                }
            }
        ]
    }
});
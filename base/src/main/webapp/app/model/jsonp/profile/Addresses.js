Ext.define('Personify.model.jsonp.profile.Addresses', {
    extend: 'Personify.model.base.profile.Addresses',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.profile.Geo'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'addressesId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'typeDesc', type: 'string', mapping: 'TypeDesc', allowNull: false},
            {name: 'streetAddress', type: 'string', mapping: 'StreetAddress', allowNull: false},
            {name: 'address2', type: 'string', mapping: 'Address2', allowNull: false},
            {name: 'address3', type: 'string', mapping: 'Address3', allowNull: false},
            {name: 'address4', type: 'string', mapping: 'Address4', allowNull: false},
            {name: 'locality', type: 'string', mapping: 'Locality', allowNull: false},
            {name: 'region', type: 'string', mapping: 'Region', allowNull: false},
            {name: 'postalCode', type: 'string', mapping: 'PostalCode', allowNull: false},
            {name: 'country', type: 'string', mapping: 'Country', allowNull: false},
            {name: 'countryDesc', type: 'string', mapping: 'CountryDesc', allowNull: false},
            {name: 'formatted', type: 'string', mapping: 'Formatted', allowNull: false},
            {name: 'canEdit', type: 'boolean', mapping: 'CanEdit', allowNull: false},
            {name: 'primary', type: 'boolean', mapping: 'Primary', allowNull: false},
            {name: 'markForDelete', type: 'boolean', mapping: 'MarkForDelete'},
            {name: 'address', type: 'string', mapping: 'Address'},
            {name: 'profileAddresses', type: 'string', mapping: 'ProfileAddresses'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Addresses',
                name: 'Addresses',
                storeName: 'ReferenceAddresses',
                reader: {
                    type: 'json',
                    rootProperty: 'Addresses'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Geo',
                associationKey: 'Geo',
                name: 'Geo',
                storeName: 'GeoAddresses',
                reader: {
                    type: 'json',
                    rootProperty: 'Geo'
                }
            }
        ]
    }
});
Ext.define('Personify.model.jsonp.Profile', {
    extend: 'Personify.model.base.Profile',
    requires: ['Personify.model.jsonp.profile.Entry'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'addressTypeList', type: 'string', mapping: 'AddressTypeList', allowNull: false},
            {name: 'communicationLocationList', type: 'string', mapping: 'CommunicationLocationList', allowNull: false},
            {name: 'defaultCountry', type: 'string', mapping: 'DefaultCountry', defaultValue: 'USA' },
            {name: 'defaultCountryForPhone', type: 'string', mapping: 'DefaultCountryForPhone', defaultValue: 'USA' },
            {name: 'emailLocationList', type: 'string', mapping: 'EmailLocationList', allowNull: false},
            {name: 'urlLocationList', type: 'string', mapping: 'URLLocationList', allowNull: false},
            {name: 'namePrefixList', type: 'string', mapping: 'NamePrefixList', allowNull: false},
            {name: 'nameSuffixList', type: 'string', mapping: 'NameSuffixList', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Entry',
                associationKey: 'Entry',
                name: 'Entry',
                storeName: 'EntryProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Entry'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.NameCodeList',
                associationKey: 'NamePrefixCodeList',
                name: 'namePrefixCodeList',
                storeName: 'namePrefixCodeListStore',
                reader: {
                    type: 'json',
                    rootProperty: 'NamePrefixCodeList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.NameCodeList',
                associationKey: 'NameSuffixCodeList',
                name: 'nameSuffixCodeList',
                storeName: 'nameSuffixCodeListStore',
                reader: {
                    type: 'json',
                    rootProperty: 'NameSuffixCodeList'
                }
            }
        ]
    }
});

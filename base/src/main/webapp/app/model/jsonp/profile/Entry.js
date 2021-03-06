Ext.define('Personify.model.jsonp.profile.Entry', {
    extend: 'Personify.model.base.profile.Entry',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.profile.Addresses',
               'Personify.model.jsonp.profile.CompanyContact',
               'Personify.model.jsonp.profile.Emails',
               'Personify.model.jsonp.profile.Name',
               'Personify.model.jsonp.profile.Organization',
               'Personify.model.jsonp.profile.PhoneNumbers',
               'Personify.model.jsonp.profile.Photos',
               'Personify.model.jsonp.profile.Roles',
               'Personify.model.jsonp.profile.Urls'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'credentials', type: 'string', mapping: 'Credentials', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'entryId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId', allowNull: false},
            {name: 'encrMasterCustomerId', type: 'string', mapping: 'EncrMasterCustomerId', allowNull: false},
            {name: 'encrSubCustomerId', type: 'string', mapping: 'EncrSubCustomerId', allowNull: false},
            {name: 'displayName', type: 'string', mapping: 'DisplayName', allowNull: false},
            {name: 'organizationId', type: 'string', mapping: 'OrganizationId', allowNull: false},
            {name: 'organizationUnitId', type: 'string', mapping: 'OrganizationUnitId', allowNull: false},
            {name: 'preferredCurrency', type: 'string', mapping: 'PreferredCurrency', allowNull: false},
            {name: 'jobTitle', type: 'string', mapping: 'JobTitle', allowNull: false},
            {name: 'ccType', type: 'string', mapping: 'CCType', allowNull: false},
            {name: 'ccNumber', type: 'string', mapping: 'CCNumber', allowNull: false},
            {name: 'modOper', type: 'string', mapping: 'ModOper', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'includeInDirectory', type: 'boolean', mapping: 'IncludeInDirectory', allowNull: false},
            {name: 'includeInMobileDirectory', type: 'boolean', mapping: 'IncludeInMobileDirectory', allowNull: false},
            {name: 'userKey', type: 'string', mapping: 'UserKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.Profile',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Entry',
                name: 'Entry',
                storeName: 'ReferenceEntry',
                reader: {
                    type: 'json',
                    rootProperty: 'Entry'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Addresses',
                associationKey: 'Addresses',
                name: 'Addresses',
                storeName: 'AddressesProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Addresses'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.CompanyContact',
                associationKey: 'CompanyContact',
                name: 'CompanyContact',
                storeName: 'CompanyContactProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'CompanyContact'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Emails',
                associationKey: 'Emails',
                name: 'Emails',
                storeName: 'EmailsProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Emails'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Name',
                associationKey: 'Name',
                name: 'Name',
                storeName: 'NameProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Name'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Organization',
                associationKey: 'Organization',
                name: 'Organization',
                storeName: 'OrganizationProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Organization'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.PhoneNumbers',
                associationKey: 'PhoneNumbers',
                name: 'PhoneNumbers',
                storeName: 'PhoneNumbersProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'PhoneNumbers'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Photos',
                associationKey: 'Photos',
                name: 'Photos',
                storeName: 'PhotosProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Photos'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Roles',
                associationKey: 'Roles',
                name: 'Roles',
                storeName: 'RolesProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Roles'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.profile.Urls',
                associationKey: 'Urls',
                name: 'Urls',
                storeName: 'UrlsProfile',
                reader: {
                    type: 'json',
                    rootProperty: 'Urls'
                }
            }
        ]
    }
});
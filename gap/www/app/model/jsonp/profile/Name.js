Ext.define('Personify.model.jsonp.profile.Name', {
    extend: 'Personify.model.base.profile.Name',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'formatted', type: 'string', mapping: 'Formatted', allowNull: false},
            {name: 'familyName', type: 'string', mapping: 'FamilyName', allowNull: false},
            {name: 'givenName', type: 'string', mapping: 'GivenName', allowNull: false},
            {name: 'middleName', type: 'string', mapping: 'MiddleName', allowNull: false},
            {name: 'profileName', type: 'string', mapping: 'ProfileName', allowNull: false},
            {name: 'honorificPrefix', type: 'string', mapping: 'HonorificPrefix', allowNull: false},
            {name: 'honorificSuffix', type: 'string', mapping: 'HonorificSuffix', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'Name',
                name: 'Name',
                storeName: 'ReferenceName',
                reader: {
                    type: 'json',
                    rootProperty: 'Name'
                }
            }
        ]
    }
});
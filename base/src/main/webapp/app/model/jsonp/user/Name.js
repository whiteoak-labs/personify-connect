Ext.define('Personify.model.jsonp.user.Name', {
    extend: 'Personify.model.base.user.Name',
    config: {
        belongsTo: 'Personify.model.base.User',
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'interNalKey', type: 'string', mapping:'InterNalKey'},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey'},
            {name: 'formated', type: 'string', mapping:'Formated'},
            {name: 'familyName', type: 'string', mapping: 'FamilyName', allowNull: false},
            {name: 'givenName', type: 'string', mapping: 'GivenName', allowNull: false},
            {name: 'middleName', type: 'string', mapping: 'MiddleName'},
            {name: 'honorificPrefix', type: 'string', mapping: 'HonorificPrefix'},
            {name: 'honorificSuffix', type: 'string', mapping: 'HonorificSuffix'},
            {name: 'name', type: 'string', mapping: 'Name'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],
        
        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ProfileName',
                name: 'ProfileName',
                storeName: 'ProfileName',
                reader: {
                    type: 'json',
                    rootProperty: 'ProfileName'
                }
            }
        ]
    }
});
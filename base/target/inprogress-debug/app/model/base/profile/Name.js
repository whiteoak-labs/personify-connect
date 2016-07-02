Ext.define('Personify.model.base.profile.Name', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'formatted', type: 'string'},
            {name: 'familyName', type: 'string'},
            {name: 'givenName', type: 'string'},
            {name: 'middleName', type: 'string'},
            {name: 'profileName', type: 'string'},
            {name: 'honorificPrefix', type: 'string'},
            {name: 'honorificSuffix', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.base.user.Name', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.User',
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'interNalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'formated', type: 'string'},
            {name: 'familyName', type: 'string'},
            {name: 'givenName', type: 'string'},
            {name: 'middleName', type: 'string'},
            {name: 'honorificPrefix', type: 'string'},
            {name: 'honorificSuffix', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
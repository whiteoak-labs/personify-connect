Ext.define('Personify.model.jsonp.user.Email', {
    extend: 'Personify.model.base.user.Email',
    config: {
        belongsTo: 'Personify.model.jsonp.User',
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'interNalKey', type: 'string', mapping:'InterNalKey'},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'},
            {name: 'id', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'value', type: 'string', mapping: 'Value', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type'},
            {name: 'primary', type: 'boolean', mapping: 'Primary'},
            {name: 'markForDelete', type: 'boolean', mapping: 'MarkForDelete'},
            {name: 'profileRoles', type: 'string', mapping: 'ProfileRoles'},
            {name: 'urlsReference', type: 'string', mapping: 'Urls'},
            {name: 'rolesReference', type: 'string', mapping: 'Roles'},
            {name: 'emailsReference', type: 'string', mapping: 'Emails'}
        ],
        
        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ProfileEmails',
                name: 'ProfileEmails',
                storeName: 'ProfileEmails',
                reader: {
                    type: 'json',
                    rootProperty: 'ProfileEmails'
                }
            }
        ]
    }
});
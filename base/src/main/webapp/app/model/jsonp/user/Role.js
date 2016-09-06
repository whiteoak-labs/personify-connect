Ext.define('Personify.model.jsonp.user.Role', {
    extend: 'Personify.model.base.user.Role',
    config:{
        belongsTo: 'Personify.model.base.User',
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'interNalKey', type: 'string', mapping:'InterNalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'id', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'value', type: 'boolean', mapping: 'Value', allowNull: false, convert: function(value) {return 'true' == value.toLowerCase();}},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'primary',type: 'boolean', mapping: 'Primary', allowNull: false},
            {name: 'markForDelete',type: 'boolean', mapping: 'MarkForDelete', allowNull: false},
            {name: 'profileEmails',type: 'string', mapping: 'ProfileEmails', allowNull: false},
            {name: 'urlsReference', type: 'string', mapping: 'Urls', allowNull: false},
            {name: 'emailsReference', type: 'string', mapping: 'Roles', allowNull: false},
            {name: 'rolesReference', type: 'string', mapping: 'Emails', allowNull: false}
        ],/*end fields*/
        
        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ProfileRoles',
                name: 'ProfileRoles',
                storeName: 'ProfileRoles',
                reader: {
                    type: 'json',
                    rootProperty: 'ProfileRoles'
                }
            }
        ]
    }/* end config*/
});
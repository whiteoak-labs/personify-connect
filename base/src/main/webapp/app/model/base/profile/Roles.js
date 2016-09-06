Ext.define('Personify.model.base.profile.Roles', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'roleId', type: 'string'},
            {name: 'value', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'primary', type: 'boolean'},
            {name: 'markForDelete', type: 'boolean'},
            {name: 'profileEmails', type: 'string'},
            {name: 'profileRoles', type: 'string'},
            {name: 'urls', type: 'string'},
            {name: 'emails', type: 'string'},
            
            {name: 'roles', type: 'string'}
        ]
    }
});
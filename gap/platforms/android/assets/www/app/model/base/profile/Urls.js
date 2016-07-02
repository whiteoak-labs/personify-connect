Ext.define('Personify.model.base.profile.Urls', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'primary', type: 'boolean'},
            {name: 'type', type: 'string'},
            {name: 'value', type: 'string'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'urlId', type: 'string'},
            {name: 'markForDelete', type: 'boolean'},
            {name: 'profileEmails', type: 'string'},
            {name: 'profileRoles', type: 'string'},
            {name: 'emails', type: 'string'},
            {name: 'roles', type: 'string'}
        ]
    }
});
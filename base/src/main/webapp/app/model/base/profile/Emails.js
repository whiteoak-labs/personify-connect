Ext.define('Personify.model.base.profile.Emails', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'emailsId', type: 'string'},
            {name: 'value', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'primary', type: 'boolean'},
            {name: 'markForDelete', type: 'boolean'},
            {name: 'profileRoles', type: 'string'},
            {name: 'urls', type: 'string'},
            {name: 'roles', type: 'string'},
            {name: 'profileEmails', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
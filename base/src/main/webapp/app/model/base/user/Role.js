Ext.define('Personify.model.base.user.Role', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.User',
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'interNalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'value', type: 'boolean'},
            {name: 'type', type: 'string'},
            {name: 'primary',type: 'boolean'},
            {name: 'markForDelete',type: 'boolean'},
            {name: 'profileEmails',type: 'string'},
            {name: 'urlsReference', type: 'string'},
            {name: 'emailsReference', type: 'string'},
            {name: 'rolesReference', type: 'string'}
        ]/*end fields*/
    }/* end config*/
});
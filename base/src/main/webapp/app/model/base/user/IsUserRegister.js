Ext.define('Personify.model.base.user.IsUserRegister', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'interNalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'userRegistered', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
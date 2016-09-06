Ext.define('Personify.model.jsonp.user.IsUserRegister', {
    extend: 'Personify.model.base.user.IsUserRegister',
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'interNalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'userRegistered', type: 'boolean', mapping: 'UserRegistered', allowNull: false},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
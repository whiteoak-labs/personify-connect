Ext.define('Personify.model.base.profile.AuthenticationUrl', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            { name: 'internalKey', type: 'string' },
            { name: 'navigationKey', type: 'string' },
            { name: 'outputUrl', type: 'string' }
        ]
    }
});

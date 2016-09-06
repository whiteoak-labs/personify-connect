Ext.define('Personify.model.jsonp.profile.AuthenticationUrl', {
    extend: 'Personify.model.base.profile.AuthenticationUrl',
    
    config: {
        fields: [
            { name: 'internalKey', type: 'string', mapping: 'InternalKey' },
            { name: 'navigationKey', type: 'string', mapping: 'NavigationKey' },
            { name: 'outputUrl', type: 'string', mapping: 'outputURL' }
        ]
    }
});

Ext.define('Personify.model.personify.WebService', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            { name: 'protocol', type: 'string' },
            { name: 'server', type: 'string' },
            { name: 'path', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'headers' },
            { name: 'endpoints' }
        ]
    }
});

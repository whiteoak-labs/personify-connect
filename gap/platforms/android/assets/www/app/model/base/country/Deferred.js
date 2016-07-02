Ext.define('Personify.model.base.country.Deferred', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.Country',
        fields: [    
            {name: 'uri', type: 'string'}
        ]
    }
});
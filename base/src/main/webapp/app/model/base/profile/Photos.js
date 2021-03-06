Ext.define('Personify.model.base.profile.Photos', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'value', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'photosReference', type: 'string'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'}
        ]
    }
});
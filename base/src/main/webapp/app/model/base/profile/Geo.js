Ext.define('Personify.model.base.profile.Geo', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'latitude', type: 'string'},
            {name: 'longitude', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
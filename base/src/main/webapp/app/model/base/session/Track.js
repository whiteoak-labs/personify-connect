Ext.define('Personify.model.base.session.Track', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.Session',
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'tracks', type: 'string'},
            {name: 'descr', type: 'string'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'track',
                name: 'track'
            }
        ]
    }
});
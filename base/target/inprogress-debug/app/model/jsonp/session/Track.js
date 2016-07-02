Ext.define('Personify.model.jsonp.session.Track', {
    extend: 'Personify.model.base.session.Track',
    requires:[
        'Personify.proxy.RestService'
    ],
    config: {
        belongsTo: 'Personify.model.jsonp.Session',
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'tracks', type: 'string', mapping: 'Tracks'}
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
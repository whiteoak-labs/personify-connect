Ext.define('Personify.model.jsonp.session.Coord', {
    extend: 'Personify.model.base.session.Coord',
    requires:[
        'Personify.proxy.RestService'
    ],
    config: {
        belongsTo: 'Personify.model.jsonp.session.FloorPlan',
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'cords', type: 'int', mapping: 'Cords', allowNull: false},
            
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],
        association: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'Coords',
                name: 'Coords'
            }
        ]
    }
});
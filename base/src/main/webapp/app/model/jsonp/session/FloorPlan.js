Ext.define('Personify.model.jsonp.session.FloorPlan', {
    extend: 'Personify.model.base.session.FloorPlan',
    requires:[
        'Personify.proxy.RestService',
        'Personify.model.jsonp.session.Coord'
    ],
    config: {
        belongsTo: 'Personify.model.jsonp.Session',
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'image', type: 'string', mapping: 'Image', allowNull: false},
            {name: 'room', type: 'string', mapping: 'Room', allowNull: false},
            
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
            
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'FloorPlan',
                name: 'FloorPlan'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.session.Coord' ,
                autoLoad: true,
                associationKey: 'Coords',
                name: 'Coords',
                storeName: 'CoordFloorPlan',
                reader: {
                    type:'json',
                    rootProperty: 'Coords'
                }
            }
        ]
    }
});
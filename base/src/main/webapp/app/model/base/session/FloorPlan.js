Ext.define('Personify.model.base.session.FloorPlan', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.Session',
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'image', type: 'string'},
            {name: 'room', type: 'string'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'}
            
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'floorPlan',
                name: 'floorPlan'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.session.Coord' ,
                autoLoad: true,
                associationKey: 'coords',
                name: 'coords'
            }
        ]
    }
});
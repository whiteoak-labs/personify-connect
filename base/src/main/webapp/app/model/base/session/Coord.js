Ext.define('Personify.model.base.session.Coord', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.session.FloorPlan',
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'cords', type: 'int'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ],
        association: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'coords',
                name: 'coords'
            }
        ]
    }
});
Ext.define('Personify.model.base.Session', {
    extend: 'Personify.base.Model',
    config: {
        fields : [
            {name: 'recordId', type: 'int'},
            {name: 'description', type: 'string'},
            {name: 'endDateTime', type: 'string'},
            {name: 'memberPrice', type: 'string'},
            {name: 'location', type: 'string'},
            {name: 'locationDescription', type: 'string'},
            {name: 'orgID', type: 'string'},
            {name: 'price', type: 'string'},
            {name: 'orgUnitID', type: 'string'},
            {name: 'startDateTime', type: 'string'},
            {name: 'sessionID', type: 'string'},
            {name: 'appointmentId', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'productStatus', type: 'string'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'yourPrice', type: 'float'},
            {name: 'yourPriceRateStructure', type: 'string'},
            {name: 'yourPriceRateCode', type: 'string'}
        ]/*,
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'sessionDetail',
                name: 'sessionDetail'
            },
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'sessionList',
                name: 'sessionList'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.session.FloorPlan',
                autoLoad: true,
                associationKey: 'floorPlan',
                name: 'floorPlan'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.session.Speaker',
                autoLoad: true,
                associationKey: 'speakerList',
                name: 'speakerList'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.session.Track',
                autoLoad: true,
                associationKey: 'track',
                name: 'track'
            }
        ]*/
    }
});

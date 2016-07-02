Ext.define('Personify.model.jsonp.Session', {
    extend: 'Personify.model.base.Session',
    requires: [
        'Personify.proxy.RestService',
        'Personify.model.jsonp.session.FloorPlan',
        'Personify.model.jsonp.session.Speaker',
        'Personify.model.jsonp.session.Track',
        'Personify.model.jsonp.Reference'
    ],
    config: {
        useCache: false,
        fields : [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'startDateTimeString', type: 'string', mapping: 'StartDateTime', allowNull: false},
            {name: 'endDateTimeString', type: 'string', mapping: 'EndDateTime', allowNull: false},
            {name: 'endDateTime', type: 'string', mapping: 'UTCEndDateTime', allowNull: false},
            {name: 'memberPrice', type: 'string', mapping: 'MemberPrice', allowNull: false},
            {name: 'location', type: 'string', mapping: 'Location', allowNull: false},
            {name: 'locationDescription', type: 'string', mapping: 'LocationDescription', allowNull: false},
            {name: 'orgID', type: 'string', mapping: 'OrgID', allowNull: false},
            {name: 'price', type: 'string', mapping: 'Price', allowNull: false},
            {name: 'orgUnitID', type: 'string', mapping: 'OrgUnitID', allowNull: false},
            {name: 'startDateTime', type: 'string', mapping: 'UTCStartDateTime', allowNull: false},
            {name: 'sessionID', type: 'string', mapping: 'SessionID', allowNull: false},
            {name: 'appointmentId', type: 'string'},
            {name: 'title', type: 'string', mapping: 'Title', allowNull: false},
            {name: 'productStatus', type: 'string', mapping: 'ProductStatus', allowNull: false},
            
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'isAdded', type: 'boolean', defaultValue: false},
            {name: 'timeZoneCode', type: 'string'},
            {name: 'yourPrice', type: 'float', mapping: 'YourPrice', allowNull: false},
            {name: 'yourPriceRateStructure', type: 'string', mapping: 'YourPriceRateStructure', allowNull: false},
            {name: 'yourPriceRateCode', type: 'string', mapping: 'YourPriceRateCode', allowNull: false}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'SessionDetail',
                name: 'SessionDetail',
                storeName: 'SessionDetails',
                reader: {
                    type:'json',
                    rootProperty: 'SessionDetail'
                }
            },
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference',
                autoLoad: true,
                associationKey: 'SessionList',
                name: 'SessionList',
                storeName: 'SessionLists',
                reader: {
                    type:'json',
                    rootProperty: 'SessionList'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.session.FloorPlan',
                autoLoad: true,
                associationKey: 'FloorPlan',
                name: 'FloorPlan',
                storeName: 'FloorPlanSession',
                reader: {
                    type:'json',
                    rootProperty: 'FloorPlan'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.calendar.eventList.SpeakersList',
                autoLoad: true,
                associationKey: 'Speakers',
                name: 'Speakers',
                storeName: 'SpeakerSession',
                reader: {
                    type:'json',
                    rootProperty: 'Speakers'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.session.Track',
                autoLoad: true,
                associationKey: 'Track',
                name: 'Track',
                storeName: 'TrackSession',
                reader: {
                    type:'json',
                    rootProperty: 'Track'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.calendar.eventList.MaterialList',
                autoLoad: true,
                associationKey: 'Materials',
                name: 'Materials',
                storeName: 'MaterialStore',
                reader: {
                    type:'json',
                    rootProperty: 'Materials'
                }
            }
        ]
    },
    
    SessionNoteStore: null
});

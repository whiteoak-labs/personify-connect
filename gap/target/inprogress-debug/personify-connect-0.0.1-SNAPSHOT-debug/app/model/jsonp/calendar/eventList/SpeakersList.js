Ext.define('Personify.model.jsonp.calendar.eventList.SpeakersList', {
    extend: 'Personify.model.base.calendar.eventList.SpeakersList',
//    belongsTo: 'Personify.model.jsonp.calendar.Event',
    requires: [
        'Personify.model.jsonp.Reference',
        'Personify.model.jsonp.session.ShortSession'
    ],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerID', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerID', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'jobTitle', type: 'string', mapping: 'JobTitle', allowNull: false},
            {name: 'employer', type: 'string', mapping: 'Employer', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            
            {name: 'emailAddress', type: 'string', mapping: 'EmailAddress'},
            {name: 'url', type: 'string', mapping: 'URL'},
            {name: 'speakerList', type: 'string', mapping: 'SpeakerList'},
            {name: 'firstName', type: 'string', mapping: 'FirstName'},
            {name: 'lastName', type: 'string', mapping: 'LastName'},
            {name: 'speakers', type: 'string', mapping: 'Speakers'}
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'SpeakersList',
                name: 'SpeakersList',
                storeName: 'ReferenceSpeakersList',
                reader: {
                    type: 'json',
                    rootProperty: 'SpeakersList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.session.ShortSession',
                associationKey: 'SessionList',
                name: 'SessionList',
                storeName: 'SessionListStore',
                reader: {
                    type: 'json',
                    rootProperty: 'SessionList'
                }
            }
        ]
    }
});
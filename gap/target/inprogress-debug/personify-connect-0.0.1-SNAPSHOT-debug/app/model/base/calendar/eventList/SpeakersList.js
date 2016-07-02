Ext.define('Personify.model.base.calendar.eventList.SpeakersList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'jobTitle', type: 'string'},
            {name: 'employer', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'emailAddress', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'speakerList', type: 'string'},
            {name: 'firstName', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'speakers', type: 'string'}
        ]
    }
});
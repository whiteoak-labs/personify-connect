
Ext.define('Personify.model.base.calendar.Event', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'productID', type: 'string'},
            {name: 'startDateTime', type: 'string'},
            {name: 'endDateTime', type: 'string'},
            {name: 'shortName', type: 'string'},
            {name: 'shortDescription', type: 'string'},
            {name: 'eventType', type: 'string'},
            {name: 'isConference', type: 'boolean'},
            {name: 'conferenceTracks', type: 'string'},
            {name: 'dtStamp', type: 'string'},
            {name: 'isRecurring', type: 'string'},
            {name: 'location', type: 'string'},
            {name: 'xbtProductID', type: 'string'},
            {name: 'xbtParentProduct', type: 'string'},
            {name: 'xbtProductCode', type: 'string'},
            {name: 'price', type: 'float'},
            {name: 'memberPrice', type: 'float'},
            {name: 'longDescription', type: 'string'},
            {name: 'locationState', type: 'string'},
            {name: 'locationFullAddress', type: 'string'},
            {name: 'membersOnly', type: 'boolean'},
            {name: 'meetingTag', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'communityDiscussionURL', type: 'string'},
            {name: 'twitterHashTag', type: 'string'},
            {name: 'registered', type: 'boolean'},
            {name: 'timeZoneCode', type: 'string'},
            {name: 'capacity', type: 'int'},
            {name: 'waitlistCapacity', type: 'int'},
            {name: 'eventFormat', type: 'string'},
            {name: 'yourPrice', type: 'float'},
            {name: 'yourPriceRateStructure', type: 'string'},
            {name: 'yourPriceRateCode', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.jsonp.calendar.Event', {
    extend: 'Personify.model.base.calendar.Event',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.calendar.eventList.MaterialList',
               'Personify.model.jsonp.calendar.eventList.SponsorImageList',
               'Personify.model.jsonp.calendar.eventList.QuickLinkList',
               'Personify.model.jsonp.calendar.eventList.SpeakersList',
               'Personify.model.jsonp.calendar.eventList.TopicList'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'productID', type: 'string', mapping: 'ProductID', allowNull: false},
            {name: 'badgeData', type: 'string', mapping: 'BadgeData', allowNull: false},
            {name: 'startDateTimeString', type: 'string', mapping: 'StartDateTime', allowNull: false},
            {name: 'endDateTimeString', type: 'string', mapping: 'EndDateTime', allowNull: false},
            {name: 'startDateTime', type: 'datetime', mapping: 'UTCStartDateTime', allowNull: false},
            {name: 'endDateTime', type: 'datetime', mapping: 'UTCEndDateTime', allowNull: false},
            {name: 'shortName', type: 'string', mapping: 'ShortName', allowNull: false},
            {name: 'shortDescription', type: 'string', mapping: 'ShortDescription', allowNull: false},
            {name: 'eventType', type: 'string', mapping: 'EventType', allowNull: false},
            {name: 'isConference', type: 'boolean', mapping: 'IsConference', allowNull: false},
            {name: 'conferenceTracks', type: 'string', mapping: 'ConferenceTracks', allowNull: false},
            {name: 'dtStamp', type: 'string', mapping: 'DtStamp', allowNull: false},
            {name: 'isRecurring', type: 'string', mapping: 'IsRecurring', allowNull: false},
            {name: 'location', type: 'string', mapping: 'Location', allowNull: false, convert: function(location){
                if(location){
                    var localtionText = location.split('\\').join('');
                    return localtionText.split(' ,').join(',').replace(',', ' ');
                }else{
                    return '';
                } 
            }},
            {name: 'xbtProductID', type: 'string', mapping: 'XbtProductID', allowNull: false},
            {name: 'xbtParentProduct', type: 'string', mapping: 'XbtParentProduct', allowNull: false},
            {name: 'xbtProductCode', type: 'string', mapping: 'XbtProductCode', allowNull: false},
            {name: 'price', type: 'float', mapping: 'Price', allowNull: false},
            {name: 'memberPrice', type: 'float', mapping: 'MemberPrice', allowNull: false},
            {name: 'longDescription', type: 'string', mapping: 'LongDescription', allowNull: false},
            {name: 'locationState', type: 'string', mapping: 'LocationState', allowNull: false},
            {name: 'locationFullAddress', type: 'string', mapping: 'LocationFullAddress', allowNull: false},
            {name: 'membersOnly', type: 'boolean', mapping: 'MembersOnly', allowNull: false},
            {name: 'meetingTag', type: 'string', mapping: 'MeetingTag', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            {name: 'communityDiscussionURL', type: 'string', mapping: 'CommunityDiscussionURL', allowNull: false},
            {name: 'twitterHashTag', type: 'string', mapping: 'TwitterHashTag', allowNull: false},
            {name: 'registered', type: 'boolean', mapping: 'Registered', allowNull: false},
            {name: 'timeZoneCode', type: 'string', mapping: 'TimeZoneCode'},
            {name: 'capacity', type: 'int', mapping: 'Capacity'},
            {name: 'waitlistCapacity', type: 'int', mapping: 'WaitlistCapacity'},
            {name: 'eventFormat', type: 'string', mapping: 'EventFormat'},
            {name: 'isAdded', type: 'boolean', defaultValue: false},
            {name: 'appointmentId', type: 'string'},
            {name: 'yourPrice', type: 'float', mapping: 'YourPrice', allowNull: false},
            {name: 'yourPriceRateStructure', type: 'string', mapping: 'YourPriceRateStructure', allowNull: false},
            {name: 'yourPriceRateCode', type: 'string', mapping: 'YourPriceRateCode', allowNull: false}
        ],
        belongsTo: 'Personify.model.jsonp.ICalendar',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'EventList',
                name: 'EventList',
                storeName: 'ReferenceEventList',
                reader: {
                    type: 'json',
                    rootProperty: 'EventList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.MaterialList',
                associationKey: 'MaterialList',
                name: 'MaterialList',
                storeName: 'MaterialStore',
                reader: {
                    type: 'json',
                    rootProperty: 'MaterialList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.SponsorImageList',
                associationKey: 'SponsorList',
                name: 'SponsorList',
                storeName: 'SponsorListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'SponsorList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.QuickLinkList',
                associationKey: 'QuickLinkList',
                name: 'QuickLinkList',
                storeName: 'QuickLinkListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'QuickLinkList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.SpeakersList',
                associationKey: 'SpeakersList',
                name: 'SpeakersList',
                storeName: 'SpeakersListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'SpeakersList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.TopicList',
                associationKey: 'TopicList',
                name: 'TopicList',
                storeName: 'TopicListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'TopicList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.session.Track',
                associationKey: 'ConferenceTrackList',
                name: 'ConferenceTrackList',
                storeName: 'ConferenceTrackListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'ConferenceTrackList'
                }
            }
        ]
    },
   
   SessionDatesStore:null,
    SessionStore: null,
    MeetingAgendaStore: null,
    MeetingRegistrantStore: null,
    ExhibitorStore: null,
    MyExhibitorStore: null,
    EventNoteStore: null

});
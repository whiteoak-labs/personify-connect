Ext.define('Personify.model.jsonp.ICalendar', {
    extend: 'Personify.model.base.ICalendar',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.calendar.Event',
               'Personify.model.jsonp.calendar.eventList.TopicList',
               'Personify.model.jsonp.calendar.eventList.topicList.SubcodeList',
               'Personify.model.jsonp.calendar.EventFormatListCount',
               'Personify.model.jsonp.calendar.AppintmentList',
               'Personify.model.jsonp.calendar.LocationList'
               ],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'productID', type: 'string', mapping: 'ProductID', allowNull: false},
            
            //// To Get & Set Total Count for Event Enhancements */
            {name: 'totalCount', type: 'int', mapping: 'TotalCount', allowNull: false}
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'ICalMeetingList',
                name: 'ICalMeetingList',
                storeName: 'ReferenceICalMeetingList',
                reader: {
                    type: 'json',
                    rootProperty: 'ICalMeetingList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.Event',
                associationKey: 'EventList',
                name: 'EventList',
                storeName: 'EventListStore',
                reader: {
                    implicitIncludes: true,
                    type: 'json',
                    rootProperty: 'EventList'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.TopicList',
                associationKey: 'TopicListCount',
                name: 'TopicListCount',
                storeName: 'TopicListCountStore',
                reader: {
                    type: 'json',
                    rootProperty: 'TopicListCount'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.LocationList',
                associationKey: 'LocationListCount',
                name: 'LocationListCount',
                storeName: 'LocationListCountStore',
                reader: {
                    type: 'json',
                    rootProperty: 'LocationListCount'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.EventFormatListCount',
                associationKey: 'EventFormatListCount',
                name: 'EventFormatListCount',
                storeName: 'EventFormatListCountStore',
                reader: {
                    type: 'json',
                    rootProperty: 'EventFormatListCount'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.AppintmentList',
                associationKey: 'AppintmentList',
                name: 'AppintmentList',
                storeName: 'AppintmentListStore',
                reader: {
                    type: 'json',
                    rootProperty: 'AppintmentList'
                }
            }
        ]
    }
});
Ext.define('Personify.model.jsonp.calendar.eventList.TopicList', {
    extend: 'Personify.model.base.calendar.eventList.TopicList',

    requires: ['Personify.model.jsonp.Reference',
               'Personify.model.jsonp.calendar.eventList.topicList.SubcodeList'],

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'code', type: 'string', mapping: 'Code', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'count', type: 'int', mapping: 'Count', allowNull: false},
            {name: 'topicListCount', type: 'string', mapping: 'TopicListCount', allowNull: false},
            {name: 'topicList', type: 'string', mapping: 'TopicList', allowNull: false},
            {name: 'checked', type: 'string'}
        ],
        belongsTo: [
            'Personify.model.jsonp.calendar.Event',
            'Personify.model.jsonp.ICalendar'
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'TopicList',
                name: 'TopicList',
                storeName: 'ReferenceTopicList',
                reader: {
                    type: 'json',
                    rootProperty: 'TopicList'
                }
            },
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'TopicListCount',
                name: 'TopicListCount',
                storeName: 'ReferenceTopicListCount',
                reader: {
                    type: 'json',
                    rootProperty: 'TopicListCount'
                }
            },
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.calendar.eventList.topicList.SubcodeList',
                associationKey: 'SubcodeList',
                name: 'SubcodeList',
                storeName: 'SubcodeListEvent',
                reader: {
                    type: 'json',
                    rootProperty: 'SubcodeList'
                }
            }
        ]
    }
});
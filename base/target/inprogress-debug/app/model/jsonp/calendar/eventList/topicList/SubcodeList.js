Ext.define('Personify.model.jsonp.calendar.eventList.topicList.SubcodeList', {
    extend: 'Personify.model.base.calendar.eventList.topicList.SubcodeList',

    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'code', type: 'string', mapping: 'Code', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'count', type: 'string', mapping: 'Count', allowNull: false},
            {name: 'checked', type: 'string'}
        ],

        belongsTo: [
            'Personify.model.jsonp.calendar.eventList.TopicList',
            'Personify.model.jsonp.ICalendar'
        ],

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'SubcodeList',
                name: 'SubcodeList',
                storeName: 'ReferenceSubcodeList',
                reader: {
                    type: 'json',
                    rootProperty: 'SubcodeList'
                }
            },
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'LocationListCount',
                name: 'LocationListCount',
                storeName: 'ReferenceLocationListCount',
                reader: {
                    type: 'json',
                    rootProperty: 'LocationListCount'
                }
            }
        ]
    }
});
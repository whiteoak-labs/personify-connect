Ext.define('Personify.model.base.calendar.eventList.TopicList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'count', type: 'string'},
            {name: 'topicListCount', type: 'string'},
            {name: 'topicList', type: 'string'}
        ]
    }
});
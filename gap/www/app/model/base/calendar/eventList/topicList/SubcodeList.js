Ext.define('Personify.model.base.calendar.eventList.topicList.SubcodeList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'code', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'count', type: 'string'}
        ]
    }
});
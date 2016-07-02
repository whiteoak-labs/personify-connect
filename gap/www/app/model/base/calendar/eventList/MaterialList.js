Ext.define('Personify.model.base.calendar.eventList.MaterialList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'materialListId', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'titleParent', type: 'string'}
        ]
    }
});
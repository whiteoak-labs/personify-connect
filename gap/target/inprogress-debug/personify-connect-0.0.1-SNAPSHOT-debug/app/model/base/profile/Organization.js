Ext.define('Personify.model.base.profile.Organization', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'department', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'startDate', type: 'string'},
            {name: 'endDate', type: 'string'},
            {name: 'location', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
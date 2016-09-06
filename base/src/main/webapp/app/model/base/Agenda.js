Ext.define('Personify.model.base.Agenda', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'description', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'endDateTime', type: 'string'},
            {name: 'location', type: 'string'},
                 {name: 'locationDescription', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'startDateTime', type: 'string'},
            {name: 'speakerName', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'agendaListReference', type: 'string'}
        ]
    }
});
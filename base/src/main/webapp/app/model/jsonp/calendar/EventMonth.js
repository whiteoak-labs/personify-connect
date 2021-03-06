Ext.define('Personify.model.jsonp.calendar.EventMonth', {
    extend: 'Personify.model.base.calendar.EventMonth',

    config: {
        fields: [
            {name: 'month', type: 'int'},
            {name: 'year', type: 'int'},
            {name: 'events', defaultValue: []},
            {name: 'expanded', type: 'boolean', defaultValue: false}
        ]
    }
});

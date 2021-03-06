Ext.define('Personify.model.base.calendar.EventMonth', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'month', type: 'string'},
            {name: 'year'},
            {name: 'events'},
            {name: 'expanded', type: 'boolean'}
        ]
    }
});

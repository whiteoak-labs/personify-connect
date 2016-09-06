Ext.define('Personify.store.offline.calendar.EventMonth', {
    extend: 'Personify.store.base.calendar.EventMonth',
    requires: 'Personify.model.jsonp.calendar.EventMonth',

    config: {
        model: 'Personify.model.jsonp.calendar.EventMonth'
    }
});

Ext.define('Personify.model.jsonp.calendar.AppintmentList', {
    extend: 'Personify.model.base.calendar.AppintmentList',

    config: {
        fields: [
        ],
        belongsTo: 'Personify.model.jsonp.ICalendar'
    }
});
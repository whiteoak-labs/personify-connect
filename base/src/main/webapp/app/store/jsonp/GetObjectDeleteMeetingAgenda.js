Ext.define('Personify.store.jsonp.GetObjectDeleteMeetingAgenda', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.jsonp.CustomerMeetingAgenda'
    ],
    config: {
        model: 'Personify.model.jsonp.CustomerMeetingAgenda'
    }
});
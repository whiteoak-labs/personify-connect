Ext.define('Personify.store.jsonp.Session', {
    extend: 'Personify.store.base.Session',
    requires: [
        'Personify.model.jsonp.Session',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.Session',
        autoLoad: true,
    },
           
});
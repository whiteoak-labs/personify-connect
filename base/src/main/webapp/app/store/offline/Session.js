Ext.define('Personify.store.offline.Session', {
    extend: 'Personify.store.base.Session',
    requires: [
        'Personify.model.jsonp.Session',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.Session',
        autoLoad: true,
    }
});
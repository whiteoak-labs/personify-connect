Ext.define('Personify.store.offline.User', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.jsonp.User',
        'Personify.proxy.OfflineProxy'
    ],
    
    config: {
        model: 'Personify.model.jsonp.User',
        proxy: {
            type : 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('login'),
            reader: {
                type: 'json',
                rootProperty: 'Entry'
            }
        }
    }
});

Ext.define('Personify.store.offline.Country', {
    extend: 'Personify.store.base.Country',
    requires: [
        'Personify.model.jsonp.Country',
        'Personify.proxy.OfflineProxy'
    ],
    
    config: {
        storeId: 'countryStore',
        model: 'Personify.model.jsonp.Country',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('utilCountries'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'd'
            }
        };

        this.setProxy(proxy);
    }
});
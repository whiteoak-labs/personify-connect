Ext.define('Personify.store.jsonp.Customer', {
    extend: 'Personify.store.base.Customer',
    requires: [
        'Personify.model.jsonp.Customer',
        'Personify.proxy.RestService'
    ],

    config: {
        storeId: 'Customer',
        model: 'Personify.model.jsonp.Customer',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('userPreferences'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'CustomerPreferencesList'
            }
        };

        this.setProxy(proxy);
    }
});
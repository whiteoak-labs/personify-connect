Ext.define('Personify.store.jsonp.Profile', {
    extend: 'Personify.store.base.Profile',

    requires: [
        'Personify.model.jsonp.Profile',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Profile',
        autoLoad: false,
        listeners: {
            beforeload: 'onBeforeLoad'
         }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileGet'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
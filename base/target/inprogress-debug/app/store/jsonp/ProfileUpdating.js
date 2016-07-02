Ext.define('Personify.store.jsonp.ProfileUpdating', {
    extend: 'Personify.store.base.Profile',

    requires: [
        'Personify.model.jsonp.Profile',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Profile',
        autoLoad: false,
        proxy: {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileUpdate'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json'
            }
        },
        listeners: {
            beforeload: 'onBeforeLoad'
         }
    },

    onBeforeLoad: function() {
        var proxy = this.getProxy();
        proxy.setUrl(Personify.utils.ServiceManager.getUrlWS('profileUpdate'));
        proxy.setHeaders(Personify.utils.ServiceManager.getHeaders());
        proxy.setJsonData(this.getDataRequest());
    }
});
Ext.define('Personify.store.jsonp.profile.AuthenticationUrl', {
    extend: 'Personify.store.base.profile.AuthenticationUrl',
    requires: [
        'Personify.model.jsonp.profile.AuthenticationUrl'
    ],

    config: {
        model: 'Personify.model.jsonp.profile.AuthenticationUrl',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileAuthenticationUrl'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

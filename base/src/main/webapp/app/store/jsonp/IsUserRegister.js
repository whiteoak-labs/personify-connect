Ext.define('Personify.store.jsonp.IsUserRegister', {
    extend: 'Personify.store.base.IsUserRegister',
    requires: [
        'Personify.model.jsonp.user.IsUserRegister',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.user.IsUserRegister',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventRegistered'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
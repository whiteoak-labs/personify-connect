Ext.define('Personify.store.jsonp.profile.UpdateProfile', {
    extend: 'Personify.store.base.profile.UpdateProfile',

    requires: [
        'Personify.model.jsonp.Profile',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Profile',
        storeId: 'updateProfileStore',
        autoLoad: false,
        listeners: {
            beforeload: 'onBeforeLoad'
         }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileUpdate'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
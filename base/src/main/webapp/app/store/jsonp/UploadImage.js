Ext.define('Personify.store.jsonp.UploadImage', {
    extend: 'Personify.store.base.UploadImage',
    requires: [
        'Personify.model.jsonp.UploadImageResult',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.UploadImageResult',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            headers: Personify.utils.ServiceManager.getHeaders(),
            url: Personify.utils.ServiceManager.getUrlWS('profileImageUpdate'),
            jsonData: dataRequest,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
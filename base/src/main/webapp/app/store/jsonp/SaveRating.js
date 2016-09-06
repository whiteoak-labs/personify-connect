Ext.define('Personify.store.jsonp.SaveRating', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.jsonp.SaveRating',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.SaveRating',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventSessionRating'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
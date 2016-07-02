Ext.define('Personify.store.jsonp.Directory', {
    extend: 'Personify.store.base.Directory',
    requires: [
        'Personify.model.jsonp.Directory',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.DirectoryManagement',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }

    },
    
    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('directoryEntries'),
            jsonData: dataRequest,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
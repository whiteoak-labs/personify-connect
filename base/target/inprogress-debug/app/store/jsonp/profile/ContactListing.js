Ext.define('Personify.store.jsonp.profile.ContactListing', {
    extend: 'Personify.store.base.profile.ContactListing',
    requires: [
        'Personify.model.jsonp.contactlisting.ContactManagement',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.contactlisting.ContactManagement',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }

    },
    
    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileContacts'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: dataRequest,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});

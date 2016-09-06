Ext.define('Personify.store.jsonp.profile.ContactTracking', {
    extend: 'Personify.store.base.profile.ContactTracking',
    requires: [
        'Personify.model.jsonp.contactlisting.ContactDetailManagement',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.contactlisting.ContactDetailManagement',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }

    },
    
    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileContactDetails'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: dataRequest,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
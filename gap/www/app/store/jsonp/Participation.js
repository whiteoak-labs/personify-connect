Ext.define('Personify.store.jsonp.Participation', {
    extend: 'Personify.store.base.Participation',
    requires: [
        'Personify.model.jsonp.Participation',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.Participation',
        autoLoad: false,
        implicitIncludes: true,
        dataRequest: null,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            headers: Personify.utils.ServiceManager.getHeaders(),
            url: Personify.utils.ServiceManager.getUrlWS('profileParticipations'),
            jsonData: dataRequest,
            reader: {
                implicitIncludes: true,
                type: 'json',
                successProperty: 'IsValidUser'
            }
        };

        this.setProxy(proxy);
    }
});
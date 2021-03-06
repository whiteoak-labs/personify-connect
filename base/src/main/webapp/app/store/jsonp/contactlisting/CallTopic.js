Ext.define('Personify.store.jsonp.contactlisting.CallTopic', {
    extend: 'Personify.store.base.contactlisting.CallTopic',
    requires: 'Personify.model.jsonp.contactlisting.CallTopic',
    
    config: {
        model: 'Personify.model.jsonp.contactlisting.CallTopic',
        haveData:false,
        autoLoad: true,
        implicitIncludes: true,
        listeners:{
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var proxy = {
            type: 'rest',
            url: Personify.utils.ServiceManager.getUrlWS('utilCallTopic'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'd'
            }
        };

        this.setProxy(proxy);
    }
});
Ext.define('Personify.store.jsonp.contactlisting.CallType', {
    extend: 'Personify.store.base.contactlisting.CallType',
    requires: 'Personify.model.jsonp.contactlisting.CallType',
    
    config: {
        model: 'Personify.model.jsonp.contactlisting.CallType',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var proxy = {
            type: 'rest',
            url: Personify.utils.ServiceManager.getUrlWS('utilCallType'),
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
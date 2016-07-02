Ext.define('Personify.store.offline.Session', {
    extend: 'Personify.store.base.Session',
    requires: [
        'Personify.model.jsonp.Session',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.Session',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventSessions'),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'SessionList'
            }
        };

        this.setProxy(proxy);
    }
});
Ext.define('Personify.store.offline.SessionList', {
    extend: 'Personify.store.base.SessionList',
    requires: [
        'Personify.model.jsonp.SessionList',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.SessionList',
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
            }
        };

        this.setProxy(proxy);
    }
});
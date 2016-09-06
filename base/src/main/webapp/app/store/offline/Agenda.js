Ext.define('Personify.store.offline.Agenda', {
    extend: 'Personify.store.base.Agenda',
    requires:[
        'Personify.model.jsonp.Agenda',
        'Personify.proxy.OfflineProxy'
    ],
    config: {
        model: 'Personify.model.jsonp.Agenda',
        haveData: false,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventAgenda'),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'AgendaList'
            }
        };

        this.setProxy(proxy);
    }
});
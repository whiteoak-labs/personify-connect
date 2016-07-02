Ext.define('Personify.store.jsonp.Agenda', {
    extend: 'Personify.store.base.Agenda',
    requires:[
        'Personify.model.jsonp.Agenda',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Agenda',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventAgenda'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'AgendaList'
            }
        };

        this.setProxy(proxy);
    }
});
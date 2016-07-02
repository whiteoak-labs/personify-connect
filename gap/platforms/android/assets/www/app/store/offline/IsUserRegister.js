Ext.define('Personify.store.offline.IsUserRegister', {
    extend: 'Personify.store.base.IsUserRegister',
    requires: [
        'Personify.model.jsonp.user.IsUserRegister',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.user.IsUserRegister',
        haveData: false,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventRegistered'),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
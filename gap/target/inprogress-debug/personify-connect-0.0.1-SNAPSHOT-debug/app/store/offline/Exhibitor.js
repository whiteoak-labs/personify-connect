Ext.define('Personify.store.offline.Exhibitor', {
    extend: 'Personify.store.base.Exhibitor',

    requires: [
        'Personify.model.jsonp.Exhibitor',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.Exhibitor',
        sorters: 'name',
        grouper: function(record) {
            return record.get('name')[0];
        },
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventExhibitors'),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'ExhibitorList'
            }
        };

        this.setProxy(proxy);
    }
});
Ext.define('Personify.store.jsonp.Exhibitor', {
    extend: 'Personify.store.base.Exhibitor',

    requires: [
        'Personify.model.jsonp.Exhibitor',
        'Personify.proxy.RestService'
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
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventExhibitors'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'ExhibitorList'
            }
        };

        this.setProxy(proxy);
    }
});
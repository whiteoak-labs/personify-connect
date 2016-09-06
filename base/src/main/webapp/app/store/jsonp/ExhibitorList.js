Ext.define('Personify.store.jsonp.ExhibitorList', {
    extend: 'Personify.store.base.ExhibitorList',

    requires: [
        'Personify.model.jsonp.ExhibitorList',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.ExhibitorList',
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
            url: Personify.utils.ServiceManager.getUrlWS('eventExhibitorsList'),
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

/*onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
           type: 'rest',///'restservice',
           url: 'http://s3.dublabs.com/data/mConference/exhibitor1.txt', ////Personify.utils.ServiceManager.getUrlWS('eventExhibitors'),
           ////jsonData: data,
           ////headers: Personify.utils.ServiceManager.getHeaders(),
           reader: {
           implicitIncludes: true,
           type: 'json',
           rootProperty: 'ExhibitorList'
           }
           };
           
           this.setProxy(proxy);
    }
});*/
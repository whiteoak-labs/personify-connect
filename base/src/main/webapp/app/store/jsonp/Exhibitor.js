Ext.define('Personify.store.jsonp.Exhibitor', {
    extend: 'Personify.store.base.Exhibitor',

    requires: [
        'Personify.model.jsonp.Exhibitor',
        'Personify.proxy.RestService'
    ],

    config: {
        model: 'Personify.model.jsonp.Exhibitor',       
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

   onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventExhibitorsDetails'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json'/*,
                rootProperty: 'ExhibitorList'*/
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
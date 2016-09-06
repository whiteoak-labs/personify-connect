Ext.define('Personify.store.jsonp.SessionList', {
    extend: 'Personify.store.base.SessionList',
    requires: [
        'Personify.model.jsonp.SessionList',
        'Personify.proxy.RestService'
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
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventSessions'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json'
           }
        };

        this.setProxy(proxy);
    }
});

/*onBeforeLoad: function() {
           var data = this.getDataRequest();
           var proxy = {
            type: 'rest',///'restservice',
            url: 'http://s3.dublabs.com/data/mConference/session1.txt',
            reader: {
                implicitIncludes: true,
                type: 'json'
            }
          };
 
          this.setProxy(proxy);
      }
 });*/
Ext.define('Personify.store.offline.Profile', {
           extend: 'Personify.base.Store',
           
           requires: [
                      'Personify.model.jsonp.Profile',
                      'Personify.proxy.ProfileProxy',
                      ],
           
           config: {
           model: 'Personify.model.jsonp.Profile',
           autoLoad: false,
           listeners: {
           beforeload: 'onBeforeLoad',
           }
           },
           
           onBeforeLoad: function() {
           var data = this.getDataRequest();
           var proxy = {
           type: 'profileproxy',
           url: Personify.utils.ServiceManager.getUrlWS('profileGet'),
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
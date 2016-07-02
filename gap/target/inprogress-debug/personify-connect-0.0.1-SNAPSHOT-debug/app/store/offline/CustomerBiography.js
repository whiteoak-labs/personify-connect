Ext.define('Personify.store.offline.CustomerBiography', {
    extend: 'Personify.store.base.CustomerBiography',
    requires: [
        'Personify.model.jsonp.CustomerBiography',
        'Personify.proxy.OfflineProxy'
    ],

    config: {
        model: 'Personify.model.jsonp.CustomerBiography',
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var record = this.getDataRequest();
        var url = Personify.utils.ServiceManager.getUrlWS('customerBiography') + "?$format=JSON&$filter=MasterCustomerId eq ('" + record.get('masterCustomerId') +  "') and SubCustomerId eq(" + record.get('subCustomerId') +")";
        var proxy =  {
            type: 'offlineproxy',
            url: url,
            jsonData: {
                MasterCustomerId: record.get('masterCustomerId'),
                SubCustomerId: record.get('subCustomerId')
            },
            reader: {
                type: 'json',
                rootProperty: 'd',
                implicitIncludes: true
            }
        };

        this.setProxy(proxy);
    }
});
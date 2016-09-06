Ext.define('Personify.store.jsonp.CustomerBiography', {
    extend: 'Personify.store.base.CustomerBiography',
    requires: [
        'Personify.model.jsonp.CustomerBiography',
        'Personify.proxy.RestService'
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
        var proxy = {
            type: 'restservice',
            actionMethods: {
                create: 'POST',
                read: 'GET',
                update: 'PUT',
                destroy: 'DELETE'
            },
            url: url,
            headers: Personify.utils.ServiceManager.getHeaders(),
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
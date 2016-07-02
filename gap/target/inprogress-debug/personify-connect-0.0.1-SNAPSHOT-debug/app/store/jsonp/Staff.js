Ext.define('Personify.store.jsonp.Staff', {
    extend: 'Personify.store.base.Staff',
    requires: [
        'Personify.model.jsonp.Staff',
        'Personify.proxy.RestService'
    ],
    config: {
        storeId: 'Staff',
        model: 'Personify.model.jsonp.Staff',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy =  {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('directoryStaffs'),
            jsonData: data,
            headers: Personify.utils.ServiceManager.getHeaders(),
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'StaffList'
            }
        };

        this.setProxy(proxy);
    }
});
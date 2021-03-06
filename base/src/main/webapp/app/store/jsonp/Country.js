Ext.define('Personify.store.jsonp.Country', {
    extend: 'Personify.store.base.Country',
    requires: 'Personify.model.jsonp.Country',
    
    config: {
        storeId: 'countryStore',
        model: 'Personify.model.jsonp.Country',
        haveData: false,
        autoLoad: true,
        implicitIncludes: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var proxy = {
            type: 'rest',
            url: 'data/country_list.json',
            reader: {
                implicitIncludes: true,
                type: 'json',
                rootProperty: 'd'
            }
        };

        this.setProxy(proxy);
    }
});
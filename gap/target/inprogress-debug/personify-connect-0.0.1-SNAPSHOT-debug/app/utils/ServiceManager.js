Ext.define('Personify.utils.ServiceManager', {
    requires: [
        'Personify.utils.modelmanager.ModelJsonpManager',
        'Personify.utils.storemanager.StoreJsonpManager',
        'Personify.utils.storemanager.StoreOfflineManager'
    ],
    singleton: true,
    
    config: {
        defaultType: 'json',
        modelManager: null,
        storeManager: null
    },
    
    constructor: function(config) {
        this.initConfig(config);
    },

    updateManager: function(typeData) {
        var me= this,
            modelManager = null,
            storeManager = null,
            type = typeData || me.getDefaultType();

        switch (type) {
            case 'json':
                modelManager = Ext.create('Personify.utils.modelmanager.ModelJsonpManager');
                storeManager = Ext.create('Personify.utils.storemanager.StoreJsonpManager');
                break;
            case 'offline':
                modelManager = Ext.create('Personify.utils.modelmanager.ModelJsonpManager');
                storeManager = Ext.create('Personify.utils.storemanager.StoreOfflineManager');
                break;
        }

        me.setModelManager(modelManager);
        me.setStoreManager(storeManager);
    },
    
    getUrlWS: function(name) {
        var webserviceManager = Personify.utils.wsmanager.WSManager;
        return webserviceManager.protocol + webserviceManager.server + "/" + webserviceManager.path + '/' + webserviceManager.endpoints[name];
    },

    getHeaders: function() {
        return Personify.utils.wsmanager.WSManager.headers;
    }
});

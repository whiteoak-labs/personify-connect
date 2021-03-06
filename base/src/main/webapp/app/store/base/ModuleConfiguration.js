Ext.define('Personify.store.base.ModuleConfiguration', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.ModuleConfiguration'
    ],
    
    config: {
    	currentUser: null,
        model: 'Personify.model.base.ModuleConfiguration',
        autoLoad: false,
        storeId: 'moduleConfiguration',
        proxy: {
            type: 'ajax',
            url : 'data/home_modules.json',
            reader: {
                type: 'json'
            }
        }
        
    }
});
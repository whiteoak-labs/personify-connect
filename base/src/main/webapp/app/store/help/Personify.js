Ext.define('Personify.store.help.Personify', {
    extend: 'Personify.base.Store',
    requires: 'Personify.model.help.Personify',
    
    config: {
        model: 'Personify.model.help.Personify',
        proxy: {
            type: 'rest',
            url: 'data/Personify.json',
            reader: {
                type: 'json'
            }
        }
    }
});

Ext.define('Personify.store.personify.Personify', {
    extend: 'Personify.base.Store',
    requires: 'Personify.model.personify.Personify',
    
    config: {
        model: 'Personify.model.personify.Personify',
        proxy: {
            type: 'rest',
            url: 'data/Personify.json',
            reader: {
                type: 'json'
            }
        }
    }
});

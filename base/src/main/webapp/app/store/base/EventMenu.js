Ext.define('Personify.store.base.EventMenu', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.EventMenu'
    ],
    
    config: {
        model: 'Personify.model.base.EventMenu',
        proxy: null
    }
})
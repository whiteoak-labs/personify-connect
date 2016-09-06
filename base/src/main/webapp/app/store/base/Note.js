Ext.define('Personify.store.base.Note', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.Note'
    ],
    
    config: {
        model: 'Personify.model.base.Note',
        autoLoad: true,
        storeId: 'noteStore',
        proxy: {
            type: 'ajax',
            url : 'data/Notes.json',
            reader: {
                type: 'json',
                rootProperty: 'notes'
            }
        }
    }
});
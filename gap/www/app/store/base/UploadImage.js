Ext.define('Personify.store.base.UploadImage', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.base.UploadImageResult'
    ],
    
    config: {
        model: 'Personify.model.base.UploadImageResult',
        proxy: null
    }
});

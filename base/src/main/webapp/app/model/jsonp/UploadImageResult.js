Ext.define('Personify.model.jsonp.UploadImageResult', {
    extend: 'Personify.model.base.UploadImageResult',
    config: {
        fields: [
            {name: 'isImageUploaded', type: 'boolean', mapping: 'IsImageUploaded'}
        ]
    }
});

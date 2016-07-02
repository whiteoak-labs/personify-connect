Ext.define('Personify.controller.phone.directory.contactinfo.photoandrelated.Photo', {
    extend: 'Personify.controller.profile.Photo',
    control: {
        imageFrame: {
            
        },
        editButton: {
            'tap': 'onEditPictureTapped'
        }
    },
    config: {
        record: null,
        isEditing: false
    }
});

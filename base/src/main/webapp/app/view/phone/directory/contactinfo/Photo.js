Ext.define('Personify.view.phone.directory.contactinfo.Photo', {
    extend: 'Ext.Panel',
    xtype: 'photophone',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.Photo',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.Photo',

    config: {
        items: [
            {
                xtype: 'image',
                itemId:'imageFrame',
                src: 'resources/icons/phone/defaultAvatar.png',
                cls: 'p-field-info p-panel-photo'
            },
            {
                xtype: 'button',
                cls: 'p-button-phone-editprofile',
                pressedCls: 'p-phone-button-blue-pressing',
                text: 'Edit',
                itemId: 'editButton',
                hidden: true
            }
        ]
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});

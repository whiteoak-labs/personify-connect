Ext.define('Personify.view.profile.contactinfo.Photo', {
    extend: 'Ext.Container',
    xtype: 'photo',
    controller: 'Personify.controller.profile.Photo',
    requires: [
        'Personify.controller.profile.Photo',
        'Personify.view.profile.contactinfo.EditFormTemplate'
    ],
    config: {
        editing: false,
        scrollable: null,
        layout: 'vbox',
        itemId: 'gonnadie',
        items: [
            {//photo
                itemId:'imageFrame',
                minHeight: 130,
                minWidth: 130,
                style: 'background-size: 100% 100%; background-color: white;',
                xtype: 'image'
            },
            {//button Edit for Photo
                xtype: 'button',
                baseCls: 'p-button-editPhoto',
                text: 'Edit',
                itemId: 'editButton',
                hidden: true
            }
        ]
    },//end config
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
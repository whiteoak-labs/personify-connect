Ext.define('Personify.view.phone.directory.contactinfo.PhotoAndRelated', {
    extend: 'Ext.Panel',
    xtype: 'photoandrelatedphone',
    controller: 'Personify.controller.phone.directory.contactinfo.PhotoAndRelated',
    
    requires: [
        'Personify.controller.phone.directory.contactinfo.PhotoAndRelated',
        'Personify.view.phone.directory.contactinfo.Photo',
        'Personify.view.phone.directory.contactinfo.NameAndTitle'
    ],
    
    config: {
        layout: 'hbox',
        cls: 'p-phone-contactinfo-photoandrelated',
        items: [
            {
                xtype: 'photophone',
                itemId: 'photoPanel',
                style: 'margin-right: 10px'
            },
            {
                flex: 1,
                xtype: 'nameandtitlephone',
                itemId: 'nameAndTitlePanel'
            }
        ]
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});

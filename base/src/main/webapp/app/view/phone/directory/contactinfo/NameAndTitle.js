Ext.define('Personify.view.phone.directory.contactinfo.NameAndTitle',{
    extend: 'Ext.Panel',
    xtype: 'nameandtitlephone',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.NameAndTitle',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.NameAndTitle',

    config: {
        layout: 'vbox',
        items: [
        ]
    },
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
Ext.define('Personify.view.phone.directory.contactinfo.nameandtitle.OrganizationView', {
    extend: 'Ext.Panel',
    xtype: 'organizationviewphone',
    controller: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.OrganizationView',
    requires: 'Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.OrganizationView',

    config: {
        items:[
            {
                xtype: 'label',
                itemId: 'organizationName',
                cls: 'p-text-organization'
            }
        ]
    },//end config
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
})
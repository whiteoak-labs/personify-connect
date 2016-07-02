Ext.define('Personify.view.profile.contactinfo.OrganizationView', {
    extend: 'Ext.Panel',
    xtype: 'organizationview',
    controller: 'Personify.controller.profile.OrganizationView',
    requires: 'Personify.controller.profile.OrganizationView',

    config: {
        items:[
            {
                xtype: 'label',
                itemId: 'organizationName',
                cls: 'displayCompany'
            }
        ]
    },//end config
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
})
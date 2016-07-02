Ext.define('Personify.view.phone.directory.contactinfo.Phone', {
    extend: 'Ext.Panel',
    xtype: 'phonephone',
    controller: 'Personify.controller.phone.directory.contactinfo.Phone',
    requires: 'Personify.controller.phone.directory.contactinfo.Phone',

    config: {
        style: 'margin-bottom: 10px;',
        scrollable: null,
        items: [
            {
                html: 'Phone Numbers',
                docked: 'top',
                cls: 'p-phone-directory-contactInfo-phone'
            },
            {
                cls: 'p-field-info',
                itemId: 'infoContainer',
                items: []
            }
        ]
    },//end config
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
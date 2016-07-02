Ext.define('Personify.view.phone.directory.contactinfo.Email', {
    extend: 'Ext.Panel',
    xtype: 'emailphone',
    controller: 'Personify.controller.phone.directory.contactinfo.Email',
    requires: 'Personify.controller.phone.directory.contactinfo.Email',

    config: {
        style: 'margin-bottom: 10px;',
        items: [
            {
                html: 'Emails',
                itemId:'emailTitle',
                docked: 'top',
                cls: 'p-phone-directory-contactInfo-email'
            },
            {
                cls: 'p-field-emails-info',
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

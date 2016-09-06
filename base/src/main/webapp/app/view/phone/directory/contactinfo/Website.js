Ext.define('Personify.view.phone.directory.contactinfo.Website', {
    extend: 'Ext.Panel',
    xtype: 'websitephone',
    controller: 'Personify.controller.phone.directory.contactinfo.Website',
    requires: 'Personify.controller.phone.directory.contactinfo.Website',

    config: {
        style: 'margin-bottom: 10px;',
        items: [
            {
                html: 'Websites',
                itemId: 'websitesTitle',
                docked: 'top',
                cls: 'p-phone-directory-contactInfo-website'
            },
            {
                cls: 'p-field-websites-info',
                itemId: 'infoContainer',
                items: []
            }
        ]
    }, //end config
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
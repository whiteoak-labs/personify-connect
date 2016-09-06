Ext.define('Personify.view.phone.directory.contactinfo.Bio', {
    extend: 'Ext.Panel',
    xtype: 'biophone',
    controller: 'Personify.controller.phone.directory.contactinfo.Bio',
    requires: 'Personify.controller.phone.directory.contactinfo.Bio',

    config: {
        layout: 'hbox',
        items: [
            {
                flex: 1,
                items: [
                    {
                        layout: 'hbox',
                        items: [
                            {
                                flex:1,
                                html: 'Bio',
                                cls: 'p-phone-presenter-contactinfotitle'
                            },
                            {
                                xtype: 'button',
                                itemId: 'editBioButton',
                                hidden: true
                            }
                        ]
                    },
                    {
                        itemId: 'infoContainer',
                        items: [
                            {
                                itemId: 'biographyText',
                                cls: 'p-phone-biocontent'
                            }
                        ]
                    }
                ]
            }
        ]
    },//Config

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
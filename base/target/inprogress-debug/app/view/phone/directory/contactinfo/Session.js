Ext.define('Personify.view.phone.directory.contactinfo.Session', {
    extend: 'Ext.Panel',
    xtype: 'sessionphone',
    controller: 'Personify.controller.phone.directory.contactinfo.Session',
    requires: 'Personify.controller.phone.directory.contactinfo.Session',

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
                                flex: 1,
                                html: 'Session',
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
                        style: 'padding-bottom: 120px;'
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
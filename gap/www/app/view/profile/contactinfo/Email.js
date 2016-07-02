Ext.define('Personify.view.profile.contactinfo.Email', {
    extend: 'Ext.Container',
    alias: 'widget.email',
    xtype: 'email',
    controller: 'Personify.controller.profile.Email',
    requires: 'Personify.controller.profile.Email',

    config: {
        layout:'hbox',
        cls: 'contact-info-item-email-main-container',
        items: [
            {
                flex: 1,
                xtype: 'container',
                cls: 'contact-info-item--right-panel-container',
                items: [
                    {
                        layout: 'hbox',
                        cls: 'contact-info-item--left-panel-container',
                        items: [
                            {
                                cls: 'lblContactInfo',
                                html: 'Emails'
                            },
                            {
                                xtype: 'button',
                                itemId: 'editEmailButton',
                                baseCls: 'btnEdit',
                                hidden: true
                            }
                        ]
                    },
                    {
                        itemId: 'infoContainer'
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});

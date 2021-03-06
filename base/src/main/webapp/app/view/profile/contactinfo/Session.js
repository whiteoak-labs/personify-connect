Ext.define('Personify.view.profile.contactinfo.Session', {
    extend: 'Ext.Panel',
    xtype: 'session',
    controller: 'Personify.controller.profile.Session',
    requires: 'Personify.controller.profile.Session',

    config: {
        layout: 'hbox',
        cls: 'contact-info-item--main-container',
        items: [
            {
                flex: 1,
                cls: 'contact-info-item--right-panel-container',
                items: [
                    {
                        layout: 'hbox',
                        cls: 'contact-info-item--left-panel-container',
                        items: [
                            {
                                cls: 'lblContactInfo',
                                html: 'Session'
                            },
                            {
                                xtype: 'button',
                                itemId: 'editBioButton',
                                baseCls: 'btnEdit',
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
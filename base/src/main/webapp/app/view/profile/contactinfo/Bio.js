Ext.define('Personify.view.profile.contactinfo.Bio', {
    extend: 'Ext.Panel',
    xtype: 'bio',
    controller: 'Personify.controller.profile.Bio',
    requires: 'Personify.controller.profile.Bio',

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
                                html: 'Bio'
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
                        items: [
                            {
                                itemId: 'biographyText',
                                cls: 'biographyText'
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
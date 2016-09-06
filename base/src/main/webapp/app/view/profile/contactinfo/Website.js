Ext.define('Personify.view.profile.contactinfo.Website', {
    extend: 'Ext.Container',
    alias: 'widget.website',
    xtype: 'website',
    controller: 'Personify.controller.profile.Website',
    requires: 'Personify.controller.profile.Website',

    config: {
        layout: 'hbox',
        cls: 'contact-info-item-website-main-container',
        items: [
            {
                flex: 1,
                xtype: 'container',
                cls: 'contact-info-item--right-panel-container',
                //itemId: 'infoContainer',
                items: [
                    {
                        layout: 'vbox',
                        items: [
                            {
                                layout: 'hbox',
                                cls: 'contact-info-item--left-panel-container',
                                items: [
                                    {
                                        cls: 'lblContactInfo',
                                        html: 'Websites'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'editWebsiteButton',
                                        baseCls: 'btnEdit',
                                        hidden: true
                                    }
                                ]
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

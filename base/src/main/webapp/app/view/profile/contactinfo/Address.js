Ext.define('Personify.view.profile.contactinfo.Address', {
    extend: 'Ext.Container',
    alias: 'widget.address',
    xtype: 'address',
    controller: 'Personify.controller.profile.Address',
    requires: 'Personify.controller.profile.Address',

    config: {
        layout: 'hbox',
        cls: 'contact-info-item--main-container',
        items: [
            {
                flex: 1,
                cls: 'contact-info-item--right-panel-container',
                xtype: 'container',
                scrollable: null,
                items: [
                    {
                        layout: 'hbox',
                        cls: 'contact-info-item--left-panel-container',
                        items: [
                            {
                                flex: 9,
                                cls: 'lblContactInfo',
                                html: 'Addresses'
                            },
                            {
                                flex: 2,
                                xtype: 'button',
                                itemId: 'editAddressButton',
                                baseCls: 'btnEdit',
                                hidden: true
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        itemId: 'infoContainerReadOnly',
                        items: []
                    },
                    {
                        xtype: 'panel',
                        itemId: 'infoContainer',
                        items: []
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'right'
                        },
                        items: [
                            {
                                xtype: 'button',
                                align: 'end',
                                itemId: 'buttonAddAddress',
                                baseCls: 'buttonAddAddress',
                                html: 'Add New',
                                hidden: true
                            }
                        ]
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

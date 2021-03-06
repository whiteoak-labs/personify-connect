Ext.define('Personify.view.phone.directory.contactinfo.Address', {
    extend: 'Ext.Panel',
    xtype: 'addressphone',
    controller: 'Personify.controller.phone.directory.contactinfo.Address',
    requires: 'Personify.controller.phone.directory.contactinfo.Address',

    config: {
        style: 'margin-bottom:10px',
        layout: 'vbox',
        items: [
            {
                html: 'Addresses',
                cls: 'p-phone-directory-contactInfo-address'
            },
            {
                cls: 'p-field-info-readOnly',
                itemId: 'infoContainerReadOnly',
                items: []
            },
            {
                cls: 'p-field-info',
                itemId: 'infoContainer',
                items: []
            },
            {
                layout:{
                    type:'hbox',
                    pack:'end',
                    align:'center'
                },
                items:[
                    {
                        itemId: 'buttonAddAddress',
                        xtype: 'button',
                        text: 'Add new address',
                        hidden: true,
                        cls:'p-phone-buttonaddaddress-editform',
                        pressedCls:'p-phone-button-blue-pressing'
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

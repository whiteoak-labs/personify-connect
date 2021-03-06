Ext.define('Personify.view.phone.exhibitor.ContactExItemPhone', {
    extend: 'Ext.Container',
    xtype: 'contactExItemPhone',
    controller: 'Personify.controller.phone.exhibitor.ContactExItemPhone',

    requires: [
        'Personify.controller.phone.exhibitor.ContactExItemPhone',
        'Personify.view.phone.exhibitor.ContactListExItemPhone',
        'Personify.view.phone.common.Toolbar'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        store: null,
        items:[
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarContactExhibitor',
                title: 'Contact Detail'
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                flex: 1,
                cls: 'exhibitorScreenPhone',
                padding: '10px',
                items: [
                    {
                        html: '<b>Related Contacts:</b>',
                        style: 'margin-bottom: 8px;'
                    },
                    {
                        xtype: 'contactListExItemPhone',
                        itemId: 'contactListExItemPhone',
                        flex: 1
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(this.down("#contactListExItemPhone") != null) {
            this.down("#contactListExItemPhone").setStore(record.ContactsExhibitor);
        }
    }
});

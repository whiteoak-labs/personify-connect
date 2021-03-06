Ext.define('Personify.view.exhibitor.ContactExhibitorItem', {
    extend: 'Ext.Panel',
    xtype: 'contactExhibitorItem',
    requires: 'Personify.view.exhibitor.ContactListExItem',

    config: {
        store: null,
        scrollable: true,
        cls: 'productExhibitorItem',
        style: 'padding: 0px;',
        flex: 1,
        items:[
            {
                xtype: 'contactListExItem',
                itemId: 'contactListExItem'
            }
        ]
    },

    updateRecord: function(record) {
        if(this.down("#contactListExItem") != null) {
            this.down("#contactListExItem").setStore(record.ContactsExhibitor);
        }
    }
});

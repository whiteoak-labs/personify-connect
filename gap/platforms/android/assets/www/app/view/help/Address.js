Ext.define('Personify.view.help.Address', {
    extend: 'Ext.Panel',
    requires: 'Personify.view.profile.contactinfo.address.AddressList',
    xtype: 'addressPanel', 
    
    config: {
        title: 'Addresses:',
        items:[
            {
                itemId: 'addressesTitle',
                html: 'Addresses: <hr class="helpHR"/>',
                cls: 'aboutAPAHeaders'
            },
            {
                xtype: 'addressList',
                itemId: 'addressList',
                cls: 'p-about-information',
                selectedCls: ''
            }
        ]
    },

    updateTitle: function(title) {
        this.down('#addressesTitle').setHtml(title + ' <hr class="helpHR"/>');
    },

    updateStore: function(store) {
        this.down('#addressList').setStore(store);
    }
});

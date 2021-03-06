Ext.define('Personify.view.phone.exhibitor.ProductExItemPhone', {
    extend: 'Ext.Container',
    xtype: 'productExItemPhone',
    controller: 'Personify.controller.phone.exhibitor.ProductExItemPhone',

    requires: [
        'Personify.controller.phone.exhibitor.ProductExItemPhone',
        'Personify.view.phone.exhibitor.ProductListExItemPhone',
        'Personify.view.phone.common.Toolbar'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        store: null,
        items:[
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarProductExhibitor',
                title: 'Product Detail'
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                flex: 1,
                cls: 'exhibitorScreenPhone',
                items: [
                    {
                        html: '<b>Related Products:</b>',
                        margin: '10px'
                    },
                    {
                        margin: '0px 10px 0px 10px',
                        xtype: 'productListExItemPhone',
                        flex: 1,
                        itemId: 'productListExItemPhone'
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(this.down("#productListExItemPhone") != null) {
            this.down("#productListExItemPhone").setStore(record.ProductsExhibitor);
        }
    }
});

Ext.define('Personify.view.exhibitor.ProductExhibitorItem', {
    extend: 'Ext.Panel',
    xtype: 'productExhibitorItem',
    requires: 'Personify.view.exhibitor.ProductListExItem',

    config: {
        layout: 'vbox',
        store: null,
        flex: 1,
        cls: 'productExhibitorItem',
        items:[
            {
                html: '<b>Related Products:</b>'
            },
            {
                xtype: 'productListExItem',
                flex: 1,
                itemId: 'productListExItem'
            }
        ]
    },

    updateRecord: function(record) {
        if(this.down("#productListExItem") != null) {
            this.down("#productListExItem").setStore(record.ProductsExhibitor);
        }
    }
});

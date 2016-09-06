Ext.define('Personify.view.store.FeaturedProductsStore', {
    extend: 'Ext.Panel',
    xtype: 'featuredProductsStore',

    config: {
        layout: 'vbox',
        items: [
            {
                layout:'hbox',
                cls: 'p-store-header',
                items: [
                    {
                        html: 'Featured',
                        xtype: 'label'
                    },
                    {
                        cls: 'featuredTotalItem',
                        itemId: 'featuredTotalItem',
                        xtype: 'label'
                    }
                ]
            },
            {
                xtype: 'carousel',
                itemId: 'featuredItemCarousel',
                height: 130,
                scrollable: null,
                baseCls: 'p-store-carousel',
                styleHtmlContent: true
            }
        ]
    }
});

Ext.define('Personify.view.phone.store.FeatureProductStore', {
    extend: 'Ext.Container',
    xtype: 'featureproductstorephone',
    config: {
        items: [
            {
                xtype: 'carousel',
                itemId: 'featuredItemCarousel',
                height: 110,
                flex: 1,
                scrollable: null,
                baseCls: 'store-carousel-feature-phone',
                styleHtmlContent: true
            }
        ]
    }
});

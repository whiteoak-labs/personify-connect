Ext.define("Personify.view.Store", {
    extend: 'Ext.Container',
    alias: 'widget.storeview',
    controller: 'Personify.controller.Store',

    requires: [
        'Personify.controller.Store',
        'Personify.view.store.StoreDetails',
        'Personify.view.store.MoreDetailPage',
        'Personify.view.store.FeatureLabel',
        'Personify.view.event.complexevent.sessions.myschedule.FilterList',
        'Personify.view.store.FeaturedProductsStore'
    ],

    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'featurelabel',
                itemId: 'featureLabel'
            },
            {
                xtype: 'featuredProductsStore',
                itemId: 'featuredProductsStore',
                hidden: true
            },
            {
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        layout:'hbox',
                        cls: 'p-store-header',
                        items: [
                            {
                                xtype: 'label',
                                html: 'All Items'
                            },
                            {
                                cls: 'featuredTotalItem',
                                xtype: 'label',
                                itemId: 'totalItemStore'
                            },
                            {
                                xtype: 'label',
                                style: 'margin-left:20px',
                                itemId: 'filterTextLabel'
                            }
                        ]
                    },
                    {
                        xtype: 'carousel',
                        itemId: 'storeDetails',
                        flex: 1,
                        scrollable: null,
                        baseCls: 'p-store-carousel',
                        styleHtmlContent: true
                    }
                ]
            },
            {
                itemId: 'filterList',
                xtype: 'filterlist',
                hidden: true,
                modal: true,
                hideOnMaskTap: true
            }
        ]
    }, // end config

    initialize: function(){
        this.setMasked({xtype: 'loadmask'});
    },

    refresh: function(user) {
        this.getController().refreshData(user);
    }
});

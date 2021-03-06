Ext.define('Personify.view.phone.store.FilterPanel', {
    extend: 'Ext.Container',
    xtype: 'filterpanelstorephone',
    requires: [
        'Personify.view.phone.store.FilterProductTemplate'
    ],

    config: {
        layout: 'vbox',
        cls: 'p-phone-container-storefilter',
        items: [
            {
                xtype: 'filterproductphone',
                itemId: 'filterProductList',
                scrollable: true
            }
        ]
    }
});

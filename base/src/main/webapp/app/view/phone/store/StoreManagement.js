Ext.define('Personify.view.phone.store.StoreManagement', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.StoreManagement',
    xtype: 'storemanagementphone',
    requires: [
        'Personify.controller.phone.store.StoreManagement',
        'Personify.view.phone.store.StoreItemTemplate',
        'Personify.view.phone.store.DetailPanel',
        'Personify.view.phone.store.FilterPanel' ,
        'Personify.view.phone.store.FeatureProductStore',
        'Personify.view.phone.store.FilterStorePanel',
        'Personify.view.phone.store.MoreDetailPage'
    ],

    config: {
        layout: 'vbox',
        itemId: 'storeManagementPanel',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Store',
                itemId: 'storeToolbar'
            },
            {
                xtype: 'featureproductstorephone',
                cls: 'p-phone-storemanagementfeatureproductes',
                itemId: 'featureproductPhoneArea',
                hidden: true
            },
            {
                xtype: 'detailpanelproductphone',
                itemId: 'detailPanel'
            },
            {
                itemId: 'searchStorePanel',
                xtype: 'searchEventPanel',
                cls: 'p-searchField-searchStore',
                style: 'margin: 0',
                hidden: true
            },
            {
                itemId: 'filterStorePanel',
                xtype: 'filterStorePanel',
                hidden: true
            },
            {
                xtype: 'storeitemtemplatephone',
                itemId: 'storeDetails',
                flex: 5,
                styleHtmlContent: true,
                scrollable: true,
                style: 'margin-bottom: 51px'
            },
            {
                xtype: 'filterpanelstorephone',
                itemId: 'filterProductPanel',
                hidden: true,
                modal: true,
                hideOnMaskTap: true
            }
        ]
    }
});

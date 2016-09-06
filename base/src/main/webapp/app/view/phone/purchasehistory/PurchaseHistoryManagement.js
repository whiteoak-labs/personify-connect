Ext.define('Personify.view.phone.purchasehistory.PurchaseHistoryManagement', {
    extend: 'Ext.Panel',
    xtype: 'purchasehistorymanagementphone',
    controller: 'Personify.controller.phone.purchasehistory.PurchaseHistoryManagement',
    
    requires: [
        'Personify.controller.phone.purchasehistory.PurchaseHistoryManagement',
        'Personify.view.phone.purchasehistory.PurchaseHistoryList',
        'Personify.view.phone.common.Paging'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-directorymanagement',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'purchaseHistoryToolbar',
                docked: 'top',
                title: 'Purchase History'
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'fit',
                scrollable: null,
                items: [
                    {
                        xtype: 'purchasehistorylistphone',
                        itemId: 'purchaseHistoryList',
                        flex: 1
                    }
                ]
            }
        ]
    }
})
Ext.define('Personify.view.phone.purchasehistory.PurchaseHistoryTemplate', {
    extend: 'Ext.Panel',
    xtype: 'purchasehistorytemplatephone',
    
    config: {
        width: '100%',
        layout: 'hbox',
        items: [
            {
                layout: 'vbox',
                xtype: 'panel',
                items: [
                    {
                        xtype: 'label',
                        html: '<span>{[Personify.utils.ItemUtil.formatPurchaseAmount(values.totalAmount, 2)]}</span>'
                    },
                    {
                        xtype: 'label',
                        html: '{[Personify.utils.ItemUtil.formatJSONFullDate(values.orderDate)]}'
                    }
                ]
            },
            {
                flex: 1,
                cls: 'p-phone-directory-purchase-history-summary-text',
                html: '{shortName}',
                style: 'padding-left:10px'
            }
        ]
    }
});

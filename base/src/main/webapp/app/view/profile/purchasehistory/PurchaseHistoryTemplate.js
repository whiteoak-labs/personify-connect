Ext.define('Personify.view.profile.purchasehistory.PurchaseHistoryTemplate', {
    extend: 'Ext.Panel',
    xtype: 'purchasehistorytemplate',
    
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
                        html: '<span class="p-items-purchasehistory-span">{[Personify.utils.ItemUtil.formatPurchaseAmount(values.totalAmount, 2)]}</span>'
                    },
                    {
                        xtype: 'label',
                        html: '{[Personify.utils.ItemUtil.formatJSONFullDate(values.orderDate)]}'
                    }
                ]
            },
            {
                flex: 1,
                html: '{shortName}',
                style: 'padding-left:10px'
            }
        ]
    }
});

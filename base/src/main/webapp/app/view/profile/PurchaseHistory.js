Ext.define('Personify.view.profile.PurchaseHistory', {
    alias: 'widget.purchasehistory',
    extend: 'Ext.Container',
    controller: 'Personify.controller.profile.PurchaseHistory',
    
    requires: [
        'Personify.controller.profile.PurchaseHistory',
        'Personify.view.profile.purchasehistory.PurchaseHistoryTemplate'
    ],
    
    itemId: 'PurchaseHistoryView',
    
    config: {
        layout: 'vbox',
        cls: 'panel-right',
        flex: 1,
        items: [
            {
                xtype: 'label',
                cls:'profile-list-header sub-profile-list-title',
                html: 'Purchase History'
            },
            {
                flex: 1,
                layout: 'fit',
                scrollable: null,
                cls: 'p-container-purchasehistory',
                items: [
                    {
                        itemCls: 'p-container-items-purchasehistory',
                        cls: 'panel-right',
                        itemId: 'purchaseHistoryList', 
                        emptyText: 'No data',
                        pressedCls: '',
                        selectedCls: '',
                        disableSelection: true,
                        deferEmptyText: false,
                        xtype: 'dataview',
                        scrollable: true,
                        itemTpl: null
                    }
                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.purchasehistory.PurchaseHistoryTemplate');
        this.down("#purchaseHistoryList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});

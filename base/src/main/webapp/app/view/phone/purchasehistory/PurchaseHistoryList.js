Ext.define('Personify.view.phone.purchasehistory.PurchaseHistoryList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'purchasehistorylistphone',
    controller: 'Personify.controller.phone.purchasehistory.PurchaseHistoryList',
    requires: 'Personify.controller.phone.purchasehistory.PurchaseHistoryList',

    config: {
        emptyText: 'No data',
        itemCls: 'p-purchasehistoryphone-item',
        cls: 'p-phone-directory-purchase-history-nodata',
        selectedCls: '',
        pressedCls: '',
        deferEmptyText: false,
        scrollable: true,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.purchasehistory.PurchaseHistoryTemplate');
        this.setItemTpl(new Ext.XTemplate (
            template.element.dom.innerHTML));

        this.callParent(arguments);
        template.destroy();
    }
})
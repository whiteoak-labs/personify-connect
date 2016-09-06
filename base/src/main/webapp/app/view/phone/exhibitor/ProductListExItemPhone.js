Ext.define('Personify.view.phone.exhibitor.ProductListExItemPhone', {
    extend: 'Ext.dataview.List',
    xtype: 'productListExItemPhone',
    requires: 'Personify.view.phone.exhibitor.ProductItemExItemPhone',

    config: {
        baseCls: 'productListExItemPhone',
        scrollable: true,
        emptyText: '<div class = "p-emptyText-phone">No Product</div>',
        deferEmptyText: false,
        disableSelection : true,
        pressedCls: 'productListExItem-item-pressed',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.exhibitor.ProductItemExItemPhone');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
Ext.define('Personify.view.exhibitor.ProductListExItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'productListExItem',
    requires: 'Personify.view.exhibitor.ProductListItemExItem',

    config: {
        cls: 'productListExItem',
        scrollable: true,
        emptyText: '<p class = "p-presenter-emptyText">No Product</p>',
        deferEmptyText: false,
        disableSelection : true,
        pressedCls: 'productListExItem-item-pressed',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.exhibitor.ProductListItemExItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    },
    destroy: function() {
        var items = this.getViewItems();

        for (var i = 0; i < items.length; i++) {
            var item = Ext.get(items[i].id.trim());

            if (item.eventList) {
                item.eventList.destroy();
                item.eventList = null;
            }
        }

        return this.callParent(arguments);
    }

});
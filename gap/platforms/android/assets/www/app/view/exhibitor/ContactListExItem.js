Ext.define('Personify.view.exhibitor.ContactListExItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'contactListExItem',
    requires: 'Personify.view.exhibitor.ContactListItemExItem',

    config: {
        baseCls: 'contactListExItem',
        scrollable: null,
        emptyText: '<p class = "p-presenter-emptyText">No Contact</p>',
        deferEmptyText: false,
        disableSelection : true,
        pressedCls: 'productListExItem-item-pressed',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.exhibitor.ContactListItemExItem');
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
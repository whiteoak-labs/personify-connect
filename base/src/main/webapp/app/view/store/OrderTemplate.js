Ext.define('Personify.view.store.OrderTemplate', {
    xtype: 'ordertemplate',
    extend: 'Ext.dataview.DataView',
    
    config: {
        baseCls: 'order-template',
        scrollable: null,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.store.OrderShippingTemplate');
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

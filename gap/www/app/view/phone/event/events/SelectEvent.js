Ext.define('Personify.view.phone.event.events.SelectEvent', {
    extend: 'Ext.dataview.DataView',
    xtype: 'phone-selectevent',

    config: {
        scrollable: null,
        flex: 1,
        cls: 'selectedFieldButtonNews',
        itemTpl:  new Ext.XTemplate('<div class="p-filter-button-new">{[Personify.utils.ItemUtil.getSelectDateTimeValue(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString))]}</div>')
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

        if (this.getParent()) {
            return this.callParent(arguments);
        }
    }
});


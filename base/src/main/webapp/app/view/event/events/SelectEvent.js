Ext.define('Personify.view.event.events.SelectEvent', {
    extend: 'Ext.dataview.DataView',
    xtype: 'selectevent',

    config: {
        scrollable: null,
        flex: 1,
        cls: 'selectedFieldButtonNews',
        itemTpl:  new Ext.XTemplate('<div class = "p-filter-button-new">{[Personify.utils.ItemUtil.getSelectDateTimeValue(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString))]}</div>'),
        emptyText: 'No Data'
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

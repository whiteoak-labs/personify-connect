Ext.define('Personify.view.phone.schedule.schedules.SelectSchedule', {
    extend: 'Ext.dataview.DataView',
    xtype: 'phone-selectschedule',

    config: {
        scrollable: null,
        flex: 1,
        cls: 'selectedFieldButtonNews',
        deferEmptyText: false,
        emptyText: '<div class="phone-emptyText">Currently, there are no events in your schedule.<br>You may add an event by selecting an event and choosing ‘Add to My Schedule’</div>',
        itemTpl:  new Ext.XTemplate('<div class="p-filter-button-new">{[Personify.utils.ItemUtil.getSelectDateTimeValue(values.startDateTime)]}</div>')
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


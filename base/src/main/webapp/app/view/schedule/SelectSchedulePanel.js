Ext.define('Personify.view.schedule.SelectSchedulePanel', {
    extend: 'Ext.Panel',
    xtype: 'selectschedulepanel',
    controller: 'Personify.controller.schedule.SelectSchedulePanel',
    requires: [
        'Personify.controller.schedule.SelectSchedulePanel',
        'Personify.view.schedule.ScheduleMonthList'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                xtype: 'tabletschedulemonthlist',
                itemId: 'selectScheduleItem',
                scrollable: true,
                flex: 1
            }
        ]
    },

    init: function() {
    },

    setStore: function(store) {
        this.getController().setStore(store);
    },

    getStore: function() {
        return this.getController().getStore();
    }
});
Ext.define('Personify.view.phone.schedule.schedules.SelectSchedulePanel', {
    extend: 'Ext.Panel',
    xtype: 'phone-selectschedulepanel',
    controller: 'Personify.controller.phone.schedule.schedules.SelectSchedulePanel',
    requires: [
        'Personify.controller.phone.schedule.schedules.SelectSchedulePanel',
        'Personify.view.phone.schedule.schedules.SelectSchedule',
        'Personify.view.phone.schedule.schedules.ScheduleMonthList'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                xtype: 'schedulelistmonth',
                itemId: 'selectScheduleItem',
                scrollable: true,
                flex: 1
            }
        ]
    },

    setStore: function(store) {
        this.getController().setStore(store);
    },

    getStore: function() {
        return this.getController().getStore();
    }
});

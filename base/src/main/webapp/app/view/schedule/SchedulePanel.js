Ext.define('Personify.view.schedule.SchedulePanel', {
    extend: 'Ext.Container',
    xtype: 'schedulelistpanel',
    requires: [
        'Personify.controller.schedule.SchedulePanel',
        'Personify.view.schedule.ScheduleList'
    ],
    controller: 'Personify.controller.schedule.SchedulePanel',
    config: {
        layout: 'vbox',
        scrollable:true,
        items:[
            {
                xtype: 'myschedulelist',
                itemId: 'eventlisting',
                cls: 'p-panel-same-component-top'
            }
        ]
    },
    setStore: function(store){
        this.getController().setStore(store);
    },
    
    clearFilter: function(){
        this.getController().onClearFilterListevent();
    }
});
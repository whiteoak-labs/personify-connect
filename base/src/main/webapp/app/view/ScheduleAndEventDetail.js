Ext.define('Personify.view.ScheduleAndEventDetail', {
    extend: 'Ext.Container',
    xtype: 'scheduleAndEventDetailPage',
    controller: 'Personify.controller.tablet.schedule.ScheduleAndEventDetail',
    requires: [
        'Personify.controller.tablet.schedule.ScheduleAndEventDetail',
        'Personify.view.Schedule',
        'Personify.view.event.complexevent.ComplexEvent',
        'Personify.view.event.simpleEvent.SimpleEvent'
    ],
    config:{
        layout: 'card',
        items:[
            {
                xtype: 'schedulePage',
                itemId: 'eventListPage'
            },
            {
                xtype: 'complexevent',
                itemId: 'complexeventPage'
            },
            {
                xtype:'simpleEvent',
                itemId: 'simpleEventPage'
            }
        ]
    },//config
    
    initialize: function(){
        this.setMasked({xtype: 'loadmask'});
    },
    
    refresh: function(user) {
        this.getController().refreshData(user);
    }
});
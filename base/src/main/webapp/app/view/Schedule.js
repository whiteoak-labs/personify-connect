Ext.define('Personify.view.Schedule', {
    extend: 'Ext.Container',
    xtype: 'schedulePage',
    controller: 'Personify.controller.tablet.schedule.Schedule',
    requires: [
        'Personify.controller.tablet.schedule.Schedule',
        'Personify.view.event.events.FeaturedEvent',
        'Personify.view.schedule.SelectSchedulePanel',
        'Personify.view.event.addEvent.AddEvent',
        'Personify.view.event.search.SearchPanel',
        'Personify.view.event.events.SelectEventPanel',
        'Personify.view.event.calendar.CalendarPanel',
        'Personify.view.schedule.PersonalAgenda',
        'Personify.view.home.BigEvent'
    ],
    config:{
        layout: 'hbox',
        cls: 'card-complex-event',
        scrollable: null,
        items:[
            {
                flex: 1.3,
                layout: 'vbox',
                cls:'p-panel-component-left panel-left',
                items:[
                    {
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'searchEventPanel',
                                flex: 1,
                                itemId: 'searchEventPanel'
                            },
                            {
                                xtype: 'button',
                                cls: 'clearFilter',
                                itemId: 'clearFilter',
                                text: 'Clear Filters',
                                docked: 'right',
                                disabled: true,
                                disabledCls: 'p-button-disabled'
                            }
                        ]
                    },
                    {
                        xtype: 'selectschedulepanel',
                        itemId: 'selectSchedulePanel'
                    }
                ]
            },
            {
                flex: 1,
                layout: 'vbox',
                cls: 'panel-right',
                items: [
                    {
                        xtype:'calendarPanel',
                        itemId: 'calendarPanel'
                    },
                    {
                        xtype: 'button',
                        html: 'View All Events',
                        itemId: 'allEventButton',
                        cls: 'p-button-all-event'
                        
                    },
                    {
                        xtype: 'button',
                        html: 'Add a Personal Event',
                        itemId: 'personalButton',
                        cls: 'p-button-add-personal'
                    },
                    {
                        flex: 4,
                        xtype: 'bigevent',
                        itemId: 'bigEventPanel'
                    }
                ]
            }
        ]
    },//config
    
    refresh: function(user) {
        this.getController().refreshData(user);
    }
});
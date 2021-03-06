Ext.define('Personify.view.Event', {
    extend: 'Ext.Container',
    xtype: 'eventPage',
    controller: 'Personify.controller.tablet.event.Event',
    requires: [
        'Personify.controller.tablet.event.Event',
        'Personify.view.event.filter.FilterButton',
        'Personify.view.event.events.FeaturedEvent',
        'Personify.view.event.events.EventListPanel',
        'Personify.view.event.events.SelectEventPanel',
        'Personify.view.event.addEvent.AddEvent',
        'Personify.view.event.filter.FilterPanel',
        'Personify.view.event.search.SearchPanel',
        'Personify.view.event.calendar.CalendarPanel',
        'Personify.view.store.CartPanel'
    ],
    config:{
        layout: 'hbox',
        scrollable: null,
        cls: 'card-complex-event',
        items:[
            {
                flex: 1.3,
                layout: 'vbox',
                cls:'p-panel-component-left panel-left',
                items:[
                    {
                        xtype: 'searchEventPanel',
                        width: '100%',
                        itemId: 'searchEventPanel'
                    },
                    {
                        xtype: 'filterbutton',
                        itemId: 'filterButtonPanel'
                    },
                    {
                        xtype: 'selecteventpanel',
                        itemId: 'selectEventPanel'
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
                        html: 'View Only My Schedule',
                        itemId: 'allEventButton',
                        cls: 'p-button-all-schedule'
                    },
                    {
                        xtype: 'button',
                        html: 'Add a Personal Event',
                        itemId: 'personalButton',
                        cls: 'p-button-add-personal'
                    },
                    {
                        xtype: 'bigevent',
                        itemId: 'bigEventPanel',
                        flex: 4
                    }
                ]
            }
        ]
    },//config
    
    refresh: function(user) {
        this.getController().refreshData(user);
    },
           onGetUpcomingEvents: function() {           
                this.getController().onGetUpcomingEventListData();
           }
           
});
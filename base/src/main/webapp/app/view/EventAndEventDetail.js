Ext.define('Personify.view.EventAndEventDetail', {
    extend: 'Ext.Container',
    xtype: 'eventAndEventDetailPage',
    controller: 'Personify.controller.tablet.event.EventAndEventDetail',

    requires: [
        'Personify.controller.tablet.event.EventAndEventDetail',
        'Personify.view.Event',
        'Personify.view.event.complexevent.ComplexEvent',
        'Personify.view.event.simpleEvent.SimpleEvent'
    ],

    config: {
        layout: 'card',
        items:[
            {
                xtype: 'eventPage',
                itemId: 'eventListPage'
            }
        ]
    },//config

    initialize: function() {
        this.setMasked({xtype: 'loadmask'});
    },

    refresh: function(user) {
        this.getController().refreshData(user);
    }
});
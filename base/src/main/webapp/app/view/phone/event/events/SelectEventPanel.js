Ext.define('Personify.view.phone.event.events.SelectEventPanel', {
    extend: 'Ext.Panel',
    xtype: 'phone-selecteventpanel',
    controller: 'Personify.controller.phone.event.events.SelectEventPanel',
    requires: [
        'Personify.controller.phone.event.events.SelectEventPanel',
        'Personify.view.phone.event.events.SelectEvent',
        'Personify.view.phone.event.events.EventListItem',
        'Personify.view.phone.event.EventMonthList'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                //xtype: 'phone-selectevent',
                xtype: 'eventmonthlist',
                itemId: 'selectEventItem',
                scrollable: true,
                flex: 1
            },
            {
                xtype: 'phone-eventlistitem',
                itemId: 'eventListItem',
                style: 'float: left;width: 100%;',
                scrollable: true
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

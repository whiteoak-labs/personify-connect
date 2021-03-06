Ext.define('Personify.view.event.events.SelectEventPanel', {
    extend: 'Ext.Panel',
    xtype: 'selecteventpanel',
    controller: 'Personify.controller.event.events.SelectEventPanel',
    requires: [
        'Personify.controller.event.events.SelectEventPanel',
        'Personify.view.event.events.EventMonthList'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                xtype: 'tableteventmonthlist',
                itemId: 'selectEventItem',
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

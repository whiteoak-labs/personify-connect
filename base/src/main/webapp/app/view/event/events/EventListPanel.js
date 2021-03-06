Ext.define('Personify.view.event.events.EventListPanel', {
    extend: 'Ext.Container',
    xtype: 'eventlistpanel',
    requires: [
        'Personify.controller.event.events.EventListPanel',
        'Personify.view.event.events.EventList'
    ],
    controller: 'Personify.controller.event.events.EventListPanel',
    config: {
        layout: 'vbox',
        scrollable:true,
        items:[
            {
                xtype: 'schedulelist',
                itemId: 'eventlisting',
                cls: 'p-panel-same-component-top',
                flex: 1,
                scrollable: true
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
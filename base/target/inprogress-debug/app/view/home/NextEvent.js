Ext.define('Personify.view.home.NextEvent',{
    extend: 'Ext.Container',
    xtype: 'nextevent',
    requires: [
        'Personify.controller.home.NextEvent',
        'Personify.view.event.events.EventList'
    ],
    controller: 'Personify.controller.home.NextEvent',
    config: {
        layout: 'vbox',
        items: [
            {
                cls: 'p-label-title',
                html: 'Upcoming Events'
            },
            {
                 flex: 7,
                 scrollable: true,
                 xtype:'schedulelist',
                 itemId: 'nextThreeEvent'
            },
            {
                xtype: 'button',
                itemId: 'viewMoreEvent',
                cls: 'homeBtnType',
                text: 'View More Events'
            }
        ] 
    }
});

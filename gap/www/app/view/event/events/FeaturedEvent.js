Ext.define('Personify.view.event.events.FeaturedEvent', {
    extend: 'Ext.Container',
    xtype: 'featuredevents',
    config: {
        layout: 'vbox',
        cls: 'panel-right',
        items: [
            {
                cls: 'p-label-title',
                html : 'Featured Event'
            },
            {
                flex: 7,
                cls: 'p-event-featureevent'
            }
        ]
    }
});
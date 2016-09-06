Ext.define('Personify.view.ExhibitorAndDetail', {
    extend: 'Ext.Panel',
    xtype: 'exhibitorAndDetail',
    controller: 'Personify.controller.ExhibitorAndDetail',

    requires: [
        'Personify.controller.ExhibitorAndDetail',
        'Personify.view.Exhibitor',
        'Personify.view.event.map.Map',
        'Personify.view.exhibitor.DetailExhibitor'
    ],

    config: {
        layout: 'card',
        itemId: 'exhibitorAndDetail',
        meetingRecord: null,
        items: [
            {
                xtype: 'exhibitor',
                itemId: 'exhibitorlistPanel'
            },
            {
                xtype: 'detailExhibitor',
                itemId: 'exhibitorDetailPanel'
            },
            {
                xtype: 'mapevent',
                itemId: 'mapExhibitorPanel'
            }
        ] 
    } // end config
});
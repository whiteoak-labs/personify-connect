Ext.define('Personify.view.event.moreInfo.MoreInforFooter', {
    extend: 'Ext.Container',
    xtype: 'moreInfoFooter',
    config: {
        layout: 'hbox',
        items: [
            {
               xtype:'button',
               text: 'Enter This Meeting',
               itemId: 'enterThisMeeting',
               cls:'buttonMoreinfoPanel',
               docked:'top'
            },
            {
                cls:'advanted1',
                height: 100,
                flex :1
            },
            {
                cls:'advanted2',
                height: 100,
                flex :1
            }
        ]
    }
});
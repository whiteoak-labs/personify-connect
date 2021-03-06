Ext.define('Personify.view.phone.news.DetailPanel', {
    extend: 'Ext.Container',
    xtype: 'detailPanel',
    controller: 'Personify.controller.phone.news.DetailPanel',
    requires: 'Personify.controller.phone.news.DetailPanel',

    config: {
        layout: 'hbox',
        items: [
            {
                xtype: 'panel',
                flex: 1,
                items: [
                    {
                        xtype: 'button',
                        text: 'Share',
                        cls: 'btnShare-detail-panel-New-phone',
                        itemId: 'shareNewsButton'
                    }
                ]
            },
            {
                flex: 2,
                style: 'padding-left:10px;',
                items: [
                    {
                        itemId: 'sourceDetailPanelPhone'
                    },
                    {
                        itemId: 'publicDetailPanelPhone'
                    }
                ]
            }
        ]
    }
});

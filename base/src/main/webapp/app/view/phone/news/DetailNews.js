Ext.define('Personify.view.phone.news.DetailNews', {
    extend: 'Ext.Container',
    xtype: 'detailNews',
    controller: 'Personify.controller.phone.news.DetailNews',
    requires: [
        'Personify.controller.phone.news.DetailNews',
        'Personify.view.phone.news.ContentPanelNews',
        'Personify.view.phone.news.DetailPanel',
        'Personify.view.phone.news.NewsPage'
    ],
    
    config: {
        layout: 'vbox',
        flex: 1,
        newsRecord: null,
        feedRecord: null,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'newsToolbar',
                title: 'News Detail'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                flex: 1,
                style: 'margin-bottom: 48px; color: black',
                items: [
                    {
                        cls: 'contentPanelNewsPhone',
                        selectedCls: '',
                        pressedCls: '',
                        itemId: 'contentPanelNews',
                        xtype: 'newsPagePhone',
                        scrollable: true,
                        flex: 5,
                        styleHtmlContent: true
                    },
                    {
                        xtype: 'detailPanel',
                        itemId: 'detailPanel',
                        docked: 'bottom',
                        cls:'p-phone-panel-detailnews'
                    }
                ]
            }
        ]
    }
});

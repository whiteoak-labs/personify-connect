Ext.define('Personify.view.home.LastNew',{
    extend: 'Ext.Container',
    xtype: 'lastnew',
    controller: 'Personify.controller.home.LastNew',
    requires: [
        'Personify.controller.home.LastNew',
        'Personify.view.news.NewsPage',
        'Personify.view.news.NewsPageContent'
    ],
    config: {
        layout: 'vbox',
        items:[
            {
                cls: 'p-label-title',
                html: 'Latest News from Personify360 Connect'
            },
            {
                layout: 'vbox',
                flex: 1,
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                baseCls: 'contentPanelNews',
                items: [
                    {
                        xtype: 'newspage',
                        itemId: 'lastNewsTitle'
                    },
                    {
                        xtype: 'newspagecontent',
                        itemId: 'lastNewsContent'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'viewMoreNews',
                baseCls: 'homeBtnType',
                text: 'View More News'
            }
        ]
    }
});

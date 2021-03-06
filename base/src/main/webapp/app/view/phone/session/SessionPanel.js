Ext.define('Personify.view.phone.session.SessionPanel', {
    extend: 'Ext.Container',
    xtype:'sessionpanelphone',
    controller: 'Personify.controller.phone.session.SessionPanel',
    
    requires: [
        'Personify.controller.phone.session.SessionPanel',
        'Personify.view.phone.session.MySessionPanel',
        'Personify.view.phone.session.AllSessionPanel'
    ],
    
    config: {
        layout:'vbox',
        items: [
            {
                xtype: 'ptoolbar',
                title: 'All Sessions',
                itemId: 'eventToolbar'
            },
            {
                layout: 'card',
                flex: 1,
                itemId: 'cardSession',
                items:[
                    {
                        flex: 1,
                        xtype: 'allsessionpanelphone',
                        itemId: 'allSessionPanel'
                    },
                    {
                        flex: 1,
                        xtype: 'mysessionpanelphone',
                        itemId: 'mySessionPanel'
                    }
                ]
            }
        ]
    }
});
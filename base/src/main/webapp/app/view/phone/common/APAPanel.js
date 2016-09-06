Ext.define('Personify.view.phone.common.APAPanel', {
    extend: 'Ext.Panel',
    xtype: 'apaPanel',
    controller: 'Personify.controller.phone.common.APAPanel',
    requires: [
        'Personify.controller.phone.common.APAPanel',
        'Personify.view.phone.common.Toolbar'
    ],
    config: {
        layout: 'vbox',
        items: [
            {
                layout: 'hbox',
                cls: 'p-phone-panel-header',
                items: [
                    {
                        itemId:'backToMainView',
                        xtype: 'button',
                        cls: 'p-phone-home-button'
                    },
                    {
                        html: 'APA Annual Conference and Networking Event',
                        cls: 'p-phone-label-title'
                    }
                ]
            },
            {
                xtype : 'ptoolbar',
                title: 'Member Detail',
                itemId: 'toolbarPhone'
            }
        ]
    }//end config
});
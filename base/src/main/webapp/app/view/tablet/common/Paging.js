Ext.define('Personify.view.tablet.common.Paging', {
    extend: 'Ext.Panel',
    xtype: 'pagingpanel',
    controller: 'Personify.controller.tablet.common.Paging',
    requires: 'Personify.controller.tablet.common.Paging',

    config: {
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'center'
        },
        items: [
            {
                xtype: 'button',
                itemId: 'nextButton',
                text: 'View More',
                baseCls: 'p-button-paging',
                centerd: true
            }
        ]
    }
})
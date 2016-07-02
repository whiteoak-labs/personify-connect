Ext.define('Personify.view.phone.common.Paging', {
    extend: 'Ext.Panel',
    xtype: 'pagingpanelphone',
    controller: 'Personify.controller.phone.common.Paging',
    requires: 'Personify.controller.phone.common.Paging',

    config: {
        xtype: 'panel',
        cls:'p-phone-button-loadingmore',
        layout: {
                    type: 'hbox',
                    pack: 'center',
                    align:'center'
                },
        items: [
            {
                itemId: 'panelPaging',
                items: [
                    {
                        flex: 1,
                        cls: 'p-phone-button-more',
                        xtype: 'button',
                        itemId: 'nextButton',
                        text: 'View more',
                        pressedCls: 'p-phone-button-blue-pressing'
                    }
                ]
            }
        ]
    }
})
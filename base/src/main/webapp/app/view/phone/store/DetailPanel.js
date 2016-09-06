Ext.define('Personify.view.phone.store.DetailPanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.DetailPanel',
    requires: 'Personify.controller.phone.store.DetailPanel',
    xtype: 'detailpanelproductphone',

    config: {
        cls: 'p-phone-container-storetotalallproductandfilterbutton, p-phone-store-background-toolbar',
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [
            {
                docked: 'left',
                xtype: 'button',
                text: 'Search',
                itemId: 'searchProduct',
                cls: 'p-phone-button-store-filter',
                pressedCls: 'p-phone-button-store-filter-press',
                style: 'margin-left: 17px'
            },
            {
                docked: 'right',
                xtype: 'button',
                text: 'Filter',
                itemId: 'filterProduct',
                cls: 'p-phone-button-store-filter',
                pressedCls: 'p-phone-button-store-filter-press',
                style: 'margin-right: 17px'
            }
        ]
    }
});

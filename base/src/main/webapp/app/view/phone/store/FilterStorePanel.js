Ext.define('Personify.view.phone.store.FilterStorePanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.FilterStorePanel',
    requires: 'Personify.controller.phone.store.FilterStorePanel',
    xtype: 'filterStorePanel',

    config: {
        cls: 'p-phone-container-storetotalallproductandfilterbutton',
        style: 'padding: 4px 0 0',
        xtype: 'container',
        layout: {
            type: 'hbox'
        },
        items: [
            {
                docked: 'left',
                html: '',
                style: 'color: black; padding: 9px; font-weight: bold',
                itemId: 'labelSortByValue'
            },
            {
                docked: 'right',
                xtype: 'button',
                text: 'Clear',
                cls: 'p-phone-button-storeclearfilter',
                pressedCls: 'p-phone-button-red-pressing',
                itemId: 'clearFilter',
                style: 'float: right; margin: 0 10px 8px 0'
            }
        ]
    }
});

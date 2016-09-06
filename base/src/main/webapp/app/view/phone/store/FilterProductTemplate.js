Ext.define('Personify.view.phone.store.FilterProductTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'filterproductphone',

    config: {
        scrollable: null,
        cls: 'p-phone-filterproductphone',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        itemTpl: new Ext.XTemplate(
            '<div class="p-filter-product">{text}</div>'
        )
    }
});

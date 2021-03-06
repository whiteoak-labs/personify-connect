Ext.define('Personify.view.exhibitor.ProductListItemExItem', {
    extend: 'Ext.Panel',

    config: {
        layout: 'hbox',
        items: [
            {
                xtype: 'label',
                html: '.',
                cls: 'label-dot-relatedProductItem'
            },
            {
                html: '<p>{brandName}: {description}</p>'
            }
        ]
    }
});
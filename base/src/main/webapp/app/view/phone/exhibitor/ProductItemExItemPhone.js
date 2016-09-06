Ext.define('Personify.view.phone.exhibitor.ProductItemExItemPhone', {
    extend: 'Ext.Panel',

    config: {
        layout: 'hbox',
        flex: 1,
        items: [
            {
                xtype: 'label',
                html: '.',
                cls: 'label-dot-relatedProductItem'
            },
            {
                padding: '0px 10px 0px 0px',
                html: '<p>{brandName}: {description}</p>'
            }
        ]
    }
});
Ext.define('Personify.view.store.ShippingAddressTemplate', {
    extend: 'Ext.Container',
    xtype: 'shippingAddress',
    
    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                html: '{streetAddress}, {locality}, {region}, {postalCode}, {country} '
            }
        ]
    }
});

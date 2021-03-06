Ext.define('Personify.view.phone.directory.contactinfo.AddressItem', {
   extend: 'Ext.Panel',
    xtype: 'addressitemphone',
    config: {
        layout: 'hbox',
        flex: 1,
        items: [
            {
                xtype: 'label',
                html: '{typeDesc}',
                cls: 'p-phone-label-text',
                flex: 2
            },
            {
                layout: 'vbox',
                cls: 'p-phone-label-valueText',
                flex: 8,
                items: [
                    {
                        items: [
                            {
                            html: '{streetAddress}',
                            cls: 'p-phone-label-address'
                            },
                            {
                                html: '{address2}',
                                cls: 'p-phone-label-address'
                            },
                            {
                                html: '{address3}',
                                cls: 'p-phone-label-address'
                            },
                            {
                                html: '{address4}',
                                cls: 'p-phone-label-address'
                            },
                            {
                                cls: 'p-phone-label-address',
                                html: '{locality}, {region} {postalCode}'
                            },
                            {
                                html: '{countryDesc}',
                                cls: 'p-phone-label-address'
                            }
                        ]
                    },
                    {
                        html: '{[this.isPrimaryString(values.primary)]}',
                        docked: 'right'
                    }
                ]
            }
        ]
        
    }
});

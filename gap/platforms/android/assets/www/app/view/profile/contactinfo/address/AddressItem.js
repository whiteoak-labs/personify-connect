Ext.define('Personify.view.profile.contactinfo.address.AddressItem', {
   extend: 'Ext.Panel',
    xtype: 'addressitem',
    config: {
        layout: 'hbox',
        flex: 1,
        items: [
            {
                xtype: 'label',
                html: '{type}',
                cls: 'type',
                flex:2
            },
            {
                layout: 'vbox',
                flex:6,
                cls: 'p-label-contactinfovalueText',
                items: [
                    {
                        html: '{streetAddress}'
                    },
                    {
                        html: '{address2}'
                    },
                    {
                        html: '{address3}'
                    },
                    {
                        html: '{address4}'
                    },
                    {
                        html: '{locality}, {region} {postalCode}'
                    },
                    {
                        html: '{country}'
                    }
                ]
            },
            {
                flex: 1,
                html: '{[this.isPrimaryString(values.primary)]}',
                cls: 'p-div-profile-address-main',
            }
        ]
        
    }
});

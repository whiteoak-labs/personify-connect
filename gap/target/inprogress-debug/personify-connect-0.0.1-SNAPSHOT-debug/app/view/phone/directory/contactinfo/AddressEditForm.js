Ext.define('Personify.view.phone.directory.contactinfo.AddressEditForm', {
    extend: 'Ext.Panel',
    xtype: 'addresseditformphone',
    controller: 'Personify.controller.phone.directory.contactinfo.AddressEditForm',
    requires: 'Personify.controller.phone.directory.contactinfo.AddressEditForm',

    config: {
        stateDictionary: {},
        scrollable: null,
        store: null,
        record: null,
        typeListAd: null,
        layout: 'hbox',
        cls:'p-phone-fieldset-directory-editform',
        items: [
            {
                xtype: 'container',
                flex: 5,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        items: [
                            {
                                layout: 'hbox',
                                flex: 1,
                                items: [
                                    {
                                        xtype: 'container',
                                        items:[
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'checkBoxPrimary',
                                                label: 'Primary',
                                                checked: false,
                                                disabled: true,
                                                hidden: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        style: 'width: 100%',
                                        items:[
                                            {
                                                xtype: 'selectfield',
                                                cls:'p-phone-field-directory-editform',
                                                itemId: 'typeList',
                                                label: 'Type',
                                                autoCapitalize: true
                                            }
                                        ]
                                    }
                                ] // end items
                            },
                            {
                                xtype: 'textfield',
                                cls:'p-phone-field-directory-editform',
                                itemId: 'txtFieldStreetAd',
                                label: 'Street Address:'
                            },
                            {
                                xtype: 'textfield',
                                cls:'p-phone-field-directory-editform',
                                itemId: 'txtFieldAd2',
                                label: 'Address 2:'
                            },
                            {
                                xtype: 'textfield',
                                cls:'p-phone-field-directory-editform',
                                itemId: 'txtFieldAd3',
                                label: 'Address 3:'
                            },
                            {
                                xtype: 'textfield',
                                cls:'p-phone-field-directory-editform',
                                itemId: 'txtFieldAd4',
                                label: 'Address 4:'
                            },
                                {
                                       xtype: 'selectfield',
                                       cls:'p-phone-field-directory-editform',
                                       itemId: 'regionList',
                                       autoSelect: false,
                                       store: null,
                                       label: 'State/Province:'
                                },

                                       {
                                       xtype: 'textfield',
                                       cls:'p-phone-field-directory-editform',
                                       itemId: 'txtLocalityAd',
                                       label: 'City:'
                                },
                                {
                                        xtype: 'selectfield',
                                       cls:'p-phone-field-directory-editform',
                                       itemId: 'countryList',
                                       store: null,
                                       label: 'Country:'
                                },
                                {
                                       xtype: 'textfield',
                                       cls:'p-phone-field-directory-editform',
                                       itemId: 'txtFieldPostalCodeAd',
                                       label: 'Zip/Postal Code:'
                                }
                        ] // end items of panelTopEditAddressDirectory
                    }
                ] // end items of panelRightEditAdForm
            },
            {
                xtype: 'container',
                width: 38,
                layout:{
                    type: 'vbox',
                    align: 'end'
                },
                items: [
                    {
                        xtype: 'button',
                        cls:'p-phone-button-directory-editform-delete',
                        pressedCls: 'p-phone-button-directory-editform-delete-pressing',
                        itemId: 'deleteButtonAd',
                        hidden: true
                    },
                    {
                        itemId: 'primaryCheckBox',
                        html: 'Main',
                        cls:'p-phone-editform-main',
                        hidden: true
                    }
                ]
            }
        ] // end items address edit form
    }, // end config

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
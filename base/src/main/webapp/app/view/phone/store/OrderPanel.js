Ext.define('Personify.view.phone.store.OrderPanel', {
    extend: 'Ext.Container',
    requires: [
        'Personify.controller.phone.store.OrderPanel',
        'Personify.view.store.OrderTemplate',
        'Personify.view.store.OrderShippingTemplate',
        'Personify.view.store.ShippingAddressTemplate'
    ],
    controller: 'Personify.controller.phone.store.OrderPanel',

    config: {
        cls: 'p-phone-container-orderpanel',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        laytout: 'vbox',
        items: [
            {
                xtype: 'label',
                cls: 'title-logout-phone',
                html: 'Your Order'
            },
            {
                xtype: 'image',
                cls: 'btn-close-content-panel-logout-phone',
                itemId: 'closeorderForm'
            },
            {
                xtype: 'panel',
                cls: 'p-phone-panel-informationorderpanel',
                items: [
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                html: 'Choose Shipping Address:',
                                cls: 'p-phone-label-shippingaddress'
                            },
                            {
                                xtype: 'list',
                                itemId: 'shippingAddress',
                                cls: 'shipping-address-list',
                                itemCls: 'p-itemlist-shippingaddress',
                                itemHeight: 30,
                                itemTpl: null
                            },
                            {
                                xtype: 'ordertemplate',
                                itemId: 'orderTemplate',
                                scrollable: null
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        layout:{
                            type: 'hbox',
                            pack: 'center',
                            align: 'end'
                        },
                        cls: 'p-phone-container-buttonorderpanel',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-cancelorderpanel',
                                pressedCls: 'p-phone-button-gray-pressing',
                                text: 'Cancel',
                                itemId: 'btnCancel'
                            },
                            {
                                xtype: 'button',
                                cls: 'p-phone-button-confirmorderpanel',
                                pressedCls: 'p-phone-button-red-pressing',
                                text: 'Confirm',
                                itemId: 'btncheckout'
                            }
                        ]
                    }

                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.store.ShippingAddressTemplate');
        this.down("#shippingAddress").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));

        this.callParent(arguments);
        template.destroy();
    },

    hide: function() {
        this.destroy();
    }
});

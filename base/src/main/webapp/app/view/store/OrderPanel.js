Ext.define('Personify.view.store.OrderPanel', {
    extend: 'Ext.Container',
    requires: [
        'Personify.controller.store.OrderPanel',
        'Personify.view.store.OrderTemplate'
    ],
    controller: 'Personify.controller.store.OrderPanel',
    
    config: {
        cls: 'order-panel',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        laytout: 'vbox',
        items: [
            {
                xtype: 'label',
                cls: 'title-logout',
                html: 'Your Order'
            },
            {
                xtype: 'image',
                cls: 'btn-close-content-panel-logout',
                itemId: 'closeorderForm'
            },
            {
                xtype: 'panel',
                cls: 'content-order-panel',
                items: [
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                html: 'Choose Shipping Address:',
                                cls: 'shipping-address-label'
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
                                itemId: 'orderTemplate'
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        layout:{
                            type: 'hbox',
                            pack: 'center',
                            align: 'center'
                        },
                        cls: 'p-container-button-orderpanel',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'p-button-notificationcancel',
                                pressedCls: 'p-button-notificationcancel-pressing',
                                text: 'Cancel',
                                itemId: 'btnCancel'
                            },
                            {
                                xtype: 'button',
                                cls: 'p-button-notificationdelete',
                                pressedCls: 'p-button-notificationdelete-pressing',
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

Ext.define('Personify.view.phone.store.BackOrderPanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.BackOrderPanel',
    requires: 'Personify.controller.phone.store.BackOrderPanel',

    config: {
        cls: 'p-phone-container-orderpanel',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        items: [
            {
                xtype: 'label',
                cls: 'title-logout-phone',
                html: 'Alert'
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
                        xtype: 'label',
                        html: 'Product is out of stock. Do you want to back order the product?',
                        cls: 'label-product-out-of-stock-phone'
                    },
                    {
                       xtype:'container',
                       layout:{
                           type: 'hbox',
                           align: 'center',
                           pack: 'end'
                       },
                       cls: 'p-phone-container-buttonorderpanel',
                       style: 'margin-top: 10px;',
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
                               text: 'Buy Now',
                               itemId: 'btncheckout'
                           }
                       ]
                   }
                ]
            }
        ]
    },

    hide: function() {
        this.destroy();
    }
});

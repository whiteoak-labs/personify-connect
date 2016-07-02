Ext.define('Personify.view.store.BackOrderPanel', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.store.BackOrderPanel',
    requires: 'Personify.controller.store.BackOrderPanel',

    config: {
        cls: 'back-order-panel',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        items: [
            {
                xtype: 'label',
                cls: 'title-logout',
                html: 'Alert'
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
                        xtype: 'label',
                        html: 'Product is out of stock. Do you want to back order the product?',
                        cls: 'label-product-out-of-stock'
                    },
                    {
                       xtype:'container',
                       layout:{
                           type: 'hbox',
                           align: 'center',
                           pack: 'end'
                       },
                       cls: 'p-container-button-notification',
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

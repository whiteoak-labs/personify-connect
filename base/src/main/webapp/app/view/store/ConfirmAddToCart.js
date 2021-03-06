Ext.define('Personify.view.store.ConfirmAddToCart', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.store.ConfirmAddToCart',
    requires: 'Personify.controller.store.ConfirmAddToCart',
    xtype: 'confirmaddtocart',

   config: {
       cls: 'logout-container-cart',
       centered: true,
       modal: true,
       items: [
           {
               xtype: 'label',
               cls: 'title-logout',
               html: 'Add To Cart'
           },
           {
               xtype: 'image',
               cls: 'btn-close-content-panel-logout',
               itemId: 'closeLogoutForm'
           },
           {
               xtype: 'panel',
               layout:{
                   type: 'vbox',
                   align:'center',
                   pack: 'center'
               },
               cls: 'content-panel-logout',
               items: [
                   {
                       xtype: 'label',
                       html: 'The item has successfully been added to your shopping cart',
                       cls: 'label-content-panel-logout'
                   },
                   {
                       xtype:'container',
                       layout:'hbox',
                       cls: 'p-container-button-notification',
                       items:[
                           {
                               xtype: 'button',
                               cls: 'p-button-cartdelete',
                               pressedCls: 'p-button-cartdelete-pressing',
                               text: 'Continue Shopping',
                               itemId: 'cancelButton'
                           },
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationcancel',
                               pressedCls: 'p-button-notificationcancel-pressing',
                               text: 'Checkout',
                               itemId: 'checkoutButton',
                               style: 'margin-top: 7px;'
                           }
                       ]
                   }
               ]
           }
       ]
   }
});

Ext.define('Personify.view.phone.store.ConfirmAddToCart', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.ConfirmAddToCart',
    requires: 'Personify.controller.phone.store.ConfirmAddToCart',
    xtype: 'confirmaddtocartphone',

   config: {
       cls: 'logout-container',
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
                       layout:'vbox',
                       cls: 'p-container-button-notification',
                       items:[
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationdelete',
                               pressedCls: 'p-button-notificationdelete-pressing',
                               text: 'Continue Shopping',
                               itemId: 'cancelButton',
                               style: 'width: 250px; margin-bottom: 10px;'
                           },
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationcancel',
                               pressedCls: 'p-button-notificationcancel-pressing',
                               text: 'Checkout',
                               itemId: 'checkoutButton',
                               style: 'width: 250px'
                           }
                       ]
                   }
               ]
           }
       ]
   }
});

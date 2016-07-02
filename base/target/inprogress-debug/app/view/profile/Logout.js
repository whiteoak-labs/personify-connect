Ext.define('Personify.view.profile.Logout', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.profile.Logout',
    requires: 'Personify.controller.profile.Logout',
    xtype: 'logout',

   config: {
       cls: 'logout-container',
       items: [
           {
               xtype: 'label',
               cls: 'title-logout',
               html: 'Logout'
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
                       html: 'Are you sure you want to logout?',
                       cls: 'label-content-panel-logout'
                   },
                   {
                       xtype:'container',
                       layout:'hbox',
                       cls: 'p-container-button-notification',
                       items:[
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationdelete',
                               pressedCls: 'p-button-notificationdelete-pressing',
                               text: 'No',
                               itemId: 'btnCancel'
                           },
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationcancel',
                               pressedCls: 'p-button-notificationcancel-pressing',
                               text: 'Yes',
                               itemId: 'btnLogout'
                           }
                       ]
                   }
               ]
           }
       ]
   }
});

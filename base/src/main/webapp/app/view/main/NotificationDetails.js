Ext.define('Personify.view.main.NotificationDetails', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.main.NotificationDetails',
    xtype: 'notificationdetails',
    requires: [
        'Personify.controller.main.NotificationDetails',
        'Personify.view.main.NotificationDetailsTemplate'
    ],

   config: {
       cls: 'notification-detail',
       record: null,
       viewParent: null,
       centered: true,
       modal: true,
       layout: 'vbox',
       items: [
           {
               layout: 'hbox',
               cls: 'filterClosePanel filterTopTitle',
               items:[
                   {
                       xtype: 'label',
                       cls: 'title-logout',
                       html: 'Notification Details'
                   },
                   {
                       xtype: 'button',
                       docked: 'right',
                       cls: 'p-close-button',
                       margin: '7px 5px',
                       text: 'X',
                       top: 0,
                       right: 0,
                       itemId: 'closeLogoutForm'
                  }
               ]
           },
           
           {
               xtype: 'panel',
               cls: 'content-panel-logout',
               items: [
                   {
                       xtype: 'notificationdetailstemplate',
                       itemId: 'notificationDetailsTemplate',
                       padding: 20
                   },
                   {
                       layout: {
                            type: 'hbox',
                            align: 'center',
                            pack: 'center'
                        },
                       items:[
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationdelete',
                               pressedCls: 'p-button-notificationdelete-pressing',
                               text: 'Delete',
                               itemId: 'btnDelete'
                           },
                           {
                               xtype: 'button',
                               cls: 'p-button-notificationcancel',
                               pressedCls: 'p-button-notificationcancel-pressing',
                               text: 'Cancel',
                               itemId: 'btnCancel'
                           }
                       ]
                   }
               ]
           }
       ]
   }
});

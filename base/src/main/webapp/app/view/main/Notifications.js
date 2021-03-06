Ext.define('Personify.view.main.Notifications', {
    extend: 'Ext.Container',
    xtype: 'notificationview',
    requires: [
        'Personify.controller.main.Notifications',
        'Personify.view.main.NotificationList'
    ],
    controller: 'Personify.controller.main.Notifications',
    config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: true,
        right: 0, 
        top: 50,
        zIndex: 9,
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items:[
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        xtype: 'label',
                        html: 'Notifications',
                        cls: 'title-label-notification'
                    },
                    {
                        xtype: 'label',
                        itemId: 'lblNumberNoti',
                        html: '0',
                        cls: 'number-label-notification'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.fireEvent('closenotification');
                                this.parent.parent.destroy();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'notificationtemplate',
                itemId: 'notification',
                flex: 1
            }
        ]
     },
     
     
     hide: function() {
         this.getController().disableNotificationButton(false);
         this.destroy();
     }
});

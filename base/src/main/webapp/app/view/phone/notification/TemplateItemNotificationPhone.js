Ext.define('Personify.view.phone.notification.TemplateItemNotificationPhone', {
    extend: 'Ext.Container',
    xtype: 'templateItemNotificationPhone',
    
    config: {
        layout: 'vbox',
        items: [
            {
                itemId: 'dateTemplateItemNotificationPhone',
                cls: 'date-templateItemNotificationPhone'
            },
            {
                itemId: 'titleTemplateItemNotificationPhone',
                cls: 'title-templateItemNotificationPhone'
            },
            {
                itemId: 'descTemplateItemNotificationPhone',
                cls: 'desc-templateItemNotificationPhone'
            },
            {
                xtype: 'panel',
                height: 40,
                items: [
                    {
                        itemId: 'linkTemplateItemNotificationPhone',
                        cls: 'link-templateItemNotificationPhone',
                        docked: 'left',
                        listeners: {
                            initialize: function(panel) {
                                panel.element.on('tap', function() {
                                    panel.fireEvent('gotomyorder');
                                });
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Delete',
                        width: 80,
                        cls: 'btn-templateItemNotificationPhone',
                        itemId: 'btnTemplateItemNotificationPhone',
                        docked: 'right'
                    }
                ]
            }
        ]
    }
});

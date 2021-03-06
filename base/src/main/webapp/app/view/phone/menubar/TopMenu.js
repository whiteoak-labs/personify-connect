Ext.define('Personify.view.phone.menubar.TopMenu', {
    extend: 'Ext.Container',
    xtype: 'topmenubarphone',
    controller: 'Personify.controller.phone.menubar.TopMenu',
    requires: 'Personify.controller.phone.menubar.TopMenu',
    config: {
        type: 'panel',
        layout: {
            type: 'hbox'
        },
        cls: 'menubarPanelTop',
        items: [
            {
                layout: {
                    type:'hbox',
                    align:'center'
                },
                docked: 'left',
                items: [
                    {
                        itemId: 'infoButtonOnPhoneMenu',
                        xtype: 'button',
                        cls: 'p-menu-info-button-phone',
                        pressedCls: '',
                        hidden: true
                    }
                ]
            },
            {
                xtype: 'container',
                layout:{
                    type: 'hbox',
                    pack: 'center',
                    align: 'center'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'button',
                        itemId: 'buttonShoppingCartPhone',
                        html: '0',
                        cls: 'p-phone-button-storeshoppingcart',
                        pressedCls: 'p-phone-button-red-pressing',
                        disabled: false
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 2,
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'menubarButton',
                        centered: 'true',
                        width: 50,
                        height: 40,
                        cls: 'menubarButton',
                        pressedCls: 'menubarButtonPressed'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    pack: 'center',
                    align: 'center'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'button',
                        itemId: 'buttonNotificationPhone',
                        cls: 'p-phone-button-notification',
                        html: '0',
                        disabled: false
                    }
                ]
            }
        ]
    }
});

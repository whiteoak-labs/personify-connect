Ext.define('Personify.view.main.TopMenu', {
    extend: 'Ext.Container',
    xtype: 'topmenubar',
    controller: 'Personify.controller.main.TopMenu',
    requires: [
        'Personify.controller.main.TopMenu',
        'Ext.Img'
    ],

    config: {
        type: 'panel',
        layout: 'hbox',
        cls: 'menubarPanelTop',
        items: [
            {
                xtype: 'container',
                layout:{
                    type: 'hbox',
                    pack: 'center',
                    align: 'center'
                },
                cls: 'cartDisplay',
                flex: 1,
                items: [
                    {
                        xtype: 'label',
                        cls: 'totalItemCheckout',
                        itemId: 'totalItemCheckout',
                        html: '0'
                    },
                    {
                        xtype: 'image',
                        cls: 'cartItemCheckout',
                        itemId: 'cartItemCheckout'
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
                        itemId: 'notificationButton',
                        cls: 'notificationButtonOnMenuBar', 
                        text: '0'
                    }
                ]
            }
        ]
    }
})
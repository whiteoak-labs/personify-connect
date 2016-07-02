Ext.define('Personify.view.store.CartPanel', {
    extend: 'Ext.Container',
    xtype: 'cartpanel',
    controller: 'Personify.controller.store.CartPanel',
    requires: [
        'Personify.controller.store.CartPanel',
        'Personify.view.store.CartPanelTemplate',
        'Personify.view.store.LoginCartItem'
    ],
    config: {
        cls: 'cart-panel-template panel-left',
        xtype: 'panel',        
        modal: true,
        hideOnMaskTap: true,
        zIndex: 11,
        right: 0,
        top: 50,
        hidden: true,
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items:[
            {
                cls: 'filterClosePanel',
                layout: 'hbox',
                docked: 'top',
                items: [
                    {
                        html: 'Cart'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        listeners: {
                            tap: function() {
                                this.parent.parent.hide();
                            }
                        }
                    }
                ]
            },//closePanel 
            {
                layout:'hbox',
                style: 'margin-bottom:10px',
                items: [
                    {
                        html: '0',
                        cls: 'totalItemCheckout',
                        itemId: 'totalItemCheckoutCartPanel'
                    },
                    {
                        xtype: 'image',
                        cls: 'cartItemCheckoutCartPanel',
                        itemId: 'cartItemCheckoutCartPanel'
                    },
                    {
                        html: 'My cart',
                        cls: 'my-cart-panel'
                    }
                ]
            },
            {
                xtype: 'cartpaneltemplate',
                itemId: 'cartPanelTemplate',
                flex: 1
            },
            {	
            	height: 110,
                xtype: 'loginCartItem',
                cls: 'login-cart-item'
            }
        ]
     },
     
    hide: function() {
        this.destroy();
    }
});

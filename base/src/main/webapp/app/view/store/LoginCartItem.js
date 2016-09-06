Ext.define('Personify.view.store.LoginCartItem', {
    extend: 'Ext.Panel',
    xtype: 'loginCartItem',
    //controller: 'Personify.controller.store.CartPanel',
    
    config: {
        layout: 'vbox',
        scrollable: false,
        items: [
            /*{
                flex: 1,
                layout: 'hbox',
//                cls: 'login-cart-item',
                items: [
                    {
                        flex: 4,
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                cls: 'title-login-cart',
                                html: 'Have an online account? Log in here'
                            },
                            {
//                                itemId: 'usernameTextfield',
                                xtype: 'textfield',
                                flex: 1,
                                autoCapitalize: false,
                                baseCls:'username-text-field-login-cart',
                                placeHolder:'Username'
                            },
                            {
//                                itemId: 'passwordTextfield',
                                xtype: 'passwordfield',
                                flex: 1,
                                baseCls:'password-text-field-login-cart',
                                placeHolder:'Password'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        cls: 'btn-login-cart-item',
                        flex: 1,
                        text: 'Login'
                    }
                ]
            },*/
            {
                items: [
                    /*{
                        html: '<div align="center" class="or-take-to-website">-or-</div>',
                        flex: 1
                    },*/
                    {
                        xtype: 'button',
                        cls: 'take-to-website-checkout',
                        text: 'Take me to the website to Checkout',
                        itemId: 'checkoutWebsite'
                    },
                    {
                        cls: 'or-call-us',
                        itemId: 'callUsNumber'
                    }
                ]
            }
        ]
    }
});

Ext.define('Personify.view.Login', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.Login',
    xtype: 'login',
    
    requires: [
        'Personify.controller.Login',
        'Personify.view.LoginForm'
    ],
    
    config: {
        itemId: 'loginPanel',
        cls: 'login-container',
        items: [
            {
                itemId:'loginForm',
                xtype:'loginform',
                top: 0,
                left: 0,
                hidden: true,
                modal: true,
                hideOnMaskTap: true
            },
            {
                xtype:'container',
                itemId:'loginstatus',
                items:[
                    {
                        itemId:'loginButton',
                        xtype:'button',
                        docked:'right',
                        cls:'login-button-status',
                        pressedCls: 'p-button-pressing-opacity',
                        text:'Login'
                    },
                    {
                        itemId:'profileButton',
                        xtype:'button',
                        docked:'right',
                        cls:'profile-button-status',
                        pressedCls: 'p-button-pressing-opacity',
                        text:'Profile',
                        hidden: true
                    }
                ]
            }
        ]
    }
});

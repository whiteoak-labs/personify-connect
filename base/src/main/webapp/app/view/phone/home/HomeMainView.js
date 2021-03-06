Ext.define("Personify.view.phone.home.HomeMainView", {
    extend: 'Ext.Container',
    xtype: 'homemainview',
    controller: 'Personify.controller.phone.home.HomeMainView',
    requires: [
        'Personify.controller.phone.home.HomeMainView',
        'Personify.view.phone.home.MenuList'
    ],

    config: {
        layout: 'vbox',
        itemId: 'homeMainView',
        cls: 'p-home-main-phone',
        loginButtonHidden: false,
        items: [
            {
                itemId: 'hiLabel',
                xtype: 'label',
                cls: 'hi-label',
                html: '',
                hidden:true
            },
            {
                flex: 1,
                itemId: 'menuList',
                xtype: 'menulist'
            },
            {
                layout:{
                    type:'vbox',
                    align:'center'
                },
                items:[
                    {
                        itemId: 'logInButton',
                        xtype: 'button',
                        width: '80%',
                        cls: 'button-login-phone',
                        text: 'Login',
                        hidden: false
                    }
                ]
            }
        ]
    },
    
    initialize: function(){
        this.callParent(arguments);
        this.getComponent(2).getComponent('logInButton').setHidden(this.getLoginButtonHidden());
    }
});
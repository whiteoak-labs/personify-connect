Ext.define('Personify.view.phone.login.LoginPhone', {
    extend: 'Ext.Container',
    xtype: 'loginPhone',
    controller: 'Personify.controller.phone.login.LoginPhone',
    requires: [
        'Personify.controller.phone.login.LoginPhone',
        'Personify.view.phone.common.Toolbar'
    ],

    config: {
        itemId: 'login',
        layout: 'vbox',
        temporary: false,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarLogin',
                title: 'Login'
            },
            {
                layout: 'vbox',
                flex: 1,
                items:[
                    {
                        itemId:'loginForm',
                        cls:'p-login-form-phone',
                        flex: 1,
                        items: [
                            {
                                xtype: 'container',
                                cls: 'p-phone-logineditfield',
                                items:[
                                    {
                                        itemId: 'usernameTextfield',
                                        xtype: 'textfield',
                                        autoCapitalize: false,
                                        cls: 'username-text-field-login-container',
                                        placeHolder:'Enter your username',
                                        label: 'Username: ',
                                        labelCls: 'label-field-login',
                                        labelWidth: '32%'
                                    },
                                    {
                                        itemId: 'passwordTextfield',
                                        xtype: 'passwordfield',
                                        cls:'password-text-field-login-container',
                                        placeHolder:'Enter your Password',
                                        label: 'Password:',
                                        labelCls: 'label-field-login',
                                        labelWidth: '32%'
                                    },
                                    {
                                        itemId: 'temporaryNote',
                                        xtype: 'label',
                                        cls:'temporary-note',
                                        hidden:true,
                                        html:'<div id="title-temporary-note">Note: </div><div id="content-temporary-note">This temporary password is only good once upon login you\'ll need to change your password</div>'
                                    },
                                    {
                                        layout: 'hbox',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'container',
                                                items:[
                                                    {
                                                        xtype: 'togglefield',
                                                        itemId: 'toggleRememberUserID',
                                                        labelAlign: 'top',
                                                        label: 'Remember Username',
                                                        cls: 'toggleRememberUserID-phone',
                                                        value: 0
                                                    }
                                                ]

                                            },
                                            {
                                                xtype: 'container',
                                                docked: 'right',
                                                items:[
                                                    {
                                                        docked: 'bottom',
                                                        itemId: 'goButton',
                                                        xtype: 'button',
                                                        width: '100px',
                                                        cls: 'button-login-phone',
                                                        text: 'Login'

                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        docked:'bottom',
                        cls: 'p-container-phone-login-bottom menubarPanelTop',
                        layout: 'hbox',
                        items:[
                            {
                                itemId: 'forgotPassword',
                                xtype: 'button',
                                text: "Can't Access Your Account?",
                                cls: 'p-button-phone-forgot-password',
                                pressedCls:'p-button-phone-loginbottompressed'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

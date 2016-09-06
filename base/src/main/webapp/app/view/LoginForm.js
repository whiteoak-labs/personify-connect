Ext.define('Personify.view.LoginForm', {
    extend: 'Ext.Container',
    xtype: 'loginform',
    controller: 'Personify.controller.login.LoginForm',
    requires: [
        'Personify.controller.login.LoginForm',
        'Ext.field.Password',
        'Ext.Label'
    ],

    config: {
        itemId: 'loginForm',
        layout: 'vbox',
        cls: 'p-login-form-tablet p-panel-background-login',
        zIndex: 20,
        showAnimation: {
            type: 'slide',
            direction: 'down',
            duration: 100
        },
        items: [
            {
                xtype: 'container',
                flex: 1,
                items: [
                    {
                        xtype: 'label',
                        html: 'Login',
                        cls:'login-label',
                        docked: 'left'
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'hbox',
                cls: 'form-login-container p-fieldset-nameeditform',
                items: [
                    {
                        itemId: 'usernameTextfield',
                        xtype: 'textfield',
                        autoCapitalize: false,
                        cls: 'username-text-field-login-container',
                        placeHolder: 'Username',
                        value: ''
                    },
                    {
                        itemId: 'passwordTextfield',
                        xtype: 'passwordfield',
                        cls:'password-text-field-login-container',
                        placeHolder:'Password',
                        value: ''
                    },
                    {
                        itemId: 'goButton',
                        xtype: 'button',
                        cls: 'go-button-login-container',
                        text: 'Go'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                flex: 1,
                cls:'form-password-container p-fieldset-nameeditform',
                items: [
                    {
                        itemId: 'rememberMeCheckbox',
                        xtype: 'checkboxfield',
                        name : 'rememberMe',
                        label: 'remember me',
                        value: 'remember',
                        labelAlign:'right',
                        labelWidth: '80%',
                        labelCls: 'remember-me-label-checkbox',
                        cls: 'remember-me-checkbox',
                        checked:true
                    },
                    {
                        itemId: 'forgotPassword',
                        xtype: 'button',
                        text: 'FORGOT PASSWORD',
                        cls: 'forgot-password'
                    }
                ]
            }
        ]
    }
})
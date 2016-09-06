Ext.define('Personify.controller.login.LoginForm', {
    extend: 'Personify.base.Controller',

    control: {
        usernameTextfield: {
            keyup: 'onFieldKeyUp'
        },
        passwordTextfield: {
            keyup: 'onFieldKeyUp'
        },

        goButton: {
            tap: 'onLogin'
        },

        forgotPassword: {
            tap: 'onForgotPassword'
        },
        rememberMeCheckbox: true
    },
    onFieldKeyUp: function(objField,e) {
        var me = this;
        if (e.event.keyCode == 13) {
            me.onLogin();
        }
    },
    onLogin: function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this,
            usernameTextfield = me.getUsernameTextfield(),
            passwordTextfield = me.getPasswordTextfield();

        if (usernameTextfield.getValue() && passwordTextfield.getValue()) {
            var attributes = {
                    UserName: usernameTextfield.getValue(),
                    Password: passwordTextfield.getValue()
                };
            var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                userStoreName = storeManager.getUserStore(),
                userStore = Ext.create(userStoreName, {
                    dataRequest: attributes
                });

            Personify.utils.Configuration.setUserNameAndPassword(usernameTextfield.getValue(), passwordTextfield.getValue());
            userStore.load({
                callback: function(records, operation, success) {
                    if (success && records.length) {
                        var user = records[0];
                        user.setUserName(usernameTextfield.getValue());
                        user.setPassword(passwordTextfield.getValue());
                        Ext.callback(me.onLoginSuccess, me, [user]);
                    } else {
                        Ext.callback(me.onLoginFailure, me);
                    }
                },
                scope: this
            });
        } else {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Login', 'Username and password are required.', Ext.emptyFn);
        }
    },


    onLoginSuccess: function(user) {
        var me = this;
        var loginForm = me.getView();

        if(!user) {
            me.onLoginFailure();
            return false;
        }
        this.getView().fireEvent('loginsuccess', user);
        if (window.plugins.applicationPreferences) {
            if (me.getRememberMeCheckbox().isChecked()) {
                window.plugins.applicationPreferences.set('keepUserLogin', user.raw, function() {}, function() {});
                window.plugins.applicationPreferences.set('checked', '1', function() {}, function() {});
                window.plugins.applicationPreferences.set('username', me.getUsernameTextfield().getValue(), function() {}, function() {});
                window.plugins.applicationPreferences.set('password', me.getPasswordTextfield().getValue(), function() {}, function() {});
            } else {
                window.plugins.applicationPreferences.set('keepUserLogin', '', function() {}, function() {});
                window.plugins.applicationPreferences.set('checked', '0', function() {}, function() {});
                window.plugins.applicationPreferences.set('username', "", function() {}, function() {});
                window.plugins.applicationPreferences.set('password', "", function() {}, function() {});
            }
        }

        if (window.plugins.pushNotification) {
            var urbanairship = window.plugins.pushNotification;
            urbanairship.setAlias(user.data.userKey);
        }

        loginForm.hide();
        me.getUsernameTextfield().setValue('');
        me.getPasswordTextfield().setValue('');
    },

    onLoginFailure: function() {
        Ext.Msg.alert('Login', 'Username or password is invalid.', Ext.emptyFn);
    },

    onLoginButtonTap: function(button) {
        var evt = document.createEvent('Event');
        evt.initEvent('lockoutView', true, true);
        document.dispatchEvent(evt);
        /*var me = this;
        var loginForm = me.getView(),
            loginStatus = me.getLoginstatus();
        this.getRememberMeCheckbox().setChecked(true);

        loginForm.showBy(button,'tr-tr');
        window.plugins.applicationPreferences.get('checked', function(result) {
            if (result == '1') {
                window.plugins.applicationPreferences.get('username',
                    function(result) {
                       me.getUsernameTextfield().setValue(result);
                    },
                    function() {});
                window.plugins.applicationPreferences.get('password',
                    function(result) {
                        me.getPasswordTextfield().setValue(result);
                    },
                    function() {});
            }
        }, function() {});*/

    },

    onForgotPassword: function() {
        var me = this,
            loginForm = me.getView();
        loginForm.fireEvent('forgotPassword');

        if (Ext.os.is.Android) {
            var url = Personify.utils.Configuration.getConfiguration().getAt(0).ProfileStore.get('forgotPasswordUrl');
            window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            Ext.Msg.alert('Personify', 'Please contact your association representative for assistance in changing your password', Ext.emptyFn);
        }

    }
});

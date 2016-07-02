Ext.define('Personify.controller.phone.login.LoginPhone', {
    extend: 'Personify.controller.login.LoginForm',
           
    inject: {
        allProductStore: 'allProductStore'
    },
           
    config:{
        allProductStore:null
    },

    control: {
        ptoolbarLogin: {
            onNavigationButtonTap: 'onBack'
        },
        usernameTextfield: {
            keyup: 'onFieldKeyUp'
        },
        passwordTextfield: {
            keyup: 'onFieldKeyUp'
        },
        toggleRememberUserID: true,
        goButton: {
            tap: 'onLogin'
        },
        forgotPassword: {
            tap: 'onForgotPassword'
        },
        temporaryNote: true
    },
    onFieldKeyUp: function(objField,e) {
        var me = this;
        if (e.event.keyCode == 13) {
            me.onLogin();
        }
    },
    init: function() {
        var me= this,
            thisView = me.getView(),
            forgotPassword = me.getForgotPassword(),
            temporary = thisView.getTemporary();

        me.getPtoolbarLogin().getController().setHiddenActionButton(true);

        if (temporary) {
            temporaryNote = this.getTemporaryNote();
            temporaryNote.setHidden(false);
            forgotPassword.setHidden(true);

        } else {
            temporaryNote = this.getTemporaryNote();
            temporaryNote.setHidden(true);
        }

        var checkRemember = 1;
        if (window.plugins.applicationPreferences) {
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
                } else {
                    checkRemember = 0;
                }
            }, function() {});
        }

        var reLoadToggle = function() {
            me.getToggleRememberUserID().setValue(checkRemember);
        };
        window.setTimeout(reLoadToggle, 1000);
    },

    onBack: function() {
        this.getView().fireEvent('back',this);
    },

    onLogin: function() {
        var me = this;

        var mainViews = Ext.ComponentQuery.query('#mainView');

        if (mainViews.length) {
            mainViews[0].getController().getMenuBar().getController().closeMenuBar();
        }

        this.getUsernameTextfield().blur();
        this.getPasswordTextfield().blur();

        Ext.Viewport.setMasked({xtype: 'loadmask'});
        me.callParent(arguments);
    },

    onLoginSuccess: function(user) {
        var me = this,
            thisView = me.getView();

        if(!user){
            me.onLoginFailure();
            return;
        }
        me.getAllProductStore().removeAll();
        var username = me.getUsernameTextfield().getValue();
        var password = me.getPasswordTextfield().getValue();

        Personify.utils.Configuration.setCurrentUser(user);
        thisView.fireEvent('updatecurrentuser', user, function() {
            me.onBack();
            Ext.Viewport.setMasked(false);
        });

        if (window.plugins.pushNotification) {
            var urbanairship = window.plugins.pushNotification;
            urbanairship.setAlias(user.data.userKey);
        }

        if (window.plugins.applicationPreferences) {
            if (me.getToggleRememberUserID().getValue() == 1) {
                window.plugins.applicationPreferences.set('keepUserLogin', user.raw, function() {}, function() {});
                window.plugins.applicationPreferences.set('checked', '1', function() {}, function() {});
                window.plugins.applicationPreferences.set('username', username, function() {}, function() {});
                window.plugins.applicationPreferences.set('password', password, function() {}, function() {});
            } else {
                window.plugins.applicationPreferences.set('keepUserLogin', '', function() {}, function() {});
                window.plugins.applicationPreferences.set('checked', '0', function() {}, function() {});
                window.plugins.applicationPreferences.set('username', '', function() {}, function() {});
                window.plugins.applicationPreferences.set('password', '', function() {}, function() {});
            }
        }
    },

    onLoginFailure: function() {
        var me = this;
        Ext.Viewport.setMasked(false);
        Ext.Msg.alert('Login', 'Username or password is invalid.', Ext.emptyFn);
    },

    onForgotPassword: function() {
        var url = Personify.utils.Configuration.getConfiguration().getAt(0).ProfileStore.get('forgotPasswordUrl');
        if (Ext.os.is.Android) {
            window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            Ext.Msg.alert('Personify', 'Please contact your association representative for assistance in changing your password', Ext.emptyFn);
        }
    }
});

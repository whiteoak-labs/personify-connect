Ext.define('Personify.controller.Login', {
    extend: 'Personify.base.Controller',
           
    /*inject: {
        allProductStore: 'allProductStore'
    },
     
    config:{
        allProductStore:null
    },
     */
    control: {
        loginForm: {
            loginsuccess: 'onLoginSuccess',
            forgotPassword: 'onForgotPassword'
        },
        loginstatus: {},

        loginButton: {
            tap: 'onLoginButtonTap',
            submitLogin: 'onLoginButtonTap'
        },

        profileButton:{
            tap: 'onProfileButtonTap'
        }
    },
    init: function() {
        var user = Personify.utils.Configuration.getCurrentUser();
        if (user.isLogged()) {
            this.onLoginSuccess(user);
        }
    },

    resetViews: function() {
        this.getLoginForm().hide();
        this.getLoginButton().show();
        this.getProfileButton().hide();
    },

    callbackFn: function(scope,fn){
        return function () {
            fn.apply(scope, arguments);
        };
    },

    onOnLine: function() {
        var me = this,
            thisView = me.getView();

        thisView.setHidden(false);
    },

    onOffLine: function() {
        var me = this,
            thisView = me.getView();
        thisView.setHidden(true);
    },

    onLoginSuccess: function(user) {
        var me =this;
       // me.getAllProductStore().removeAll();
        Personify.utils.Configuration.setCurrentUser(user);
        me.getView().fireEvent('userlogin', user);
        var loginButton = me.getLoginButton(),
            loginForm = me.getLoginForm(),
            profileButton = me.getProfileButton();

        if (window.plugins.pushNotification) {
            var urbanairship = window.plugins.pushNotification;
            urbanairship.setAlias(user.data.userKey);
        }

        loginForm.hide();

        loginButton.setHidden(true);
        profileButton.setHidden(false);
    },

    onLoginButtonTap: function(button) {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
            }
            Ext.Viewport.setMasked(false);

            if (navigator.onLine && window.plugins.app47) {
                window.plugins.app47.sendGenericEvent('Login');
            }

            var me = this;
            var loginForm = me.getLoginForm(),
                loginStatus = me.getLoginstatus();
            loginForm.showBy(button,'tr-tr');
            if (window.plugins.applicationPreferences) {
                window.plugins.applicationPreferences.get('checked', function(result) {
                    if (result == '1') {
                        var loginFormController = loginForm.getController();
                        window.plugins.applicationPreferences.get('username',
                            function(result) {
                                loginFormController.getUsernameTextfield().setValue(result);
                            },
                            function() {});
                        window.plugins.applicationPreferences.get('password',
                            function(result) {
                                loginFormController.getPasswordTextfield().setValue(result);
                            },
                            function() {});
                    }
                }, function() {});
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onProfileButtonTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
            }
           Ext.Viewport.setMasked({xtype: 'loadmask'});
           this.getView().fireEvent('requestchangeview', 'Personify.view.Profile', null, 'Profile', 'profilemenuitem');
            this.getView().fireEvent('hideShoppingCart');
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onForgotPassword: function() {
        var me = this,
            loginForm = me.getLoginForm();

        loginForm.hide();
    }
});

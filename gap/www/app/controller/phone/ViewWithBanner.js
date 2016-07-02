Ext.define('Personify.controller.phone.ViewWithBanner', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],

    requires: 'Personify.view.phone.login.LoginPhone',

    config: {
        currentUser: null
    },

    control: {
        logInButton: {
            tap: 'onLogInButtonTap',
            submitLogin: 'onLogInButtonTap'
        },
        mainViewContainer: {

        },
        homeMainView: {
            listeners: {
                requestchangemainview: 'onRequestChangeMainView',
                requestchangeview: 'onRequestChangeView',
                updatecurrentuser: 'onUpdateCurrentUser'
            }
        }
    },

    init: function() {
        this.onUpdateCurrentUser(this.getCurrentUser());
    },

    openView: function(view, config, title, css) {
        if (config) {
            if(config['record'] && config.record.get('neededLogin') && !this.getCurrentUser().isLogged()){
                Personify.utils.ItemUtil.needToLogin();
                return;
            }
        }

        if(config && config.hasOwnProperty('loginButtonHidden') && config.loginButtonHidden == false) {
            this.getLogInButton().show();
        }
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('updatecurrentuser', this.onUpdateCurrentUser, this);
        view.addListener('requestchangemainview', this.onRequestChangeMainView, this);

        if (config && config['record']) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }
        this.getView().fireEvent('requestchangeview', view, null);
    },

    onRequestChangeMainView:function(view, config, title, css) {
        this.openView(view, config, title, css);
    },

    onRequestChangeView: function(view,config) {
        this.getView().fireEvent('requestchangeview',view,config);
    },

    onUpdateCurrentUser: function(user, callback) {
        this.getView().fireEvent('updatecurrentuser', user, function(){
            if(callback){
                callback(true);
            }
        });
    },

    updateViewForUser: function(user) {
        this.setCurrentUser(user);
        var logInButton = this.getLogInButton();

        if (user.isLogged()) {
            logInButton.setHidden(true);
        } else {
            logInButton.setHidden(false);
        }

        this.getHomeMainView().getController().onUpdateCurrentUser(user);
    },

    onLogInButtonTap: function() {
        this.onRequestChangeMainView('Personify.view.phone.login.LoginPhone', null);
    }
});

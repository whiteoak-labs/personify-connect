Ext.define('Personify.controller.phone.home.HomeMainView', {
    extend: 'Personify.base.Controller',
    inject: ['currentUser'],

    config: {
        currentUser: null
    },

    control: {
        hiLabel: true,
        menuList: {
            requestchangeview: 'onRequestChangeViewList'
        },
        logInButton: true
    },

    init: function() {
        this.onUpdateCurrentUser(this.getCurrentUser());
    },

    onRequestChangeViewList: function(list,record) {
        var me = this;
            thisView = me.getView();

        if (!Personify.utils.PhoneGapHelper.checkConnection() && record.get('name') != "Events") {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        Ext.callback(function() {
            me.getView().fireEvent('requestchangeview', record.get('view'), {record:record});
        }, me, [], 1);
    },

    onUpdateCurrentUser: function(user) {
        this.setCurrentUser(user);
        var logInButton = this.getLogInButton();

        if (user.isLogged()) {
            var name = user.get("displayName");

            if (name) {
                this.changeHiLabel(name);
            }

            logInButton.setHidden(true);
        } else {
            logInButton.setHidden(false);
        }

        this.getMenuList().getController().onUpdateCurrentUser(user);
    },

    changeHiLabel: function(text) {
        this.getHiLabel().setHtml("Hi, " +  text);
    }
});

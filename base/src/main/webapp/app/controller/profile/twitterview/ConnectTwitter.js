Ext.define('Personify.controller.profile.twitterview.ConnectTwitter', {
    extend: 'Personify.base.Controller',
    requires: 'Personify.model.twitter.User',
    control: {
        usernameTextfield: {},
        passwordTextfield: {},
        authorizeButton: {
            tap:'onAuthorizeButtonTap'
        }
    },
    
    onAuthorizeButtonTap:function() {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this,
            params = {
                userName: me.getUsernameTextfield().getValue(),
                password: me.getPasswordTextfield().getValue(),
                success: me.onSuccessLoginTwitter,
                failure: me.onFailureLoginTwitter,
                scope: me
            },
            paramInit = {
                consumerKey:'6AqyEYuQnznxau9uYns17w',
                consumerSecret :'eRZZMxdC2gAx5PnMbtcetAqRYPSv6FnA3J21rOAo74',
                userModel:'Personify.model.twitter.User'
            };
        TMA.Twitter.init(paramInit);
        
        TMA.Twitter.authorize(params);
        
    },
    
    onSuccessLoginTwitter: function() {
        var me =this;
        Ext.Msg.alert('Twitter','Authorization success',Ext.emptyFn);
        me.changeView();
    },
    
    onFailureLoginTwitter: function() {
        Ext.Msg.alert('Twitter','Authorization failed',Ext.emptyFn);
    },
    
    changeView: function () {
        var me= this;
        parentView = me.getView().getParent();
        parentView.fireEvent('changeView','connectedtwitter');
    }
});
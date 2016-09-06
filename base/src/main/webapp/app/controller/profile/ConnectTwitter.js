Ext.define('Personify.controller.profile.ConnectTwitter', {
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
        this.getView().setMasked({xtype: 'loadmask'});
        TMA.Twitter.init(paramInit);
        
        TMA.Twitter.authorize(params);
        
    },
    
    onSuccessLoginTwitter: function() {
        var me =this;
        Ext.Msg.alert('Twitter','Authorization success',Ext.emptyFn);
        this.getView().setMasked(false);
        me.changeView();
    },
    
    onFailureLoginTwitter: function() {
        var me = this;
        Ext.Msg.alert('Twitter','Authorization failed',Ext.emptyFn);
        me.getView().setMasked(false);
    },
    
    changeView: function () {
        var me = this;
        parentView = me.getView().getParent();
        parentView.fireEvent('changeview','Personify.view.profile.ConnectedTwitter');
    }
});
Ext.define("Personify.controller.profile.ConnectTwitter",{extend:"Personify.base.Controller",requires:"Personify.model.twitter.User",control:{usernameTextfield:{},passwordTextfield:{},authorizeButton:{tap:"onAuthorizeButtonTap"}},onAuthorizeButtonTap:function(){var b=this,c={userName:b.getUsernameTextfield().getValue(),password:b.getPasswordTextfield().getValue(),success:b.onSuccessLoginTwitter,failure:b.onFailureLoginTwitter,scope:b},a={consumerKey:"6AqyEYuQnznxau9uYns17w",consumerSecret:"eRZZMxdC2gAx5PnMbtcetAqRYPSv6FnA3J21rOAo74",userModel:"Personify.model.twitter.User"};this.getView().setMasked({xtype:"loadmask"});TMA.Twitter.init(a);TMA.Twitter.authorize(c)},onSuccessLoginTwitter:function(){var a=this;Ext.Msg.alert("Twitter","Authorization success",Ext.emptyFn);this.getView().setMasked(false);a.changeView()},onFailureLoginTwitter:function(){var a=this;Ext.Msg.alert("Twitter","Authorization failed",Ext.emptyFn);a.getView().setMasked(false)},changeView:function(){var a=this;parentView=a.getView().getParent();parentView.fireEvent("changeview","Personify.view.profile.ConnectedTwitter")}});
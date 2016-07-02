Ext.define("Personify.controller.phone.login.LoginPhone",{extend:"Personify.controller.login.LoginForm",inject:{allProductStore:"allProductStore"},config:{allProductStore:null},control:{ptoolbarLogin:{onNavigationButtonTap:"onBack"},usernameTextfield:{keyup:"onFieldKeyUp"},passwordTextfield:{keyup:"onFieldKeyUp"},toggleRememberUserID:true,goButton:{tap:"onLogin"},forgotPassword:{tap:"onForgotPassword"},temporaryNote:true},onFieldKeyUp:function(a,c){var b=this;if(c.event.keyCode==13){b.onLogin()}},init:function(){var c=this,f=c.getView(),e=c.getForgotPassword(),a=f.getTemporary();c.getPtoolbarLogin().getController().setHiddenActionButton(true);if(a){temporaryNote=this.getTemporaryNote();temporaryNote.setHidden(false);e.setHidden(true)}else{temporaryNote=this.getTemporaryNote();temporaryNote.setHidden(true)}var d=1;if(window.plugins.applicationPreferences){window.plugins.applicationPreferences.get("checked",function(g){if(g=="1"){window.plugins.applicationPreferences.get("username",function(h){c.getUsernameTextfield().setValue(h)},function(){});window.plugins.applicationPreferences.get("password",function(h){c.getPasswordTextfield().setValue(h)},function(){})}else{d=0}},function(){})}var b=function(){c.getToggleRememberUserID().setValue(d)};window.setTimeout(b,1000)},onBack:function(){this.getView().fireEvent("back",this)},onLogin:function(){var a=this;var b=Ext.ComponentQuery.query("#mainView");if(b.length){b[0].getController().getMenuBar().getController().closeMenuBar()}this.getUsernameTextfield().blur();this.getPasswordTextfield().blur();Ext.Viewport.setMasked({xtype:"loadmask"});a.callParent(arguments)},onLoginSuccess:function(b){var d=this,f=d.getView();if(!b){d.onLoginFailure();return}d.getAllProductStore().removeAll();var e=d.getUsernameTextfield().getValue();var c=d.getPasswordTextfield().getValue();Personify.utils.Configuration.setCurrentUser(b);f.fireEvent("updatecurrentuser",b,function(){d.onBack();Ext.Viewport.setMasked(false)});if(window.plugins.pushNotification){var a=window.plugins.pushNotification;a.setAlias(b.data.userKey)}if(window.plugins.applicationPreferences){if(d.getToggleRememberUserID().getValue()==1){window.plugins.applicationPreferences.set("keepUserLogin",b.raw,function(){},function(){});window.plugins.applicationPreferences.set("checked","1",function(){},function(){});window.plugins.applicationPreferences.set("username",e,function(){},function(){});window.plugins.applicationPreferences.set("password",c,function(){},function(){})}else{window.plugins.applicationPreferences.set("keepUserLogin","",function(){},function(){});window.plugins.applicationPreferences.set("checked","0",function(){},function(){});window.plugins.applicationPreferences.set("username","",function(){},function(){});window.plugins.applicationPreferences.set("password","",function(){},function(){})}}},onLoginFailure:function(){var a=this;Ext.Viewport.setMasked(false);Ext.Msg.alert("Login","Username or password is invalid.",Ext.emptyFn)},onForgotPassword:function(){var a=Personify.utils.Configuration.getConfiguration().getAt(0).ProfileStore.get("forgotPasswordUrl");if(Ext.os.is.Android){window.open(a,"_blank","location=yes,enableViewportScale=yes")}else{Ext.Msg.alert("Personify","Please contact your association representative for assistance in changing your password",Ext.emptyFn)}}});
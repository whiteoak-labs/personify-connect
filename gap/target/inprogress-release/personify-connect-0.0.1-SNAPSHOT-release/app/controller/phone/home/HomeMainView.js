Ext.define("Personify.controller.phone.home.HomeMainView",{extend:"Personify.base.Controller",inject:["currentUser"],config:{currentUser:null},control:{hiLabel:true,menuList:{requestchangeview:"onRequestChangeViewList"},logInButton:true},init:function(){this.onUpdateCurrentUser(this.getCurrentUser())},onRequestChangeViewList:function(c,a){var b=this;thisView=b.getView();if(!Personify.utils.PhoneGapHelper.checkConnection()&&a.get("name")!="Events"){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}Ext.callback(function(){b.getView().fireEvent("requestchangeview",a.get("view"),{record:a})},b,[],1)},onUpdateCurrentUser:function(a){this.setCurrentUser(a);var c=this.getLogInButton();if(a.isLogged()){var b=a.get("displayName");if(b){this.changeHiLabel(b)}c.setHidden(true)}else{c.setHidden(false)}this.getMenuList().getController().onUpdateCurrentUser(a)},changeHiLabel:function(a){this.getHiLabel().setHtml("Hi, "+a)}});
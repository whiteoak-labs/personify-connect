Ext.define("Personify.controller.store.CartPanel",{extend:"Personify.base.Controller",inject:["currentUser","personify","shoppingCartStore"],config:{shoppingCartStore:null,currentUser:null,personify:null,checkOutUrl:null},control:{totalItemCheckoutCartPanel:{},cartPanelTemplate:{},checkoutWebsite:{tap:"onCheckoutWebsite"},callUsNumber:{}},init:function(){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Product View Shopping Cart")}var e=this;e.getCheckoutWebsite().hide();var a=Personify.utils.Configuration.getCurrentUser();var d=e.getPersonify().getAt(0).ProductStore.get("callUs");e.getTotalItemCheckoutCartPanel().setHtml(e.getShoppingCartStore().getCount());e.getCartPanelTemplate().setStore(e.getShoppingCartStore());e.getCallUsNumber().setHtml("Or Call Us at "+d);var f=Personify.utils.ServiceManager.getStoreManager();var b=Ext.create(f.getProfileAuthenticationUrl());var c={MasterCustomerId:a.get("masterCustomerId"),SubCustomerId:a.get("subCustomerId"),UserName:Personify.utils.Configuration.getUserName(),Password:Personify.utils.Configuration.getPassword(),PageKey:"ShoppingCartURL",InputURL:""};b.setDataRequest(c);b.load({callback:function(h,g,i){if(h.length>0){e.setCheckOutUrl(b.first().get("outputUrl"));e.getCheckoutWebsite().show()}}})},onCheckoutWebsite:function(){if(!Personify.utils.PhoneGapHelper.checkConnection()){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}var a=this.getCheckOutUrl();if(Ext.os.is.Android){window.open(a,"_blank","location=yes,enableViewportScale=yes")}else{window.open(a,"_blank","location=no,enableViewportScale=yes")}}});
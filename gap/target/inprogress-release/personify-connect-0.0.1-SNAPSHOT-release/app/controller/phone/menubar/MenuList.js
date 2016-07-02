Ext.define("Personify.controller.phone.menubar.MenuList",{extend:"Personify.base.Controller",control:{headerMainBtn:{tap:"gotoMainPageTap"},menuItemList:{itemtap:"menubarItemTap"},headerInfoBtn:{tap:"openInfoPageTap"}},selectBtn:function(a){if(a=="info"){this.getHeaderInfoBtn().setCls("headerInfoBtnSelected")}if(a=="main"){this.getHeaderMainBtn().setCls("headerMainBtnSelected")}},resetSelectedButton:function(){this.getHeaderMainBtn().setCls("headerMainBtn");this.getHeaderInfoBtn().setCls("headerInfoBtn")},setMenuStore:function(a){this.getMenuItemList().setStore(a)},gotoMainPageTap:function(){if(Personify.utils.Configuration.getAllowChangeView()){this.getView().fireEvent("openmainview")}else{Ext.Msg.alert("","Please enter the note title.",Ext.emptyFn)}},menubarItemTap:function(f,b,e,a,d,c){if(Personify.utils.Configuration.getAllowChangeView()){if(a.get("name")==="Discussion"){this.openDiscussion(a)}else{this.getView().fireEvent("onmenuitem",a)}}else{Ext.Msg.alert("","Please enter the note title.",Ext.emptyFn)}},openInfoPageTap:function(){if(Personify.utils.Configuration.getAllowChangeView()){this.getView().fireEvent("openinfopage")}else{Ext.Msg.alert("","Please enter the note title.",Ext.emptyFn)}},openDiscussion:function(b){var a=Personify.utils.Configuration.getCurrentUser();var e=a?a.isLogged():false;if(b.get("neededLogin")&&!e){Personify.utils.ItemUtil.needToLogin();return}if(Personify.utils.Configuration.getDiscussionUrl()){var d=Personify.utils.Configuration.getDiscussionUrl();if(Ext.os.is.Android){window.open(d,"_blank","location=yes,enableViewportScale=yes")}else{window.open(d,"_blank","location=no,enableViewportScale=yes")}}else{var f=Personify.utils.Configuration.getConfiguration().getAt(0).DiscussionStore;var h=Personify.utils.ServiceManager.getStoreManager();var g=Ext.create(h.getProfileAuthenticationUrl());var c={MasterCustomerId:a.get("masterCustomerId"),SubCustomerId:a.get("subCustomerId"),Username:Personify.utils.Configuration.getUserName(),Password:Personify.utils.Configuration.getPassword(),InputURL:f.get("url"),PageKey:"",VendorUserName:f.get("vendorUsername"),VendorId:f.get("vendorId"),VendorPassword:f.get("vendorPassword"),VendorBlock:f.get("vendorBlock")};g.setDataRequest(c);Ext.Viewport.setMasked({xtype:"loadmask"});g.load({callback:function(j,i,l){Ext.Viewport.setMasked(false);if(j[0]){var k=j[0].get("outputUrl");Personify.utils.Configuration.setDiscussionUrl(k);if(Ext.os.is.Android){window.open(k,"_blank","location=yes,enableViewportScale=yes")}else{window.open(k,"_blank","location=no,enableViewportScale=yes")}}}})}}});
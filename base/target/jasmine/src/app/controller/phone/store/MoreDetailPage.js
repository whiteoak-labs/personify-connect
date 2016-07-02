Ext.define("Personify.controller.phone.store.MoreDetailPage",{extend:"Personify.controller.store.MoreDetailPage",requires:["Personify.view.phone.store.PopUpImage","Personify.view.phone.store.ConfirmAddToCart"],inject:["shoppingCartStore"],control:{storeToolbar:{onNavigationButtonTap:"onBack"},view:{show:"onShow"},imageDetail:true,titleMoredetailPage:true,memberPriceMoredetailPage:true,labelMemberPriceMoredetailPage:true,labelListPriceMoredetailPage:true,listPriceMoredetailPage:true,descriptionMoredetailPage:true,quantityPanelMoreDetailPage:true,quantityMoredetailPage:true,buyNowButtonMoredetailPage:{tap:"onBuyNow"},addToCartButtonMoredetaiPage:{tap:"onAddToCart"},shareStoreDetail:{tap:"onTapShareStoreDetail"},zoomImage:{tap:"onTapZoomImage"},actionButton:{}},config:{productItemStore:null,isDonate:false,shoppingCartStore:null},onBack:function(){var a=this;thisView=a.getView();a.getQuantityMoredetailPage().blur();thisView.fireEvent("back",this)},init:function(){this.getShoppingCartStore().on("load",this.onLoadDone,this);this.getStoreToolbar().getController().setActionCls("p-phone-button-storeshoppingcart");this.showBuyNowButton();this.getActionButton().hide()},destroy:function(){this.getShoppingCartStore().un("load",this.onLoadDone,this);return this.callParent(arguments)},onShow:function(){var b=this.getView().getRecord();if(b){var e=Personify.utils.ItemUtil.formatPurchaseAmount(b.get("price"),2);var c=Personify.utils.ItemUtil.formatPurchaseAmount(b.get("memberPrice"),2);var f=Personify.utils.ItemUtil.formatPurchaseAmount(b.get("yourPrice"),2);var d=b.get("yourPriceRateStructure")?b.get("yourPriceRateStructure").trim().toLowerCase():"list";this.setProductItemStore(b);this.getImageDetail().setHtml('<img src="'+b.get("imageURL")+'"/>');this.getTitleMoredetailPage().setHtml(b.get("name"));this.getDescriptionMoredetailPage().setHtml(b.get("descr"));this.getListPriceMoredetailPage().setHtml(e);var a=Personify.utils.Configuration.getCurrentUser();if(a.isLogged()){if(d=="list"){this.getMemberPriceMoredetailPage().setHtml(c);this.getLabelListPriceMoredetailPage().setHtml("Your Price: ");this.getListPriceMoredetailPage().setHtml(f);this.getLabelMemberPriceMoredetailPage().setHtml("Member Price: ")}else{this.getMemberPriceMoredetailPage().setHtml(f);this.getLabelMemberPriceMoredetailPage().setHtml("Your Price: ");this.getLabelListPriceMoredetailPage().setHtml("List Price: ")}}else{this.getMemberPriceMoredetailPage().setHtml(c)}if(b.get("productClass")=="DONATION"){this.getQuantityPanelMoreDetailPage().hide();this.setIsDonate(true)}}if(this.getShoppingCartStore().getCount()!=0){this.getActionButton().setText(this.getShoppingCartStore().getCount())}else{this.getActionButton().setText("0")}var a=Personify.utils.Configuration.getCurrentUser();if(!a.isLogged()){this.getActionButton().setText("0")}},onAddToCart:function(e){this.getQuantityMoredetailPage().blur();if(!Personify.utils.PhoneGapHelper.checkConnection()){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}var n=this;var b=Personify.utils.Configuration.getCurrentUser();if(b.isLogged()){if(n.getProductItemStore().get("membersonly")){if(b.isExpiredMember()){Ext.Msg.alert("Alert","For Members Only.",Ext.emptyFn);return}}var m=this.getView().getRecord();var c=n.getQuantityMoredetailPage().getValue();if(c<=0){Ext.Msg.alert("Alert","Quantity must be more than 0.",Ext.emptyFn);return}if(n.getIsDonate()){c=1}var d=m.get("productID");var o=b.data.masterCustomerId;var i=b.data.subCustomerId;var a=Personify.utils.ServiceManager.getStoreManager(),j=a.getAddCartStore();var l=m.get("yourPriceRateStructure")?m.get("yourPriceRateStructure"):"LIST";var h=m.get("yourPriceRateCode")?m.get("yourPriceRateCode"):"STD";var g=m.get("yourPrice");var k={InternalKey:null,NavigationKey:null,MasterCustomerId:o,SubCustomerId:i,ProductId:d,Qty:c,CartSessionId:null,IsAutoRenew:null,UserDefinedField1:null,UserDefinedField2:null,UserDefinedField3:null,MarketCode:null,OrderNo:null,OrderLineNo:null,Price:g,RateCode:h,RateStructure:l,ShipMasterCustomerId:o,ShipSubCustomerId:i,DoNotAutoAddComponents:null};var f=Ext.create(j);f.setDataRequest(k);n.getView().setMasked({xtype:"loadmask"});f.load({callback:function(s,r,w){n.getView().setMasked(false);if(w){var t=f.getAt(0).getData().cartItemId;if(t==-1){Ext.Msg.alert("","Add to shopping cart failed.")}else{if(b.get("masterCustomerId")==null){o="";i=""}var u=n.getShoppingCartStore();var v={MasterCustomerId:o,SubCustomerId:i};u.setDataRequest(v);u.load({callback:function(){Deft.Injector.configure({shoppingCartStore:{value:u}})}});var q=Ext.create("Personify.view.phone.store.ConfirmAddToCart");Ext.Viewport.add(q);q.show()}}else{Ext.Msg.alert("","Add to shopping cart failed.")}}})}else{var p=Ext.create("Personify.view.phone.login.LoginPhone");p.addListener("updatecurrentuser",this.onUpdateCurrentUser,this);this.getView().fireEvent("requestchangeview",p,null)}},onBuyNow:function(){this.getQuantityMoredetailPage().blur();if(!Personify.utils.PhoneGapHelper.checkConnection()){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}var g=this;var h=this.getView().getRecord().get("productID");var d=Personify.utils.Configuration.getCurrentUser();var c=Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);if(!d.isLogged()){this.getView().fireEvent("requestchangeview","Personify.view.phone.login.LoginPhone",null)}if(g.getProductItemStore().get("membersonly")){if(d.isExpiredMember()){Ext.Msg.alert("Alert","For Members Only.",Ext.emptyFn);return}}var e=g.getQuantityMoredetailPage().getValue();if(e<=0){Ext.Msg.alert("Alert","Quantity must be more than 0.",Ext.emptyFn);return}if(g.getIsDonate()){e=1}if(g.getProductItemStore().get("allowbackorders")==true&&g.getProductItemStore().get("availablequantity")==0){var a=Ext.create("Personify.view.phone.store.BackOrderPanel");a.getController().setProduct(g.getProductItemStore());a.getController().setCallback({fn:g.onBack,scope:g});Ext.Viewport.add(a);a.show();return}g.getView().setMasked({xtype:"loadmask"});var b=Personify.utils.ServiceManager.getStoreManager();var i=Ext.create(b.getOrderFalse());var f={CusAddressID:"",MasterCustomerID:d.get("masterCustomerId"),SubCustomerID:d.get("subCustomerId"),ProductID:h,OrgID:d?d.get("organizationId"):c.get("orgId"),OrgUnitID:d?d.get("organizationUnitId"):c.get("orgUnitId"),CustomPrice:"",ConfirmOrder:"false",Quantity:e};i.setDataRequest(f);i.load({callback:function(n,m,o){if(o){var l=Ext.create(b.getProfileStore());var k=d.isStaffMember();var j={MasterCustomerId:d.get("masterCustomerId"),SubCustomerId:d.get("subCustomerId"),ReqMasterCustomerId:d.get("masterCustomerId"),ReqSubCustomerId:d.get("subCustomerId"),IsStaff:k,RecordType:""};l.setDataRequest(j);l.load({callback:function(C,x,v){g.getView().setMasked(false);var z=[];var G=Ext.create("Personify.base.Store",{model:"Personify.model.jsonp.profile.Addresses"});if(v){if(C[0]){var F=C[0];if(F.EntryProfile.getAt(0)){var E=F.EntryProfile.getAt(0);var s=E.AddressesProfile.getCount();for(var D=0;D<s;D++){var t=E.AddressesProfile.getAt(D);var A=t.get("streetAddress"),u=t.get("locality"),q=t.get("region"),w=t.get("postalCode"),B=t.get("country"),p=t.get("addressesId"),r=t.get("type");z.push({streetAddress:A,locality:u,region:q,postalCode:w,country:B,addressesId:p,type:r})}G.add(z)}}}var y=Ext.create("Personify.view.phone.store.OrderPanel");y.getController().setProduct(g.getProductItemStore());y.getController().setIsProductEvent(false);Ext.Viewport.add(y);i.each(function(I){var H=I.get("baseAmount");I.set("baseAmount",H*e)});y.getController().getOrderTemplate().setStore(i);y.getController().getShippingAddress().setStore(G);y.getController().setQuantity(e);y.getController().setCallback({fn:g.onBack,scope:g});if(G.getCount()>0){y.getController().getShippingAddress().select(0)}y.show()}})}else{g.getView().setMasked(false);Ext.Msg.alert("Shopping Cart","Cannot process order at this time.",Ext.emptyFn)}}})},onTapShareStoreDetail:function(){var a=this;a.getQuantityMoredetailPage().blur();if(window.plugins.social&&window.plugins.social.available){window.plugins.social.available(function(c){if(c==1){var b="";if(a.getView().getRecord()){var g=a.getView().getRecord();var h=g.get("name");var f=g.get("descr");var e=g.get("price");var d=g.get("memberPrice");b="Title: "+h+"\nDesctiption: "+f+"\nPrice: $"+e+"\nMember Price: $"+d}window.plugins.social.share(b,"","")}else{Ext.Msg.alert("","Social network plugins is not supported.",Ext.emptyFn)}})}},onTapZoomImage:function(){var a=Ext.create("Personify.view.phone.store.PopUpImage");Ext.Viewport.add(a);a.getController().setRecord(this.getView().getRecord());a.show()},onLoadDone:function(b,a,c){if(c){this.getActionButton().setText(b.getCount())}},onUpdateCurrentUser:function(a){this.showBuyNowButton()},showBuyNowButton:function(){var a=Personify.utils.Configuration.getCurrentUser();if((a.get("cCNumber")!=null&&a.get("cCType")!=null)&&(a.get("cCNumber")!=""&&a.get("cCType")!="")){this.getBuyNowButtonMoredetailPage().show();this.getBuyNowButtonMoredetailPage().setText(this.getView().getRecord().get("purchaseActionTitle"))}}});
Ext.define("Personify.controller.phone.news.News",{extend:"Personify.base.Controller",requires:["Personify.view.phone.news.NewsManagement","Personify.view.phone.twitter.Twitter"],control:{newsMainPanel:{requestchangeview:"onRequestChangeView"},newsNavigationView:{},newsManagementPanel:{live:true,listeners:{back:"onBack"}},newsToolbar:{onNavigationButtonTap:"onBack",actionButtonTap:"onChangeParentView"}},onRequestChangeView:function(a,b){this.openView(a,b)},onLoadData:function(){},openView:function(a,b,g,c){if(typeof a=="string"){a=Ext.create(a,b)}a.addListener("back",this.onBackNews,this);a.addListener("requestchangeview",this.onRequestChangeView,this);if(b&&b.record){var d=b.record.get("listeners");if(d){for(var e in d){this.getView().addListener(e,d[e],a)}}}var f=this.getNewsNavigationView();if(f.getActiveItem().xtype!=a.xtype){f.push(a)}},onBack:function(){var a=this;thisView=a.getView();thisView.fireEvent("back",this)},onBackNews:function(){this.getNewsNavigationView().pop()},onChangeParentView:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.twitter.Twitter",null)}});
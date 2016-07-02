Ext.define("Personify.controller.phone.notification.PanelNotificationPhone",{extend:"Personify.base.Controller",control:{navigationNotificationPhone:true,notificationsPhone:{live:true,listeners:{requestOpenDetail:"openDetailItemView",backToMain:"onBackToMain",backToNavigationView:"onBackToNavigationView",markReadNotificationPhone:"markReadNotificationPhone",deleteItemNotificationPhone:"deleteItemNotificationPhone"}}},openDetailItemView:function(a,c){if(typeof a=="string"){a=Ext.create(a,c)}a.addListener("backToMain",this.onBackToMain,this);a.addListener("backToNavigationView",this.onBackToNavigationView,this);a.addListener("requestOpenDetail",this.openDetailItemView,this);a.addListener("markReadNotificationPhone",this.markReadNotificationPhone,this);a.addListener("deleteItemNotificationPhone",this.deleteItemNotificationPhone,this);if(c){var d=c.record.get("listeners");if(d){for(var e in d){this.getView().addListener(e,d[e],a)}}}var b=this.getNavigationNotificationPhone();b.push(a)},onBackToMain:function(){this.getView().fireEvent("back",this);this.getView().fireEvent("enableBtnOpenNotificationPhone")},onBackToNavigationView:function(){var b=this,a=b.getNavigationNotificationPhone();a.pop()},markReadNotificationPhone:function(a){var b=0,c=this.getNotificationsPhone().getController().getListNotificationPhone().getStore();c.each(function(d){if(d.get("isRead")==true){b++}else{if(d.get("messageId")==a.get("messageId")){d.set("isRead",true);b++}}});this.getView().fireEvent("setTextNotiBtnPhone",b);this.getNotificationsPhone().getController().getListNotificationPhone().refresh();Personify.utils.Sqlite.insertTableNotification(a.get("messageId"),0,function(d){})},deleteItemNotificationPhone:function(a){var c=this,d=this.getNotificationsPhone().getController().getListNotificationPhone().getStore(),b=a.get("messageId");d.each(function(e){if(e.get("messageId")==b){d.remove(a)}});Personify.utils.Sqlite.insertTableNotification(b,1,function(e){if(e){c.onBackToNavigationView();c.getNotificationsPhone().getController().getListNotificationPhone().refresh()}else{Ext.Msg.alert("Delete Notification","Delete failed.",Ext.emptyFn)}})}});
Ext.define("Personify.store.jsonp.User",{extend:"Personify.store.base.User",requires:["Personify.model.jsonp.User","Personify.proxy.RestService"],config:{model:"Personify.model.jsonp.User",storeId:"User",autoLoad:false,implicitIncludes:true,listeners:{beforeload:"onBeforeLoad"}},onBeforeLoad:function(){var a=this.getDataRequest();var b={type:"restservice",headers:Personify.utils.ServiceManager.getHeaders(),url:Personify.utils.ServiceManager.getUrlWS("userLogin"),jsonData:a,reader:{implicitIncludes:true,type:"json",rootProperty:"Entry",successProperty:"IsValidUser"}};this.setProxy(b)}});
Ext.define("Personify.store.jsonp.Product",{extend:"Personify.store.base.product.Product",requires:["Personify.model.jsonp.product.Product","Personify.proxy.RestService"],config:{storeId:"Product",model:"Personify.model.jsonp.product.Product",haveData:false,implicitIncludes:true,listeners:{beforeload:"onBeforeLoad"}},onBeforeLoad:function(){var b=this.getDataRequest();var a={type:"restservice",dataRequests:b,url:Personify.utils.ServiceManager.getUrlWS("storeProductDetails"),headers:Personify.utils.ServiceManager.getHeaders(),jsonData:b,reader:{type:"json"}};this.setProxy(a)}});
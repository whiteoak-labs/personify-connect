Ext.define("Personify.profile.Tablet",{extend:"Personify.profile.AppProfile",config:{name:"tablet",namespace:"tablet",views:["Personify.view.Main"]},isActive:function(){return Ext.os.is.Tablet||Ext.os.is.Desktop},initViews:function(){this.callParent(arguments);Ext.Viewport.add(Ext.create("Personify.view.Main"));if(Ext.os.is.iOS&&Ext.os.version.major>=7){Ext.select(".headerPanel").applyStyles("height: 75px; padding-top: 15px;")}else{Ext.select(".headerPanel").applyStyles("height: 60px;")}}});
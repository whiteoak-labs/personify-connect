Ext.define("Personify.proxy.ProfileProxy",{extend:"Ext.data.proxy.Server",alias:"proxy.profileproxy",constructor:function(a){this.callParent(arguments)},doRequest:function(b,g,d){var f=this;var c=f.config.url;var a=JSON.stringify(f.config.jsonData);var e=f.buildRequest(b);Personify.utils.Sqlite.getProfileData(a,function(i){var h={};if(typeof(i)=="string"){h=Ext.decode(i);f.processResponse(true,b,e,h,g,d)}else{f.processResponse(false,b,e,h,g,d)}});return e}});
Ext.define("Ext.data.writer.Json",{extend:"Ext.data.writer.Writer",alternateClassName:"Ext.data.JsonWriter",alias:"writer.json",config:{rootProperty:undefined,encode:false,allowSingle:true,encodeRequest:false},applyRootProperty:function(a){if(!a&&(this.getEncode()||this.getEncodeRequest())){a="data"}return a},writeRecords:function(d,e){var a=this.getRootProperty(),f=d.getParams(),b=this.getAllowSingle(),c;if(this.getAllowSingle()&&e&&e.length==1){e=e[0]}if(this.getEncodeRequest()){c=d.getJsonData()||{};if(e&&(e.length||(b&&Ext.isObject(e)))){c[a]=e}d.setJsonData(Ext.apply(c,f||{}));d.setParams(null);d.setMethod("POST");return d}if(!e||!(e.length||(b&&Ext.isObject(e)))){return d}if(this.getEncode()){if(a){f[a]=Ext.encode(e)}else{Ext.Logger.error("Must specify a root when using encode")}}else{c=d.getJsonData()||{};if(a){c[a]=e}else{c=e}d.setJsonData(c)}return d}},function(){this.override({constructor:function(a){a=a||{};if(a.root){Ext.Logger.deprecate("root has been deprecated as a configuration on Writer. Please use rootProperty instead.");a.rootProperty=a.root;delete a.root}this.callOverridden([a])}})});
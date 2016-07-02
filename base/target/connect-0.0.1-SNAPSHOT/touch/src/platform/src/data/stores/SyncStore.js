Ext.data.SyncStore=Ext.extend(Object,{constructor:function(a){Ext.data.utilities.check("SyncStore","constructor","config",a,["database_name","localStorageProxy"]);this.local=a.localStorageProxy;this.readConfig("index",function(b){this.index=b||{}},this)},create:function(b,d,c){var a=new Ext.data.Operation({records:b});this.local.create(a,d,c)},read:function(c,d,b){var a=new Ext.data.Operation({action:"read",id:c});this.local.read(a,function(f){var e;if(f.resultSet.count==1){e=f.resultSet.records[0];Ext.apply(e,Ext.data.SyncModel)}else{}d.call(b,e)},this)},update:function(b,d,c){var a=new Ext.data.Operation({action:"update",records:b});this.local.update(a,d,c)},destroy:function(d,f,c){var e={};e[Ext.data.SyncModel.OID]=d;var b=[new this.local.model(e)];var a=new Ext.data.Operation({action:"destroy",records:b});this.local.destroy(a,f,c)},clear:function(b,a){this.local.clear();b.call(a)},setModel:function(a,b){this.model=a;this.local.setModel(a,b)},readConfig:function(c,e,a){var b=this.local.getStorageObject().getItem(this.local.id+"-"+c);var d=b?Ext.decode(b):{};e.call(a,d)},writeConfig:function(b,c,d,a){this.local.getStorageObject().setItem(this.local.id+"-"+b,Ext.encode(c));d.call(a,c)},indexUpdate:function(d,b,c,a){if(!c){throw"ERROR - SyncStore - indexUpdate - no callback provided"}console.log("SyncStore - indexUpdate -",d,"=>",b);this.index[d]=b;this.writeConfig("index",this.index,c,a)},indexLookup:function(d,c,a){if(!c){throw"ERROR - SyncStore - indexLookup - no callback provided"}var b=this.index[d];console.log("SyncStore - indexLookup -",d,"=>",b);c.call(a,b)},readValue:function(a,d,b){var c=this.local.getStorageObject().getItem(a);d.call(b,c)},writeValue:function(a,c,d,b){this.local.getStorageObject().setItem(a,c);d.call(b)},forEachRecordAsync:function(f,e,c,d){if(!f){throw"ERROR - SyncStore - forEachRecordAsync - no 'each' callback provided"}if(!c){throw"ERROR - SyncStore - forEachRecordAsync - no 'done' callback provided"}var a=new Ext.data.Operation({action:"read"});var b=this.local.getIds();Ext.data.array.forEachAsync(b,function(i,g,h){a.id=i;this.local.read(a,function(k){if(k.resultSet.count==1){var j=k.resultSet.records[0];f.call(e,j,g,h)}else{throw"ERROR - SyncStore - forEachRecordAsync - no record for id "+i;g.call(h)}},this)},this,c,d)}});
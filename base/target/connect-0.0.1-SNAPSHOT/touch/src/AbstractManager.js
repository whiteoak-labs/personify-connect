Ext.define("Ext.AbstractManager",{requires:["Ext.util.HashMap"],typeName:"type",constructor:function(a){Ext.apply(this,a||{});this.all=Ext.create("Ext.util.HashMap");this.types={}},get:function(a){return this.all.get(a)},register:function(a){this.all.add(a)},unregister:function(a){this.all.remove(a)},registerType:function(b,a){this.types[b]=a;a[this.typeName]=b},isRegistered:function(a){return this.types[a]!==undefined},create:function(a,d){var b=a[this.typeName]||a.type||d,c=this.types[b];if(c==undefined){Ext.Error.raise("The '"+b+"' type has not been registered with this manager")}return new c(a)},onAvailable:function(e,c,b){var a=this.all,d;if(a.containsKey(e)){d=a.get(e);c.call(b||d,d)}else{a.on("add",function(h,f,g){if(f==e){c.call(b||g,g);a.un("add",c,b)}})}},each:function(b,a){this.all.each(b,a||this)},getCount:function(){return this.all.getCount()}});
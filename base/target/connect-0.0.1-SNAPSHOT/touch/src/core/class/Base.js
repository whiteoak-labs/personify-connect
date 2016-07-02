(function(a){var c=[],b=function(){};Ext.apply(b,{$className:"Ext.Base",$isClass:true,create:function(){return Ext.create.apply(Ext,[this].concat(Array.prototype.slice.call(arguments,0)))},extend:function(h){var d=h.prototype,f,g,j,e,k;f=this.prototype=Ext.Object.chain(d);f.self=this;this.superclass=f.superclass=d;if(!h.$isClass){Ext.apply(f,Ext.Base.prototype);f.constructor=function(){d.constructor.apply(this,arguments)}}k=d.$inheritableStatics;if(k){for(g=0,j=k.length;g<j;g++){e=k[g];if(!this.hasOwnProperty(e)){this[e]=h[e]}}}if(h.$onExtended){this.$onExtended=h.$onExtended.slice()}f.config=f.defaultConfig=new f.configClass;f.initConfigList=f.initConfigList.slice();f.initConfigMap=Ext.Object.chain(f.initConfigMap)},"$onExtended":[],triggerExtended:function(){var f=this.$onExtended,e=f.length,d,g;if(e>0){for(d=0;d<e;d++){g=f[d];g.fn.apply(g.scope||this,arguments)}}},onExtended:function(e,d){this.$onExtended.push({fn:e,scope:d});return this},addConfig:function(f,i){var j=this.prototype,g=j.initConfigList,e=j.initConfigMap,h=j.defaultConfig,l,d,k;i=Boolean(i);for(d in f){if(f.hasOwnProperty(d)&&(i||!(d in h))){k=f[d];l=e[d];if(k!==null){if(!l){e[d]=true;g.push(d)}}else{if(l){e[d]=false;Ext.Array.remove(g,d)}}}}if(i){Ext.merge(h,f)}else{Ext.mergeIf(h,f)}j.configClass=Ext.Object.classify(h)},addStatics:function(d){var g,e;var f=Ext.getClassName(this);for(e in d){if(d.hasOwnProperty(e)){g=d[e];if(typeof g=="function"){g.displayName=f+"."+e}this[e]=g}}return this},addInheritableStatics:function(e){var i,d,g=this.prototype,f,j;i=g.$inheritableStatics;d=g.$hasInheritableStatics;if(!i){i=g.$inheritableStatics=[];d=g.$hasInheritableStatics={}}var h=Ext.getClassName(this);for(f in e){if(e.hasOwnProperty(f)){j=e[f];if(typeof j=="function"){j.displayName=h+"."+f}this[f]=j;if(!d[f]){d[f]=true;i.push(f)}}}return this},addMembers:function(d){var f=this.prototype,h=[],e,i;var g=this.$className||"";for(e in d){if(d.hasOwnProperty(e)){i=d[e];if(typeof i=="function"&&!i.$isClass&&i!==Ext.emptyFn){i.$owner=this;i.$name=e;i.displayName=g+"#"+e}f[e]=i}}return this},addMember:function(d,e){if(typeof e=="function"&&!e.$isClass&&e!==Ext.emptyFn){e.$owner=this;e.$name=d;e.displayName=(this.$className||"")+"#"+d}this.prototype[d]=e;return this},implement:function(){this.addMembers.apply(this,arguments)},borrow:function(h,f){var n=this.prototype,m=h.prototype,k=Ext.getClassName(this),g,j,e,l,d;f=Ext.Array.from(f);for(g=0,j=f.length;g<j;g++){e=f[g];d=m[e];if(typeof d=="function"){l=function(){return d.apply(this,arguments)};if(k){l.displayName=k+"#"+e}l.$owner=this;l.$name=e;n[e]=l}else{n[e]=d}}return this},override:function(g){var p=this,r=Ext.enumerables,m=p.prototype,i=Ext.Function.clone,k=m.config,e,l,h,q,o,j,f,d;if(arguments.length===2){e=g;g={};g[e]=arguments[1];r=null}do{o=[];q=null;for(e in g){if(e=="statics"){q=g[e]}else{if(e=="config"){f=g[e];for(d in f){if(!(d in k)){throw new Error("Attempting to override a non-existant config property. This is not supported, you must extend the Class.")}}p.addConfig(f,true)}else{o.push(e)}}}if(r){o.push.apply(o,r)}for(l=o.length;l--;){e=o[l];if(g.hasOwnProperty(e)){h=g[e];if(typeof h=="function"&&!h.$className&&h!==Ext.emptyFn){if(typeof h.$owner!="undefined"){h=i(h)}var n=p.$className;if(n){h.displayName=n+"#"+e}h.$owner=p;h.$name=e;j=m[e];if(j){h.$previous=j}}m[e]=h}}m=p;g=q}while(g);return this},callParent:function(d){var e;return(e=this.callParent.caller)&&(e.$previous||((e=e.$owner?e:e.caller)&&e.$owner.superclass.$class[e.$name])).apply(this,d||c)},mixin:function(f,h){var d=h.prototype,e=this.prototype,g;if(typeof d.onClassMixedIn!="undefined"){d.onClassMixedIn.call(h,this)}if(!e.hasOwnProperty("mixins")){if("mixins" in e){e.mixins=Ext.Object.chain(e.mixins)}else{e.mixins={}}}for(g in d){if(g==="mixins"){Ext.merge(e.mixins,d[g])}else{if(typeof e[g]=="undefined"&&g!="mixinId"&&g!="config"){e[g]=d[g]}}}if("config" in d){this.addConfig(d.config,false)}e.mixins[f]=d},getName:function(){return Ext.getClassName(this)},createAlias:a(function(e,d){this.override(e,function(){return this[d].apply(this,arguments)})}),addXtype:function(h){var e=this.prototype,g=e.xtypesMap,f=e.xtypes,d=e.xtypesChain;if(!e.hasOwnProperty("xtypesMap")){g=e.xtypesMap=Ext.merge({},e.xtypesMap||{});f=e.xtypes=e.xtypes?[].concat(e.xtypes):[];d=e.xtypesChain=e.xtypesChain?[].concat(e.xtypesChain):[];e.xtype=h}if(!g[h]){g[h]=true;f.push(h);d.push(h);Ext.ClassManager.setAlias(this,"widget."+h)}return this}});b.implement({isInstance:true,$className:"Ext.Base",configClass:Ext.emptyFn,initConfigList:[],initConfigMap:{},statics:function(){var e=this.statics.caller,d=this.self;if(!e){return d}return e.$owner},callParent:function(f){var h,d=(h=this.callParent.caller)&&(h.$previous||((h=h.$owner?h:h.caller)&&h.$owner.superclass[h.$name]));if(!d){h=this.callParent.caller;var g,e;if(!h.$owner){if(!h.caller){throw new Error("Attempting to call a protected method from the public scope, which is not allowed")}h=h.caller}g=h.$owner.superclass;e=h.$name;if(!(e in g)){throw new Error("this.callParent() was called but there's no such method ("+e+") found in the parent class ("+(Ext.getClassName(g)||"Object")+")")}}return d.apply(this,f||c)},callSuper:function(f){var h,d=(h=this.callSuper.caller)&&((h=h.$owner?h:h.caller)&&h.$owner.superclass[h.$name]);if(!d){h=this.callSuper.caller;var g,e;if(!h.$owner){if(!h.caller){throw new Error("Attempting to call a protected method from the public scope, which is not allowed")}h=h.caller}g=h.$owner.superclass;e=h.$name;if(!(e in g)){throw new Error("this.callSuper() was called but there's no such method ("+e+") found in the parent class ("+(Ext.getClassName(g)||"Object")+")")}}return d.apply(this,f||c)},callOverridden:function(d){var e=this.callOverridden.caller;return e&&e.$previous.apply(this,d||c)},self:b,constructor:function(){return this},wasInstantiated:false,initConfig:function(m){var l=Ext.Class.configNameCache,p=this.self.prototype,h=this.initConfigList,f=this.initConfigMap,g=new this.configClass,j=this.defaultConfig,k,o,e,q,n,d;this.initConfig=Ext.emptyFn;this.initialConfig=m||{};if(m){Ext.merge(g,m)}this.config=g;if(!p.hasOwnProperty("wasInstantiated")){p.wasInstantiated=true;for(k=0,o=h.length;k<o;k++){e=h[k];n=l[e];q=j[e];if(!(n.apply in p)&&!(n.update in p)&&p[n.set].$isDefault&&typeof q!="object"){p[n.internal]=j[e];f[e]=false;Ext.Array.remove(h,e);k--;o--}}}if(m){h=h.slice();for(e in m){if(e in j&&!f[e]){h.push(e)}}}for(k=0,o=h.length;k<o;k++){e=h[k];n=l[e];this[n.get]=this[n.initGet]}this.beforeInitConfig(g);for(k=0,o=h.length;k<o;k++){e=h[k];n=l[e];d=n.get;if(this.hasOwnProperty(d)){this[n.set].call(this,g[e]);delete this[d]}}return this},beforeInitConfig:Ext.emptyFn,getCurrentConfig:function(){var d=this.defaultConfig,g=Ext.Class.configNameCache,f={},e,h;for(e in d){h=g[e];f[e]=this[h.get].call(this)}return f},setConfig:function(e,l){if(!e){return this}var h=Ext.Class.configNameCache,j=this.config,f=this.defaultConfig,o=this.initialConfig,k=[],d,g,n,m;l=Boolean(l);for(d in e){if((l&&(d in o))){continue}j[d]=e[d];if(d in f){k.push(d);m=h[d];this[m.get]=this[m.initGet]}}for(g=0,n=k.length;g<n;g++){d=k[g];m=h[d];this[m.set].call(this,e[d]);delete this[m.get]}return this},set:function(d,e){return this[Ext.Class.configNameCache[d].set].call(this,e)},get:function(d){return this[Ext.Class.configNameCache[d].get].call(this)},getConfig:function(d){return this[Ext.Class.configNameCache[d].get].call(this)},hasConfig:function(d){return(d in this.defaultConfig)},getInitialConfig:function(e){var d=this.config;if(!e){return d}else{return d[e]}},onConfigUpdate:function(k,m,n){var o=this.self,j=o.$className,f,h,d,g,l,e;k=Ext.Array.from(k);n=n||this;for(f=0,h=k.length;f<h;f++){d=k[f];g="update"+Ext.String.capitalize(d);l=this[g]||Ext.emptyFn;e=function(){l.apply(this,arguments);n[m].apply(n,arguments)};e.$name=g;e.$owner=o;e.displayName=j+"#"+g;this[g]=e}},link:function(d,e){this.$links={};this.link=this.doLink;return this.link.apply(this,arguments)},doLink:function(d,e){this.$links[d]=true;this[d]=e;return e},unlink:function(){var d,f,e,g;for(d=0,f=arguments.length;d<f;d++){e=arguments[d];if(this.hasOwnProperty(e)){g=this[e];if(g){if(g.isInstance&&!g.isDestroyed){g.destroy()}else{if(g.parentNode&&"nodeType" in g){g.parentNode.removeChild(g)}}}delete this[e]}}return this},destroy:function(){this.destroy=Ext.emptyFn;this.isDestroyed=true;if(this.hasOwnProperty("$links")){this.unlink.apply(this,Ext.Object.getKeys(this.$links));delete this.$links}}});Ext.Base=b})(Ext.Function.flexSetter);
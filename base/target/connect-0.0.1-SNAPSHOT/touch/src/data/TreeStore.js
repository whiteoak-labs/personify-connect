Ext.define("Ext.data.TreeStore",{extend:"Ext.data.NodeStore",alias:"store.tree",config:{root:undefined,clearOnLoad:true,nodeParam:"node",defaultRootId:"root",defaultRootProperty:"children",recursive:true},applyProxy:function(){return Ext.data.Store.prototype.applyProxy.apply(this,arguments)},applyRoot:function(a){var b=this;a=a||{};a=Ext.apply({},a);if(!a.isModel){Ext.applyIf(a,{id:b.getStoreId()+"-"+b.getDefaultRootId(),text:"Root",allowDrag:false});a=Ext.data.ModelManager.create(a,b.getModel())}Ext.data.NodeInterface.decorate(a);a.set(a.raw);return a},handleTreeInsertionIndex:function(a,b,d,c){if(b.parentNode){b.parentNode.sort(d.getSortFn(),true,true)}return this.callParent(arguments)},handleTreeSort:function(a,b){if(this._sorting){return a}this._sorting=true;this.getNode().sort(b.getSortFn(),true,true);delete this._sorting;return this.callParent(arguments)},updateRoot:function(a,b){if(b){b.unBefore({expand:"onNodeBeforeExpand",scope:this});b.unjoin(this)}a.onBefore({expand:"onNodeBeforeExpand",scope:this});this.onNodeAppend(null,a);this.setNode(a);if(!a.isLoaded()&&!a.isLoading()&&a.isExpanded()){this.load({node:a})}this.fireEvent("rootchange",this,a,b)},getNodeById:function(a){return this.data.getByKey(a)},getById:function(a){return this.data.getByKey(a)},onNodeBeforeExpand:function(b,a,c){if(b.isLoading()){c.pause();this.on("load",function(){c.resume()},this,{single:true})}else{if(!b.isLoaded()){c.pause();this.load({node:b,callback:function(){c.resume()}})}}},onNodeAppend:function(n,c){var l=this.getProxy(),j=l.getReader(),b=this.getModel(),g=c.raw,d=[],a=j.getRootProperty(),m,h,f,k,e;if(!c.isLeaf()){m=j.getRoot(g);if(m){h=j.extractData(m);for(f=0,k=h.length;f<k;f++){e=h[f];d.push(new b(e.data,e.id,e.node))}if(d.length){this.fillNode(c,d)}else{c.set("loaded",true)}delete g[a]}}},updateAutoLoad:function(b){if(b){var a=this.getRoot();if(!a.isLoaded()&&!a.isLoading()){this.load({node:a})}}},load:function(a){a=a||{};a.params=a.params||{};var c=this,b=a.node=a.node||c.getRoot();a.params[c.getNodeParam()]=b.getId();if(c.getClearOnLoad()){b.removeAll(true)}b.set("loading",true);return c.callParent([a])},updateProxy:function(b){this.callParent(arguments);var a=b.getReader();if(!a.getRootProperty()){a.setRootProperty(this.getDefaultRootProperty());a.buildExtractors()}},removeAll:function(){this.getRoot().removeAll(true);this.callParent(arguments)},onProxyLoad:function(b){var d=this,a=b.getRecords(),e=b.wasSuccessful(),c=b.getNode();c.beginEdit();c.set("loading",false);if(e){a=d.fillNode(c,a)}c.endEdit();d.loading=false;d.loaded=true;c.fireEvent("load",c,a,e);d.fireEvent("load",this,a,e,b);Ext.callback(b.getCallback(),b.getScope()||d,[a,b,e])},fillNode:function(d,a){var c=a?a.length:0,b,e;for(b=0;b<c;b++){e=d.appendChild(a[b],true,true);this.onNodeAppend(d,e)}d.set("loaded",true);return a}},function(){this.override({setRootNode:function(a){Ext.Logger.warn("setRootNode has been deprecated. Please use setRoot instead.");return this.setRoot(a)},getRootNode:function(a){Ext.Logger.warn("getRootNode has been deprecated. Please use getRoot instead.");return this.getRoot()}})});
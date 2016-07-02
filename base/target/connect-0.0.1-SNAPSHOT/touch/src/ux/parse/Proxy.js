Ext.define("Ext.ux.parse.Proxy",{extend:"Ext.data.proxy.Server",alias:"proxy.parse",requires:["Ext.data.Request","Ext.ux.parse.Reader","Ext.ux.parse.Helper"],config:{reader:"parse",loadAllPointers:false},checkParse:function(){if(window.Parse&&window.Parse.applicationId){return true}if(window.Parse){Ext.Logger.warn("You must set your Parse ApplicationID prior to calling any Proxy Functions")}else{Ext.Logger.warn("Parse not found, please include parse in your app.json or via script tag")}return false},create:function(a,c,b){this.write(a,c,b)},read:function(e,n,p){if(this.checkParse()===false){return}var l=this,g=e.getModel(),o=g.getParseClass(),b=l.createCallback(e,n,p),a=e.getFilters(),d=e.getLimit(),k=e.getSorters(),c=e.getParams()||{},i=e.getPage(),f=c.queryModifier,m=c.queryModifierScope,j=c.query||ParseHelper.getQuery(o);if(Ext.isFunction(j)){j=j.call(c.queryScope||this)}l.applyPointers(j,g,c.loadAllPointers);if(c&&c.query){j.find({success:function(q){b.apply(l,[true,q])},error:function(q,r){b.apply(l,false,q,r)}})}else{if(c&&c.id){j.get(c.id,{success:function(q){b.apply(l,[true,q])},error:function(q,r){b.apply(l,[false,q,r])}})}else{l.applyFilters(j,a);l.applyLimit(j,d);l.applySorters(j,k);l.applyQueryModifier(j,f,m);if(d&&i){l.applySkip(j,(i-1)*d)}var h=j.collection();h.fetch({success:function(q){b.apply(l,[true,q])},error:function(q,r){b.apply(l,false,q,r)}})}}},update:function(a,c,b){this.write(a,c,b)},destroy:function(a,c,b){this.write(a,c,b)},write:function(d,h,i){if(this.checkParse()===false){return}var e=Ext.Array.clone(d.getRecords()),f=this,a=[],c=d.getAction(),g=c==="destroy"?Parse.Object.destroyAll:Parse.Object.saveAll,b=f.createCallback(d,h,i);Ext.Array.forEach(e,function(j){if(j.isParseModel){a.push(j.getParseObject())}});g(a,{success:function(j){if(c=="destroy"){b.apply(f,[true,a])}else{b.apply(f,[true,j])}},error:function(j){b.apply(f,[false,[],j])}})},batch:function(q){var m=this,a=q.operations,c=q.listeners&&q.listeners.complete?q.listeners.complete:null,o=q.listeners&&q.listeners.scope?q.listeners.scope:null,j=m.getModel(),b=a.create||[],k=a.update||[],f=a.destroy||[],p=new Ext.data.Operation({action:"create",records:b,model:j}),h=new Ext.data.Operation({action:"update",records:k,model:j}),d=new Ext.data.Operation({action:"destroy",records:f,model:j}),l=[p,h,d],g={operations:Ext.Array.clone(l),hasException:false},e,n,i=function(){e=l.shift();if(e){if(e.getRecords().length>0){n=m[e.getAction()];n.call(m,e,function(r){if(r.hasException()){g.hasException=true}i()},m)}else{i()}}else{if(c){c.apply(o,[g])}m.onBatchComplete.apply(m,[q,g])}};i()},createCallback:function(a,d,b){var c=this;return function(g,e,f){if(!g){e=f}c.processResponse(g,a,{},e,d,b)}},applyFields:function(e,d){var c=d.getParseClass(),b=d.getFields(),a;b.each(function(f){a=c+"."+f.getName();e.include(a)})},applyPointers:function(j,g,c){var k=this,i=[g.getParseClass()],m=[],e,a,l,h,f,b=(c===true||this.getLoadAllPointers()===true);function d(n){if(m.indexOf(n)>=0){return}m.push(n);k.applyFields(j,n);e=n.getAssociations();e.each(function(o){a=o.getAssociatedModel();l=o.getName();h=o.getType();f=h==="pointer"?o.getInclude():false;if((f||b)&&(h==="pointer"&&i.indexOf(l)===-1)){j.include(l);i.push(l)}d(a)})}d(g)},applyFilters:function(e,b){if(b){var d,c,f,a;Ext.Array.forEach(b,function(g){d=g.getProperty();c=g.getValue();f=g.getAnyMatch();a=g.getCaseSensitive();if(Ext.isString(c)&&a&&f){if(f){e.contains(d,c)}else{e.equalTo(d,c)}}else{if(Ext.isString(c)){c=new RegExp((!f?"^":"")+c)}}if(c instanceof RegExp){console.log("RegExp");e.matches(d,c,!a?"i":"")}})}},applyLimit:function(b,a){b.limit(a)},applySkip:function(b,a){b.skip(a)},applyQueryModifier:function(c,a,b){if(a&&Ext.isFunction(a)){a.call(b||this,c)}},applySorters:function(b,d){if(d){var a,c;Ext.Array.forEach(filters,function(e){a=e.getProperty();c=e.getDirection();if(c==="DESC"){b.descending(a)}else{b.ascending(a)}})}},setException:function(b,a){if(Ext.isObject(a)){b.setException({status:a.code,statusText:a.message})}}});
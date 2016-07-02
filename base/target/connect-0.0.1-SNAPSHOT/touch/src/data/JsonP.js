Ext.define("Ext.data.JsonP",{alternateClassName:"Ext.util.JSONP",singleton:true,requestCount:0,requests:{},timeout:30000,disableCaching:true,disableCachingParam:"_dc",callbackKey:"callback",request:function(m){m=Ext.apply({},m);if(!m.url){Ext.Logger.error("A url must be specified for a JSONP request.")}var i=this,d=Ext.isDefined(m.disableCaching)?m.disableCaching:i.disableCaching,g=m.disableCachingParam||i.disableCachingParam,c=++i.requestCount,k=m.callbackName||"callback"+c,h=m.callbackKey||i.callbackKey,l=Ext.isDefined(m.timeout)?m.timeout:i.timeout,e=Ext.apply({},m.params),b=m.url,a=Ext.isSandboxed?Ext.getUniqueGlobalNamespace():"Ext",f,j;e[h]=a+".data.JsonP."+k;if(d){e[g]=new Date().getTime()}j=i.createScript(b,e,m);i.requests[c]=f={url:b,params:e,script:j,id:c,scope:m.scope,success:m.success,failure:m.failure,callback:m.callback,callbackKey:h,callbackName:k};if(l>0){f.timeout=setTimeout(Ext.bind(i.handleTimeout,i,[f]),l)}i.setupErrorHandling(f);i[k]=Ext.bind(i.handleResponse,i,[f],true);i.loadScript(f);return f},abort:function(b){var c=this.requests,a;if(b){if(!b.id){b=c[b]}this.handleAbort(b)}else{for(a in c){if(c.hasOwnProperty(a)){this.abort(c[a])}}}},setupErrorHandling:function(a){a.script.onerror=Ext.bind(this.handleError,this,[a])},handleAbort:function(a){a.errorType="abort";this.handleResponse(null,a)},handleError:function(a){a.errorType="error";this.handleResponse(null,a)},cleanupErrorHandling:function(a){a.script.onerror=null},handleTimeout:function(a){a.errorType="timeout";this.handleResponse(null,a)},handleResponse:function(a,b){var c=true;if(b.timeout){clearTimeout(b.timeout)}delete this[b.callbackName];delete this.requests[b.id];this.cleanupErrorHandling(b);Ext.fly(b.script).destroy();if(b.errorType){c=false;Ext.callback(b.failure,b.scope,[b.errorType,b])}else{Ext.callback(b.success,b.scope,[a,b])}Ext.callback(b.callback,b.scope,[c,a,b.errorType,b])},createScript:function(c,d,b){var a=document.createElement("script");a.setAttribute("src",Ext.urlAppend(c,Ext.Object.toQueryString(d)));a.setAttribute("async",true);a.setAttribute("type","text/javascript");return a},loadScript:function(a){Ext.getHead().appendChild(a.script)}});
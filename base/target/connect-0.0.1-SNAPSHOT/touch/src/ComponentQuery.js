Ext.define("Ext.ComponentQuery",{singleton:true,uses:["Ext.ComponentManager"]},function(){var g=this,j=["var r = [],","i = 0,","it = items,","l = it.length,","c;","for (; i < l; i++) {","c = it[i];","if (c.{0}) {","r.push(c);","}","}","return r;"].join(""),e=function(o,n){return n.method.apply(this,[o].concat(n.args))},a=function(p,t){var n=[],q=0,s=p.length,r,o=t!==">";for(;q<s;q++){r=p[q];if(r.getRefItems){n=n.concat(r.getRefItems(o))}}return n},f=function(o){var n=[],p=0,r=o.length,q;for(;p<r;p++){q=o[p];while(!!(q=(q.ownerCt||q.floatParent))){n.push(q)}}return n},l=function(o,t,s){if(t==="*"){return o.slice()}else{var n=[],p=0,r=o.length,q;for(;p<r;p++){q=o[p];if(q.isXType(t,s)){n.push(q)}}return n}},i=function(o,r){var t=Ext.Array,n=[],p=0,s=o.length,q;for(;p<s;p++){q=o[p];if(q.el?q.el.hasCls(r):t.contains(q.initCls(),r)){n.push(q)}}return n},m=function(s,y,o,w){var A=[],r=0,n=s.length,z,t,q;for(;r<n;r++){z=s[r];t=Ext.Class.getConfigNameMap(y).get;if(o==="~="){q=null;if(z[t]){q=z[t]()}else{if(z.config&&z.config[y]){q=String(z.config[y])}else{if(z[y]){q=String(z[y])}}}if(q){if(!Ext.isArray(q)){q=q.split(" ")}var x=0,u=q.length,p;for(;x<u;x++){p=String(q[x]).split(" ");if(Ext.Array.indexOf(p,w)!==-1){A.push(z)}}}}else{if(z[t]){q=z[t]();if(!w?!!q:(String(q)===w)){A.push(z)}}else{if(z.config&&z.config[y]){if(!w?!!z.config[y]:(String(z.config[y])===w)){A.push(z)}}else{if(!w?!!z[y]:(String(z[y])===w)){A.push(z)}}}}}return A},d=function(o,s){var n=[],p=0,r=o.length,q;for(;p<r;p++){q=o[p];if(q.getId()===s||q.getItemId()===s){n.push(q)}}return n},k=function(n,o,p){return g.pseudos[o](n,p)},h=/^(\s?([>\^])\s?|\s|$)/,c=/^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,b=[{re:/^\.([\w\-]+)(?:\((true|false)\))?/,method:l},{re:/^(?:[\[](?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]])/,method:m},{re:/^#([\w\-]+)/,method:d},{re:/^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,method:k},{re:/^(?:\{([^\}]+)\})/,method:j}];g.Query=Ext.extend(Object,{constructor:function(n){n=n||{};Ext.apply(this,n)},execute:function(o){var q=this.operations,r=0,s=q.length,p,n;if(!o){n=Ext.ComponentManager.all.getArray()}else{if(Ext.isArray(o)){n=o}}for(;r<s;r++){p=q[r];if(p.mode==="^"){n=f(n||[o])}else{if(p.mode){n=a(n||[o],p.mode)}else{n=e(n||a([o]),p)}}if(r===s-1){return n}}return[]},is:function(p){var o=this.operations,s=Ext.isArray(p)?p:[p],n=s.length,t=o[o.length-1],r,q;s=e(s,t);if(s.length===n){if(o.length>1){for(q=0,r=s.length;q<r;q++){if(Ext.Array.indexOf(this.execute(),s[q])===-1){return false}}}return true}return false}});Ext.apply(this,{cache:{},pseudos:{not:function(t,n){var u=Ext.ComponentQuery,r=0,s=t.length,q=[],p=-1,o;for(;r<s;++r){o=t[r];if(!u.is(o,n)){q[++p]=o}}return q}},query:function(o,v){var w=o.split(","),n=w.length,p=0,q=[],x=[],u={},s,r,t;for(;p<n;p++){o=Ext.String.trim(w[p]);s=this.parse(o);q=q.concat(s.execute(v))}if(n>1){r=q.length;for(p=0;p<r;p++){t=q[p];if(!u[t.id]){x.push(t);u[t.id]=true}}q=x}return q},is:function(o,n){if(!n){return true}var p=this.cache[n];if(!p){this.cache[n]=p=this.parse(n)}return p.is(o)},parse:function(q){var o=[],p=b.length,u,r,v,w,x,s,t,n;while(q&&u!==q){u=q;r=q.match(c);if(r){v=r[1];if(v==="#"){o.push({method:d,args:[Ext.String.trim(r[2])]})}else{if(v==="."){o.push({method:i,args:[Ext.String.trim(r[2])]})}else{o.push({method:l,args:[Ext.String.trim(r[2]),Boolean(r[3])]})}}q=q.replace(r[0],"")}while(!(w=q.match(h))){for(s=0;q&&s<p;s++){t=b[s];x=q.match(t.re);n=t.method;if(x){o.push({method:Ext.isString(t.method)?Ext.functionFactory("items",Ext.String.format.apply(Ext.String,[n].concat(x.slice(1)))):t.method,args:x.slice(1)});q=q.replace(x[0],"");break}if(s===(p-1)){Ext.Error.raise('Invalid ComponentQuery selector: "'+arguments[0]+'"')}}}if(w[1]){o.push({mode:w[2]||w[1]});q=q.replace(w[0],"")}}return new g.Query({operations:o})}})});
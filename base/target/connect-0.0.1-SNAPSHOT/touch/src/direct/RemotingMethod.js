Ext.define("Ext.direct.RemotingMethod",{config:{name:null,params:null,formHandler:null,len:null,ordered:true},constructor:function(a){this.initConfig(a)},applyParams:function(f){if(Ext.isNumber(f)){this.setLen(f)}else{if(Ext.isArray(f)){this.setOrdered(false);var d=f.length,b=[],c,e,a;for(c=0;c<d;c++){e=f[c];a=Ext.isObject(e)?e.name:e;b.push(a)}return b}}},getArgs:function(e,a,f){var b=[],c,d;if(this.getOrdered()){if(this.getLen()>0){if(a){for(c=0,d=a.length;c<d;c++){b.push(e[a[c]])}}else{if(f){b.push(e)}}}}else{b.push(e)}return b},getCallData:function(c){var e=this,f=null,a=e.getLen(),g=e.getParams(),h,d,b;if(e.getOrdered()){h=c[a];d=c[a+1];if(a!==0){f=c.slice(0,a)}}else{f=Ext.apply({},c[0]);h=c[1];d=c[2];for(b in f){if(f.hasOwnProperty(b)){if(!Ext.Array.contains(g,b)){delete f[b]}}}}return{data:f,callback:h,scope:d}}});
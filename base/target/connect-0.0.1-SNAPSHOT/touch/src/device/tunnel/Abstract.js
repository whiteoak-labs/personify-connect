Ext.define("Ext.device.tunnel.Abstract",{requires:["Ext.Promise"],messageId:0,constructor:function(){this.pendingReceivePromises={};this.connections={};this.connectQueue=[];this.messageQueue=[]},broadcast:function(a){return Ext.Promise.from([])},connect:function(c){var b=this.connections,a=b[c];if(a){return Ext.Promise.from(a)}else{return this.send(c,"__CONNECT__").then(function(){b[c]=a=new Ext.device.tunnel.Connection(c);return a})}},send:function(g,c,e){var b=this.messageId++,a=new Ext.Promise(),d=this.doSend(g,b,c,e),f=this.pendingReceivePromises;f[b]=a;d.error(function(h){delete f[b];a.reject(h)});return a},onConnect:function(e){var a=this.connectQueue.slice(0),c,d,b;this.connectQueue.length=0;if(e){this.connectCallback=e;for(c=0,d=a.length;c<d;c++){b=a[c];this.onReceived.apply(this,b)}}},onMessage:function(e){var a=this.messageQueue.slice(0),c,d,b;this.messageQueue.length=0;if(e){this.messageCallback=e;for(c=0,d=a.length;c<d;c++){b=a[c];this.onReceived.apply(this,b)}}},onAppConnect:function(){return this.connectCallback.apply(this,arguments)},onAppMessage:function(d,c){var b=this.connections[d],a;if(b){a=b.receive(c)}if(typeof a=="undefined"){a=this.messageCallback.apply(this,arguments)}return a},onReceived:function(c){var k=c.appId,l=c.message,h=c.id,i=c.foreground,b=this.pendingReceivePromises,d=b[h],g=this.connectCallback,j=this.messageCallback,a;delete b[h];if(d){if(l.error){d.reject(l.error)}else{d.fulfill(l.success)}}else{try{if(l==="__CONNECT__"){if(!g){this.connectQueue.push(arguments);return}else{a=this.onAppConnect(k)}}else{if(!j){this.messageQueue.push(arguments);return}else{a=this.onAppMessage(k,l)}}if(a instanceof Ext.Promise){a.then(this,function(e){this.doSend(k,h,{success:e},i)},function(e){this.doSend(k,h,{error:e},i)})}else{this.doSend(k,h,{success:a},i)}}catch(f){this.doSend(k,h,{error:f},i)}}},doSend:Ext.emptyFn});
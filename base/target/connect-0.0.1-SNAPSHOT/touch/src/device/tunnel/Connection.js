Ext.define("Ext.device.tunnel.Connection",{constructor:function(a){this.receiverId=a},send:function(a,b){return Ext.device.Tunnel.send(this.receiverId,a,b)},receive:function(a){}});
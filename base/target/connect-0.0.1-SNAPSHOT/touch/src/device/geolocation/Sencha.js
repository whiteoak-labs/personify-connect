Ext.define("Ext.device.geolocation.Sencha",{extend:"Ext.device.geolocation.Abstract",getCurrentPosition:function(a){a=this.callParent([a]);Ext.apply(a,{command:"Geolocation#getCurrentPosition",callbacks:{success:a.success,failure:a.failure}});Ext.applyIf(a,{scope:this});delete a.success;delete a.failure;Ext.device.Communicator.send(a);return a},watchPosition:function(a){a=this.callParent([a]);Ext.apply(a,{command:"Geolocation#watchPosition",callbacks:{success:a.callback,failure:a.failure}});Ext.applyIf(a,{scope:this});delete a.callback;delete a.failure;Ext.device.Communicator.send(a);return a},clearWatch:function(){Ext.device.Communicator.send({command:"Geolocation#clearWatch"})}});
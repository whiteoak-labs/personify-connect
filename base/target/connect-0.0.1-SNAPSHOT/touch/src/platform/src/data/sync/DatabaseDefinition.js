Ext.data.DatabaseDefinition=Ext.extend(Ext.data.Config,{key:undefined,database_name:undefined,generation:undefined,system_name:undefined,system_names:{},replica_number:undefined,idProperty:undefined,idPropertyDefaultValue:undefined,version:1,constructor:function(a,c,b){Ext.data.utilities.check("DatabaseDefinition","constructor","config",a,["key","database_name","generation","system_name","replica_number"]);this.set(a);a.config_id="definition";Ext.data.DatabaseDefinition.superclass.constructor.call(this,a)},setReplicaNumber:function(c,d,a){var b=(this.replica_number!=c);this.replica_number=c;this.writeAndCallback(b,d,a)},addSystemName:function(a){this.system_names[a]=true},isKnownOf:function(a){return this.system_name===a||Ext.data.array.includes(this.system_names,a)},set:function(a,d,b){var c=Ext.data.utilities.copy(a,this,["key","database_name","generation","system_name","system_names","replica_number","idProperty","idPropertyDefaultValue","version","_id"]);this.writeAndCallback(c,d,b)},as_data:function(){var a={key:this.key,database_name:this.database_name,generation:this.generation,system_name:this.system_name,system_names:this.system_names,replica_number:this.replica_number,idProperty:this.idProperty,idPropertyDefaultValue:this.idPropertyDefaultValue,version:this.version};a[Ext.data.SyncModel.MODEL]="Ext.data.DatabaseDefinition";return Ext.data.DatabaseDefinition.superclass.as_data.call(this,a)},encode:function(){return{key:this.key,database_name:this.database_name,generation:this.generation,system_name:this.system_name,replica_number:this.replica_number,idProperty:this.idProperty,idPropertyDefaultValue:this.idPropertyDefaultValue}}});
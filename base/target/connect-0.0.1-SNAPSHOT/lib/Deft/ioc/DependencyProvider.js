Ext.define("Deft.ioc.DependencyProvider",{requires:["Deft.log.Logger"],config:{identifier:null,className:null,parameters:null,fn:null,value:void 0,singleton:true,eager:false},constructor:function(b){var a;this.initConfig(b);if((b.value!=null)&&b.value.constructor===Object){this.setValue(b.value)}if(this.getEager()){if(this.getValue()!=null){Ext.Error.raise({msg:"Error while configuring '"+(this.getIdentifier())+"': a 'value' cannot be created eagerly."})}if(!this.getSingleton()){Ext.Error.raise({msg:"Error while configuring '"+(this.getIdentifier())+"': only singletons can be created eagerly."})}}if(this.getClassName()!=null){a=Ext.ClassManager.get(this.getClassName());if(!(a!=null)){Deft.Logger.warn("Synchronously loading '"+(this.getClassName())+"'; consider adding Ext.require('"+(this.getClassName())+"') above Ext.onReady.");Ext.syncRequire(this.getClassName());a=Ext.ClassManager.get(this.getClassName())}if(!(a!=null)){Ext.Error.raise({msg:"Error while configuring rule for '"+(this.getIdentifier())+"': unrecognized class name or alias: '"+(this.getClassName())+"'"})}}if(!this.getSingleton()){if(this.getClassName()!=null){if(Ext.ClassManager.get(this.getClassName()).singleton){Ext.Error.raise({msg:"Error while configuring rule for '"+(this.getIdentifier())+"': singleton classes cannot be configured for injection as a prototype. Consider removing 'singleton: true' from the class definition."})}}if(this.getValue()!=null){Ext.Error.raise({msg:"Error while configuring '"+(this.getIdentifier())+"': a 'value' can only be configured as a singleton."})}}else{if((this.getClassName()!=null)&&(this.getParameters()!=null)){if(Ext.ClassManager.get(this.getClassName()).singleton){Ext.Error.raise({msg:"Error while configuring rule for '"+(this.getIdentifier())+"': parameters cannot be applied to singleton classes. Consider removing 'singleton: true' from the class definition."})}}}return this},resolve:function(c){var a,b;Deft.Logger.log("Resolving '"+(this.getIdentifier())+"'.");if(this.getValue()!==void 0){return this.getValue()}a=null;if(this.getFn()!=null){Deft.Logger.log("Executing factory function.");a=this.getFn().call(null,c)}else{if(this.getClassName()!=null){if(Ext.ClassManager.get(this.getClassName()).singleton){Deft.Logger.log("Using existing singleton instance of '"+(this.getClassName())+"'.");a=Ext.ClassManager.get(this.getClassName())}else{Deft.Logger.log("Creating instance of '"+(this.getClassName())+"'.");b=this.getParameters()!=null?[this.getClassName()].concat(this.getParameters()):[this.getClassName()];a=Ext.create.apply(this,b)}}else{Ext.Error.raise({msg:"Error while configuring rule for '"+(this.getIdentifier())+"': no 'value', 'fn', or 'className' was specified."})}}if(this.getSingleton()){this.setValue(a)}return a}});
Ext.define("Ext.behavior.Translatable",{extend:"Ext.behavior.Behavior",requires:["Ext.util.Translatable"],setConfig:function(c){var a=this.translatable,b=this.component;if(c){if(!a){this.translatable=a=new Ext.util.Translatable(c);a.setElement(b.renderElement);a.on("destroy","onTranslatableDestroy",this)}else{if(Ext.isObject(c)){a.setConfig(c)}}}else{if(a){a.destroy()}}return this},getTranslatable:function(){return this.translatable},onTranslatableDestroy:function(){delete this.translatable},onComponentDestroy:function(){var a=this.translatable;if(a){a.destroy()}}});
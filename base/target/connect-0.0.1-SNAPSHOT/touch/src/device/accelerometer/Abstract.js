Ext.define("Ext.device.accelerometer.Abstract",{config:{frequency:10000},getCurrentAcceleration:function(a){if(!a.success){Ext.Logger.warn("You need to specify a `success` function for #getCurrentAcceleration")}return a},watchAcceleration:function(b){var a=Ext.device.accelerometer.Abstract.prototype.config;b=Ext.applyIf(b,{frequency:a.frequency});if(!b.callback){Ext.Logger.warn("You need to specify a `callback` function for #watchAcceleration")}return b},clearWatch:Ext.emptyFn});
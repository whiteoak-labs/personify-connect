Ext.define("Ext.device.Camera",{singleton:true,requires:["Ext.device.Communicator","Ext.device.camera.Cordova","Ext.device.camera.Sencha","Ext.device.camera.Simulator"],constructor:function(){var a=Ext.browser.is;if(a.WebView){if(a.Cordova){return Ext.create("Ext.device.camera.Cordova")}else{if(a.Sencha){return Ext.create("Ext.device.camera.Sencha")}}}return Ext.create("Ext.device.camera.Simulator")}});
Ext.define("Ext.device.Notification",{singleton:true,requires:["Ext.device.Communicator","Ext.device.notification.Cordova","Ext.device.notification.Sencha","Ext.device.notification.Simulator"],constructor:function(){var a=Ext.browser.is;if(a.WebView){if(a.Cordova){return Ext.create("Ext.device.notification.Cordova")}else{if(a.Sencha){return Ext.create("Ext.device.notification.Sencha")}}}return Ext.create("Ext.device.notification.Simulator")}});
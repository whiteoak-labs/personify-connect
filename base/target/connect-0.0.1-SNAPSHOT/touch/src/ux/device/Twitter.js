Ext.define("Ext.ux.device.Twitter",{singleton:true,requires:["Ext.device.Communicator","Ext.ux.device.twitter.Cordova"],constructor:function(){var a=Ext.browser.is;if(a.WebView&&a.Cordova){return Ext.create("Ext.ux.device.twitter.Cordova")}else{return Ext.create("Ext.ux.device.twitter.Abstract")}}});
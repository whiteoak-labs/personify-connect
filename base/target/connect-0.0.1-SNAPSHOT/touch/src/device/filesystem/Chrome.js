Ext.define("Ext.device.filesystem.Chrome",{extend:"Ext.device.filesystem.HTML5",requestFileSystem:function(b){var c=this;b=Ext.device.filesystem.Abstract.prototype.requestFileSystem(b);var a=function(d){var e=Ext.create("Ext.device.filesystem.FileSystem",d);b.success.call(b.scope||c,e)};if(b.type==window.PERSISTENT){if(navigator.webkitPersistentStorage){navigator.webkitPersistentStorage.requestQuota(b.size,function(d){window.webkitRequestFileSystem(b.type,d,a,b.failure)})}else{window.webkitStorageInfo.requestQuota(window.PERSISTENT,b.size,function(d){window.webkitRequestFileSystem(b.type,d,a,b.failure)})}}else{window.webkitRequestFileSystem(b.type,b.size,a,b.failure)}}});
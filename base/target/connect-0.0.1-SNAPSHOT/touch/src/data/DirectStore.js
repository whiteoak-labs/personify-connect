Ext.define("Ext.data.DirectStore",{extend:"Ext.data.Store",alias:"store.direct",requires:["Ext.data.proxy.Direct"],config:{proxy:{type:"direct",reader:{type:"json"}}}});
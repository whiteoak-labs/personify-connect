Ext.define("Ext.data.ArrayStore",{extend:"Ext.data.Store",alias:"store.array",uses:["Ext.data.reader.Array"],config:{proxy:{type:"memory",reader:"array"}},loadData:function(b,a){this.callParent([b,a])}},function(){Ext.data.SimpleStore=Ext.data.ArrayStore});
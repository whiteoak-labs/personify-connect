Ext.define("Ext.log.filter.Priority",{extend:"Ext.log.filter.Filter",config:{minPriority:1},accept:function(a){return a.priority>=this.getMinPriority()}});
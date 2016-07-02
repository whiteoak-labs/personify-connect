Ext.define("Ext.util.Droppable",{mixins:{observable:"Ext.mixin.Observable"},config:{baseCls:Ext.baseCSSPrefix+"droppable"},activeCls:Ext.baseCSSPrefix+"drop-active",invalidCls:Ext.baseCSSPrefix+"drop-invalid",hoverCls:Ext.baseCSSPrefix+"drop-hover",validDropMode:"intersect",disabled:false,group:"base",tolerance:null,monitoring:false,constructor:function(b,a){var c=this;a=a||{};Ext.apply(c,a);c.el=Ext.get(b);c.callParent();c.mixins.observable.constructor.call(c);if(!c.disabled){c.enable()}c.el.addCls(c.baseCls)},onDragStart:function(a,b){if(a.group===this.group){this.monitoring=true;this.el.addCls(this.activeCls);this.region=this.el.getPageBox(true);a.on({drag:this.onDrag,beforedragend:this.onBeforeDragEnd,dragend:this.onDragEnd,scope:this});if(this.isDragOver(a)){this.setCanDrop(true,a,b)}this.fireEvent("dropactivate",this,a,b)}else{a.on({dragend:function(){this.el.removeCls(this.invalidCls)},scope:this,single:true});this.el.addCls(this.invalidCls)}},isDragOver:function(a,b){return this.region[this.validDropMode](a.region)},onDrag:function(a,b){this.setCanDrop(this.isDragOver(a),a,b)},setCanDrop:function(c,a,b){if(c&&!this.canDrop){this.canDrop=true;this.el.addCls(this.hoverCls);this.fireEvent("dropenter",this,a,b)}else{if(!c&&this.canDrop){this.canDrop=false;this.el.removeCls(this.hoverCls);this.fireEvent("dropleave",this,a,b)}}},onBeforeDragEnd:function(a,b){a.cancelRevert=this.canDrop},onDragEnd:function(a,b){this.monitoring=false;this.el.removeCls(this.activeCls);a.un({drag:this.onDrag,beforedragend:this.onBeforeDragEnd,dragend:this.onDragEnd,scope:this});if(this.canDrop){this.canDrop=false;this.el.removeCls(this.hoverCls);this.fireEvent("drop",this,a,b)}this.fireEvent("dropdeactivate",this,a,b)},enable:function(){if(!this.mgr){this.mgr=Ext.util.Observable.observe(Ext.util.Draggable)}this.mgr.on({dragstart:this.onDragStart,scope:this});this.disabled=false},disable:function(){this.mgr.un({dragstart:this.onDragStart,scope:this});this.disabled=true},isDisabled:function(){return this.disabled},isMonitoring:function(){return this.monitoring}});
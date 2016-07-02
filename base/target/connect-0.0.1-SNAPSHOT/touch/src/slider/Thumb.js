Ext.define("Ext.slider.Thumb",{extend:"Ext.Component",xtype:"thumb",config:{baseCls:Ext.baseCSSPrefix+"thumb",pressedCls:Ext.baseCSSPrefix+"thumb-pressing",draggable:{direction:"horizontal"}},platformConfig:[{platform:["ie10"],draggable:{translatable:{translationMethod:"csstransform"}}}],elementWidth:0,initialize:function(){this.callParent();this.getDraggable().onBefore({dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",scope:this});this.getDraggable().on({touchstart:"onPress",touchend:"onRelease",scope:this});this.element.on("resize","onElementResize",this)},getTemplate:function(){if(Ext.theme.is.Blackberry||Ext.theme.is.Blackberry103){return[{tag:"div",className:Ext.baseCSSPrefix+"thumb-inner",reference:"innerElement"}]}else{return this.template}},updatePressedCls:function(b,c){var a=this.element;if(a.hasCls(c)){a.replaceCls(c,b)}},onPress:function(){var c=this,a=c.element,b=c.getPressedCls();if(!c.getDisabled()){a.addCls(b)}},onRelease:function(a){this.fireAction("release",[this,a],"doRelease")},doRelease:function(a,b){if(!a.getDisabled()){a.element.removeCls(a.getPressedCls())}},onDragStart:function(){if(this.isDisabled()){return false}this.relayEvent(arguments)},onDrag:function(){if(this.isDisabled()){return false}this.relayEvent(arguments)},onDragEnd:function(){if(this.isDisabled()){return false}this.relayEvent(arguments)},onElementResize:function(a,b){this.elementWidth=b.width},getElementWidth:function(){return this.elementWidth}});
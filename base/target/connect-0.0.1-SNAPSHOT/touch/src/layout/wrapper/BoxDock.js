Ext.define("Ext.layout.wrapper.BoxDock",{config:{direction:"horizontal",element:{className:"x-dock"},bodyElement:{className:"x-dock-body"},innerWrapper:null,sizeState:false,container:null},positionMap:{top:"start",left:"start",bottom:"end",right:"end"},constructor:function(a){this.items={start:[],end:[]};this.itemsCount=0;this.initConfig(a)},addItems:function(a){var b,d,c;for(b=0,d=a.length;b<d;b++){c=a[b];this.addItem(c)}},addItem:function(n){var o=n.getDocked(),g=this.positionMap[o],a=n.$dockWrapper,b=this.getContainer(),h=b.indexOf(n),f=n.element,l=this.items,k=l[g],e,j,m,d,c;if(a){a.removeItem(n)}n.$dockWrapper=this;n.addCls("x-dock-item");n.addCls("x-docked-"+o);for(e=0,j=k.length;e<j;e++){m=k[e];c=b.indexOf(m);if(c>h){d=m.element;k.splice(e,0,n);break}}if(!d){k.push(n);d=this.getBodyElement()}this.itemsCount++;if(g==="start"){f.insertBefore(d)}else{f.insertAfter(d)}},removeItem:function(c){var a=c.getDocked(),b=this.items[this.positionMap[a]];Ext.Array.remove(b,c);c.element.detach();delete c.$dockWrapper;c.removeCls("x-dock-item");c.removeCls("x-docked-"+a);if(--this.itemsCount===0){this.destroy()}},getItemsSlice:function(c){var a=this.getContainer(),b=this.items,h=[],g,d,f,e;for(g=b.start,d=0,f=g.length;d<f;d++){e=g[d];if(a.indexOf(e)>c){h.push(e)}}for(g=b.end,d=0,f=g.length;d<f;d++){e=g[d];if(a.indexOf(e)>c){h.push(e)}}return h},applyElement:function(a){return Ext.Element.create(a)},updateElement:function(a){a.addCls("x-dock-"+this.getDirection())},applyBodyElement:function(a){return Ext.Element.create(a)},updateBodyElement:function(a){this.getElement().append(a)},updateInnerWrapper:function(a,c){var b=this.getBodyElement();if(c&&c.$outerWrapper===this){c.getElement().detach();delete c.$outerWrapper}if(a){a.setSizeState(this.getSizeState());a.$outerWrapper=this;b.append(a.getElement())}},updateSizeState:function(b){var a=this.getInnerWrapper();this.getElement().setSizeState(b);if(a){a.setSizeState(b)}},destroy:function(){var c=this.getInnerWrapper(),b=this.$outerWrapper,a;if(c){if(b){b.setInnerWrapper(c)}else{a=c.getElement();if(!a.isDestroyed){a.replace(this.getElement())}delete c.$outerWrapper}}delete this.$outerWrapper;this.setInnerWrapper(null);this.unlink("_bodyElement","_element");this.callSuper()}});
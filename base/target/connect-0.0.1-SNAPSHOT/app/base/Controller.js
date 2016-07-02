Ext.define("Personify.base.Controller",{extend:"Deft.mvc.ViewController",config:{subviews:null,layouts:null,defaultOrientation:null,currentLayout:null},init:function(){this.callParent(arguments);var c=this.getLayouts();var b=this;if(c){this.initLayouts();this.initSubviews();var a=Ext.Viewport.getOrientation();this.relayout(Ext.Viewport,a,true)}Ext.Viewport.setListeners({orientationchange:{fn:this.onOrientationChange,scope:b}})},destroy:function(){var e=this;var g=this.getLayouts();if(g){Ext.Viewport.removeListener({orientationchange:{fn:this.onOrientationChange,scope:e}});var f=this.getView();var h=this.getCurrentLayout();f.remove(h,false);for(var b in g){var c=g[b];c.destroy()}var i=this.getSubviews();for(var a in i){var d=i[a];d.destroy()}}return this.callParent(arguments)},onOrientationChange:function(a,b){var c=this.getLayouts();if(c){this.relayout(a,b,true)}this.updateSize(b)},initSubviews:function(){var b=this.getSubviews();for(var a in b){var c=b[a];if(typeof c==="string"){c=Ext.create(c);b[a]=c}}},initLayouts:function(){var c=this.getLayouts();for(var a in c){var b=c[a];if(typeof b==="string"){b=Ext.create(b);c[a]=b}}},getLayout:function(b,a){var e=this.getLayouts();var d=e[b];if(d){return d}else{if(a){var c=this.getDefaultOrientation();return this.getLayout(c,false)}else{return null}}},hasLayoutForOrientation:function(a){var b=this.getLayouts();return(b[a]==null)},relayout:function(a,d,c){var g=this.getLayout(d,c);var e=this.getCurrentLayout();if(g&&g!=e){var b=this.getView();if(e){b.remove(e,false);e.setSubviews(null)}this.setCurrentLayout(g);b.add(g);var f=this.getSubviews();g.setSubviews(f)}},updateSize:function(a){}});
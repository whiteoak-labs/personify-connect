Ext.define("Ext.SegmentedButton",{extend:"Ext.Container",xtype:"segmentedbutton",requires:["Ext.Button"],config:{baseCls:Ext.baseCSSPrefix+"segmentedbutton",pressedCls:Ext.baseCSSPrefix+"button-pressed",allowMultiple:false,allowDepress:false,allowToggle:true,pressedButtons:[],layout:{type:"hbox",align:"stretch"},defaultType:"button"},initialize:function(){var a=this;a.callParent();a.on({delegate:"> button",scope:a,tap:"onButtonRelease"});a.onAfter({delegate:"> button",scope:a,hide:"onButtonHiddenChange",show:"onButtonHiddenChange"})},updateAllowMultiple:function(a){if(!this.initialized&&!this.getInitialConfig().hasOwnProperty("allowDepress")&&a){this.setAllowDepress(true)}},applyItems:function(){var e=this,f=[],d,b,c,a;e.callParent(arguments);a=this.getItems();d=a.length;for(b=0;b<d;b++){c=a.items[b];if(c.getInitialConfig("pressed")){f.push(a.items[b])}}e.updateFirstAndLastCls(a);e.setPressedButtons(f)},onButtonRelease:function(a){if(!this.getAllowToggle()){return}var d=this,e=d.getPressedButtons()||[],c=[],b;if(!d.getDisabled()&&!a.getDisabled()){if(d.getAllowMultiple()){c=e.concat(c)}b=(c.indexOf(a)!==-1)||(e.indexOf(a)!==-1);if(b&&d.getAllowDepress()){Ext.Array.remove(c,a)}else{if(!b||!d.getAllowDepress()){c.push(a)}}d.setPressedButtons(c)}},onItemAdd:function(){this.callParent(arguments);this.updateFirstAndLastCls(this.getItems())},onItemRemove:function(){this.callParent(arguments);this.updateFirstAndLastCls(this.getItems())},onButtonHiddenChange:function(){this.updateFirstAndLastCls(this.getItems())},updateFirstAndLastCls:function(b){var e=b.length,f=Ext.baseCSSPrefix,a=f+"first",g=f+"last",d,c;for(c=0;c<e;c++){d=b.items[c];d.removeCls(a);d.removeCls(g)}for(c=0;c<e;c++){d=b.items[c];if(!d.isHidden()){d.addCls(a);break}}for(c=e-1;c>=0;c--){d=b.items[c];if(!d.isHidden()){d.addCls(g);break}}},applyPressedButtons:function(a){var e=this,f=[],c,d,b;if(e.getAllowToggle()){if(Ext.isArray(a)){d=a.length;for(b=0;b<d;b++){c=e.getComponent(a[b]);if(c&&f.indexOf(c)===-1){f.push(c)}}}else{c=e.getComponent(a);if(c&&f.indexOf(c)===-1){f.push(c)}}}return f},updatePressedButtons:function(j,c){var h=this,g=h.getItems(),k=h.getPressedCls(),m=[],l,b,f,a,d;f=g.length;if(c&&c.length){for(a=0;a<f;a++){l=g.items[a];if(c.indexOf(l)!=-1&&j.indexOf(l)==-1){l.removeCls([k,l.getPressedCls()]);m.push({item:l,toggle:false})}}}f=j.length;for(a=0;a<f;a++){b=j[a];if(!c||c.indexOf(b)==-1){b.addCls(k);m.push({item:b,toggle:true})}}f=m.length;if(f&&c!==undefined){Ext.defer(function(){for(a=0;a<f;a++){d=m[a];h.fireEvent("toggle",h,d.item,d.toggle)}},50)}},isPressed:function(a){var b=this.getPressedButtons();return b.indexOf(a)!=-1},doSetDisabled:function(a){var b=this;b.items.each(function(c){c.setDisabled(a)},b);b.callParent(arguments)}},function(){var a=this;Ext.deprecateClassMethod(a,"setPressed","setPressedButtons");Ext.deprecateClassMethod(a,"getPressed","getPressedButtons")});
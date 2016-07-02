Ext.define("Ext.Container",{extend:"Ext.Component",alternateClassName:"Ext.lib.Container",requires:["Ext.layout.*","Ext.ItemCollection","Ext.behavior.Scrollable","Ext.Mask"],xtype:"container",eventedConfig:{activeItem:0,scrollable:null},config:{layout:null,control:{},defaults:null,items:null,autoDestroy:true,defaultType:null,useBodyElement:null,masked:null,modal:null,hideOnMaskTap:null},isContainer:true,constructor:function(a){var b=this;b._items=b.items=new Ext.ItemCollection();b.innerItems=[];b.onItemAdd=b.onFirstItemAdd;b.callParent(arguments)},getElementConfig:function(){return{reference:"element",classList:["x-container","x-unsized"],children:[{reference:"innerElement",className:"x-inner"}]}},applyMasked:function(b){var a=true,c;if(b===false){b=true;a=false}c=Ext.factory(b,Ext.Mask,this.getMasked());if(c){this.add(c);c.setHidden(!a)}return c},mask:function(a){this.setMasked(a||true)},unmask:function(){this.setMasked(false)},setParent:function(a){this.callSuper(arguments);if(a){var b=this.getModal();if(b){a.insertBefore(b,this);b.setZIndex(this.getZIndex()-1)}}},applyModal:function(c,b){var a=true;if(c===false){c=true;a=false}b=Ext.factory(c,Ext.Mask,b);if(b){b.setVisibility(a)}return b},updateModal:function(b){var a=this.getParent();if(a){if(b){a.insertBefore(b,this);b.setZIndex(this.getZIndex()-1)}else{a.remove(b)}}},updateHideOnMaskTap:function(b){var a=this.getModal();if(a){a[b?"on":"un"].call(a,"tap","hide",this)}},updateZIndex:function(b){var a=this.getModal();this.callParent(arguments);if(a){a.setZIndex(b-1)}},updateBaseCls:function(a,b){var c=this,d=c.getUi();if(b){this.element.removeCls(b);this.innerElement.removeCls(a,null,"inner");if(d){this.element.removeCls(this.currentUi)}}if(a){this.element.addCls(a);this.innerElement.addCls(a,null,"inner");if(d){this.element.addCls(a,null,d);this.currentUi=a+"-"+d}}},updateUseBodyElement:function(a){if(a){this.link("bodyElement",this.innerElement.wrap({cls:"x-body"}))}},applyItems:function(a,d){if(a){var b=this;b.getDefaultType();b.getDefaults();if(b.initialized&&d.length>0){b.removeAll()}b.add(a);if(b.initialized){var c=b.initialConfig.activeItem||b.config.activeItem||0;b.setActiveItem(c)}}},applyControl:function(c){var a,b,e,d;for(a in c){d=c[a];for(b in d){e=d[b];if(Ext.isObject(e)){e.delegate=a}}d.delegate=a;this.addListener(d)}return c},onFirstItemAdd:function(){delete this.onItemAdd;if(this.innerHtmlElement&&!this.getHtml()){this.innerHtmlElement.destroy();delete this.innerHtmlElement}this.on("innerstatechange","onItemInnerStateChange",this,{delegate:"> component"});return this.onItemAdd.apply(this,arguments)},updateLayout:function(b,a){if(a&&a.isLayout){Ext.Logger.error("Replacing a layout after one has already been initialized is not currently supported.")}},getLayout:function(){var a=this.layout;if(!a){a=this.link("_layout",this.link("layout",Ext.factory(this._layout||"default",Ext.layout.Default,null,"layout")));a.setContainer(this)}return a},updateDefaultType:function(a){this.defaultItemClass=Ext.ClassManager.getByAlias("widget."+a);if(!this.defaultItemClass){Ext.Logger.error("Invalid defaultType of: '"+a+"', must be a valid component xtype")}},applyDefaults:function(a){if(a){this.factoryItem=this.factoryItemWithDefaults;return a}},factoryItem:function(a){if(!a){Ext.Logger.error("Invalid item given: "+a+", must be either the config object to factory a new item, or an existing component instance")}return Ext.factory(a,this.defaultItemClass)},factoryItemWithDefaults:function(c){if(!c){Ext.Logger.error("Invalid item given: "+c+", must be either the config object to factory a new item, or an existing component instance")}var b=this,d=b.getDefaults(),a;if(!d){return Ext.factory(c,b.defaultItemClass)}if(c.isComponent){a=c;if(d&&c.isInnerItem()&&!b.has(a)){a.setConfig(d,true)}}else{if(d&&!c.ignoreDefaults){if(!(c.hasOwnProperty("left")&&c.hasOwnProperty("right")&&c.hasOwnProperty("top")&&c.hasOwnProperty("bottom")&&c.hasOwnProperty("docked")&&c.hasOwnProperty("centered"))){c=Ext.mergeIf({},c,d)}}a=Ext.factory(c,b.defaultItemClass)}return a},add:function(a){var e=this,b,d,c,f;if(Ext.isArray(a)){for(b=0,d=a.length;b<d;b++){c=e.factoryItem(a[b]);this.doAdd(c);if(!f&&!this.getActiveItem()&&this.innerItems.length>0&&c.isInnerItem()){f=c}}}else{c=e.factoryItem(a);this.doAdd(c);if(!f&&!this.getActiveItem()&&this.innerItems.length>0&&c.isInnerItem()){f=c}}if(f){this.setActiveItem(f)}return c},doAdd:function(d){var c=this,a=c.getItems(),b;if(!a.has(d)){b=a.length;a.add(d);if(d.isInnerItem()){c.insertInner(d)}d.setParent(c);c.onItemAdd(d,b)}},remove:function(d,b){var c=this,a=c.indexOf(d),e=c.getInnerItems();if(b===undefined){b=c.getAutoDestroy()}if(a!==-1){if(!c.removingAll&&e.length>1&&d===c.getActiveItem()){c.on({activeitemchange:"doRemove",scope:c,single:true,order:"after",args:[d,a,b]});c.doResetActiveItem(e.indexOf(d))}else{c.doRemove(d,a,b);if(e.length===0){c.setActiveItem(null)}}}return c},doResetActiveItem:function(a){if(a===0){this.setActiveItem(1)}else{this.setActiveItem(0)}},doRemove:function(d,a,b){var c=this;c.items.remove(d);if(d.isInnerItem()){c.removeInner(d)}c.onItemRemove(d,a,b);d.setParent(null);if(b){d.destroy()}},removeAll:function(c,f){var a=this.items,e=a.length,b=0,d;if(typeof c!="boolean"){c=this.getAutoDestroy()}f=Boolean(f);this.removingAll=true;for(;b<e;b++){d=a.getAt(b);if(d&&(f||d.isInnerItem())){this.doRemove(d,b,c);b--;e--}}this.setActiveItem(null);this.removingAll=false;return this},getAt:function(a){return this.items.getAt(a)},getInnerAt:function(a){return this.innerItems[a]},removeAt:function(a){var b=this.getAt(a);if(b){this.remove(b)}return this},removeInnerAt:function(a){var b=this.getInnerItems()[a];if(b){this.remove(b)}return this},has:function(a){return this.getItems().indexOf(a)!=-1},hasInnerItem:function(a){return this.innerItems.indexOf(a)!=-1},indexOf:function(a){return this.getItems().indexOf(a)},innerIndexOf:function(a){return this.innerItems.indexOf(a)},insertInner:function(d,b){var a=this.getItems().items,f=this.innerItems,g=f.indexOf(d),c=-1,e;if(g!==-1){f.splice(g,1)}if(typeof b=="number"){do{e=a[++b]}while(e&&!e.isInnerItem());if(e){c=f.indexOf(e);f.splice(c,0,d)}}if(c===-1){f.push(d);c=f.length-1}if(g!==-1){this.onInnerItemMove(d,c,g)}return this},onInnerItemMove:Ext.emptyFn,removeInner:function(a){Ext.Array.remove(this.innerItems,a);return this},insert:function(a,d){var c=this,b;if(typeof a!="number"){Ext.Logger.error("Invalid index of '"+a+"', must be a valid number")}if(Ext.isArray(d)){for(b=d.length-1;b>=0;b--){c.insert(a,d[b])}return c}d=this.factoryItem(d);this.doInsert(a,d);return d},doInsert:function(d,f){var e=this,b=e.items,c=b.length,a,g;g=f.isInnerItem();if(d>c){d=c}if(b[d-1]===f){return e}a=e.indexOf(f);if(a!==-1){if(a<d){d-=1}b.removeAt(a)}b.insert(d,f);if(a===-1){f.setParent(e)}if(g){e.insertInner(f,d)}if(a!==-1){e.onItemMove(f,d,a)}else{e.onItemAdd(f,d)}},insertFirst:function(a){return this.insert(0,a)},insertLast:function(a){return this.insert(this.getItems().length,a)},insertBefore:function(c,a){var b=this.indexOf(a);if(b!==-1){this.insert(b,c)}return this},insertAfter:function(c,a){var b=this.indexOf(a);if(b!==-1){this.insert(b+1,c)}return this},onItemAdd:function(b,a){this.doItemLayoutAdd(b,a);if(this.initialized){this.fireEvent("add",this,b,a)}},doItemLayoutAdd:function(c,a){var b=this.getLayout();if(this.isRendered()&&c.setRendered(true)){c.fireAction("renderedchange",[this,c,true],"onItemAdd",b,{args:[c,a]})}else{b.onItemAdd(c,a)}},onItemRemove:function(b,a,c){this.doItemLayoutRemove(b,a,c);this.fireEvent("remove",this,b,a)},doItemLayoutRemove:function(c,a,d){var b=this.getLayout();if(this.isRendered()&&c.setRendered(false)){c.fireAction("renderedchange",[this,c,false],"onItemRemove",b,{args:[c,a,d]})}else{b.onItemRemove(c,a,d)}},onItemMove:function(b,c,a){if(b.isDocked()){b.setDocked(null)}this.doItemLayoutMove(b,c,a);this.fireEvent("move",this,b,c,a)},doItemLayoutMove:function(b,c,a){this.getLayout().onItemMove(b,c,a)},onItemInnerStateChange:function(c,a){var b=this.getLayout();if(a){this.insertInner(c,this.items.indexOf(c))}else{this.removeInner(c)}b.onItemInnerStateChange.apply(b,arguments)},getInnerItems:function(){return this.innerItems},getDockedItems:function(){var a=this.getItems().items,c=[],e=a.length,d,b;for(b=0;b<e;b++){d=a[b];if(d.isDocked()){c.push(d)}}return c},applyActiveItem:function(d,a){var c=this.getInnerItems();this.getItems();if(!d&&c.length===0){return 0}else{if(typeof d=="number"){d=Math.max(0,Math.min(d,c.length-1));d=c[d];if(d){return d}else{if(a){return null}}}else{if(d){var b;if(typeof d=="string"){b=this.child(d);d={xtype:d}}if(!b||!b.isComponent){b=this.factoryItem(d)}this.pendingActiveItem=b;if(!b.isInnerItem()){Ext.Logger.error("Setting activeItem to be a non-inner item")}if(!this.has(b)){this.add(b)}return b}}}},animateActiveItem:function(d,c){var b=this.getLayout(),a;if(this.activeItemAnimation){this.activeItemAnimation.destroy()}this.activeItemAnimation=c=new Ext.fx.layout.Card(c);if(c&&b.isCard){c.setLayout(b);a=b.getAnimation();if(a){a.disable()}c.on("animationend",function(){if(a){a.enable()}c.destroy()},this)}return this.setActiveItem(d)},doSetActiveItem:function(b,a){delete this.pendingActiveItem;if(a){a.fireEvent("deactivate",a,this,b)}if(b){b.fireEvent("activate",b,this,a)}},show:function(){this.callParent(arguments);var a=this.getModal();if(a){a.setHidden(false)}return this},hide:function(){this.callParent(arguments);var a=this.getModal();if(a){a.setHidden(true)}return this},doSetHidden:function(b){var a=this.getModal();if(a&&(a.getHidden()!==b)){a.setHidden(b)}this.callSuper(arguments)},setRendered:function(d){if(this.callParent(arguments)){var a=this.items.items,b,c;for(b=0,c=a.length;b<c;b++){a[b].setRendered(d)}return true}return false},getScrollableBehavior:function(){var a=this.scrollableBehavior;if(!a){a=this.scrollableBehavior=new Ext.behavior.Scrollable(this)}return a},applyScrollable:function(a){if(typeof a==="boolean"){if(a===false&&!(this.getHeight()!==null||this.heightLayoutSized||(this.getTop()!==null&&this.getBottom()!==null))){Ext.Logger.warn("This container is set to scrollable: false but has no specified height. You may need to set the container to scrollable: null or provide a height.",this)}this.getScrollableBehavior().setConfig({disabled:!a})}else{if(a&&!a.isObservable){this.getScrollableBehavior().setConfig(a)}}return a},doSetScrollable:function(){},getScrollable:function(){return this.getScrollableBehavior().getScrollView()},getRefItems:function(a){var b=this.getItems().items.slice(),e=b.length,c,d;if(a){for(c=0;c<e;c++){d=b[c];if(d.getRefItems){b=b.concat(d.getRefItems(true))}}}return b},getComponent:function(a){if(Ext.isObject(a)){a=a.getItemId()}return this.getItems().get(a)},getDockedComponent:function(a){if(Ext.isObject(a)){a=a.getItemId()}var c=this.getDockedItems(),e=c.length,d,b;if(Ext.isNumber(a)){return c[a]}for(b=0;b<e;b++){d=c[b];if(d.id==a){return d}}return false},query:function(a){return Ext.ComponentQuery.query(a,this)},child:function(a){return this.query("> "+a)[0]||null},down:function(a){return this.query(a)[0]||null},onClassExtended:function(b,a){if("onAdd" in a||"onRemove" in a){throw new Error("["+b.$className+"] 'onAdd()' and 'onRemove()' methods no longer exist in Ext.Container, please use 'onItemAdd()' and 'onItemRemove()' instead }")}},destroy:function(){var b=this,a=b.getModal();if(a){a.destroy()}b.removeAll(true,true);b.unlink("_scrollable");Ext.destroy(b.items);b.callSuper()}},function(){this.addMember("defaultItemClass",this);Ext.deprecateClassMethod(this,"addAll","add");Ext.deprecateClassMethod(this,"removeDocked","remove");this.override({constructor:function(a){a=a||{};var c=a.dockedItems,b,e,d;if(a.scroll){Ext.Logger.deprecate("'scroll' config is deprecated, please use 'scrollable' instead.",this);a.scrollable=a.scroll;delete a.scroll}this.callOverridden(arguments);if(c){Ext.Logger.deprecate("'dockedItems' config is deprecated, please add all docked items inside the 'items' config with a 'docked' property indicating the docking position instead, i.e { /*...*/ docked: 'top' /*...*/ }");c=Ext.Array.from(c);for(b=0,e=c.length;b<e;b++){d=c[b];if("dock" in d){Ext.Logger.deprecate("'dock' config for docked items is deprecated, please use 'docked' instead");d.docked=d.dock}}this.add(c)}},add:function(){var a=arguments;if(a.length>1){if(typeof a[0]=="number"){Ext.Logger.deprecate("add(index, item) method signature is deprecated, please use insert(index, item) instead");return this.insert(a[0],a[1])}Ext.Logger.deprecate("Passing items as multiple arguments is deprecated, please use one single array of items instead");a=[Array.prototype.slice.call(a)]}return this.callOverridden(a)},doAdd:function(c){var d=c.getDocked(),b=c.overlay,a;if(b&&d){Ext.Logger.deprecate("'overlay' config is deprecated on docked items, please set the top/left/right/bottom configurations instead.",this);if(d=="top"){a={top:0,bottom:"auto",left:0,right:0}}else{if(d=="bottom"){a={top:null,bottom:0,left:0,right:0}}}if(a){c.setDocked(false);c.setTop(a.top);c.setBottom(a.bottom);c.setLeft(a.left);c.setRight(a.right)}}return this.callOverridden(arguments)},applyDefaults:function(a){if(typeof a=="function"){Ext.Logger.deprecate("Passing a function as 'defaults' is deprecated. To add custom logics when 'defaults' is applied to each item, have your own factoryItem() method in your sub-class instead")}return this.callOverridden(arguments)},factoryItemWithDefaults:function(b){var d=this.getDefaults(),c,a;if(typeof d=="function"){c=d.call(this,b)}if(typeof b=="string"){Ext.Logger.deprecate("Passing a string id of item ('"+b+"') is deprecated, please pass a reference to that item instead");b=Ext.getCmp(b)}if(c){this._defaults=c}a=this.callParent([b]);if(c){this._defaults=d}return a},applyMasked:function(a){if(Ext.isObject(a)&&!a.isInstance&&"message" in a&&!("xtype" in a)&&!("xclass" in a)){a.xtype="loadmask";Ext.Logger.deprecate("Using a 'message' config without specify an 'xtype' or 'xclass' will no longer implicitly set 'xtype' to 'loadmask'. Please set that explicitly.")}return this.callOverridden(arguments)}});Ext.deprecateClassMethod(this,"setMask","setMasked")});
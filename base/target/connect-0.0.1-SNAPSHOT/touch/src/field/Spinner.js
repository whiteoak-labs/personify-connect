Ext.define("Ext.field.Spinner",{extend:"Ext.field.Number",xtype:"spinnerfield",alternateClassName:"Ext.form.Spinner",requires:["Ext.util.TapRepeater"],config:{cls:Ext.baseCSSPrefix+"spinner",minValue:Number.NEGATIVE_INFINITY,maxValue:Number.MAX_VALUE,stepValue:0.1,accelerateOnTapHold:true,cycle:false,clearIcon:false,defaultValue:0,tabIndex:-1,groupButtons:true,component:{disabled:true}},platformConfig:[{platform:"android",component:{disabled:false,readOnly:true}}],constructor:function(){var a=this;a.callParent(arguments);if(!a.getValue()){a.suspendEvents();a.setValue(a.getDefaultValue());a.resumeEvents()}},syncEmptyCls:Ext.emptyFn,updateComponent:function(b){this.callParent(arguments);var a=this.getCls();if(b){this.spinDownButton=Ext.Element.create({cls:a+"-button "+a+"-button-down",html:"-"});this.spinUpButton=Ext.Element.create({cls:a+"-button "+a+"-button-up",html:"+"});this.downRepeater=this.createRepeater(this.spinDownButton,this.onSpinDown);this.upRepeater=this.createRepeater(this.spinUpButton,this.onSpinUp)}},updateGroupButtons:function(a,e){var c=this,d=c.innerElement,b=c.getBaseCls()+"-grouped-buttons";c.getComponent();if(a!=e){if(a){this.addCls(b);d.appendChild(c.spinDownButton);d.appendChild(c.spinUpButton)}else{this.removeCls(b);d.insertFirst(c.spinDownButton);d.appendChild(c.spinUpButton)}}},applyValue:function(a){a=parseFloat(a);if(isNaN(a)||a===null){a=this.getDefaultValue()}a=Math.round(a*10)/10;return this.callParent([a])},createRepeater:function(c,b){var d=this,a=Ext.create("Ext.util.TapRepeater",{el:c,accelerate:d.getAccelerateOnTapHold()});a.on({tap:b,touchstart:"onTouchStart",touchend:"onTouchEnd",scope:d});return a},onSpinDown:function(){if(!this.getDisabled()&&!this.getReadOnly()){this.spin(true)}},onSpinUp:function(){if(!this.getDisabled()&&!this.getReadOnly()){this.spin(false)}},onTouchStart:function(a){if(!this.getDisabled()&&!this.getReadOnly()){a.getEl().addCls(Ext.baseCSSPrefix+"button-pressed")}},onTouchEnd:function(a){a.getEl().removeCls(Ext.baseCSSPrefix+"button-pressed")},spin:function(h){var c=this,b=c.getValue(),a=c.getStepValue(),g=h?"down":"up",e=c.getMinValue(),f=c.getMaxValue(),d;if(h){d=b-a}else{d=b+a}if(c.getCycle()){if(b==e&&d<e){d=f}if(b==f&&d>f){d=e}}c.setValue(d);d=c.getValue();c.fireEvent("spin",c,d,g);c.fireEvent("spin"+g,c,d)},doSetDisabled:function(a){Ext.Component.prototype.doSetDisabled.apply(this,arguments)},setDisabled:function(){Ext.Component.prototype.setDisabled.apply(this,arguments)},reset:function(){this.setValue(this.getDefaultValue())},destroy:function(){var a=this;Ext.destroy(a.downRepeater,a.upRepeater,a.spinDownButton,a.spinUpButton);a.callParent(arguments)}},function(){this.override({constructor:function(a){if(a){if(a.hasOwnProperty("incrementValue")){Ext.Logger.deprecate("'incrementValue' config is deprecated, please use 'stepValue' config instead",this);a.stepValue=a.incrementValue;delete a.incrementValue}if(a.hasOwnProperty("increment")){Ext.Logger.deprecate("'increment' config is deprecated, please use 'stepValue' config instead",this);a.stepValue=a.increment;delete a.increment}}this.callParent([a])}})});
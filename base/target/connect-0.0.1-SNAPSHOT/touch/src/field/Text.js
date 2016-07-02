Ext.define("Ext.field.Text",{extend:"Ext.field.Field",xtype:"textfield",alternateClassName:"Ext.form.Text",config:{ui:"text",clearIcon:true,placeHolder:null,maxLength:null,autoComplete:null,autoCapitalize:null,autoCorrect:null,readOnly:null,component:{xtype:"input",type:"text",fastFocus:true},bubbleEvents:["action"]},initialize:function(){var a=this;a.callParent();a.getComponent().on({scope:this,keyup:"onKeyUp",change:"onChange",focus:"onFocus",blur:"onBlur",paste:"onPaste",mousedown:"onMouseDown",clearicontap:"onClearIconTap"});a.originalValue=a.getValue()||"";a.getComponent().originalValue=a.originalValue;a.syncEmptyCls()},syncEmptyCls:function(){var b=(this._value)?this._value.length:false,a=Ext.baseCSSPrefix+"empty";if(b){this.removeCls(a)}else{this.addCls(a)}},updateValue:function(c){var b=this.getComponent(),a=c!==undefined&&c!==null&&c!=="";if(b){b.setValue(c)}this[a&&this.isDirty()?"showClearIcon":"hideClearIcon"]();this.syncEmptyCls()},getValue:function(){var a=this;a._value=a.getComponent().getValue();a.syncEmptyCls();return a._value},updatePlaceHolder:function(a){this.getComponent().setPlaceHolder(a)},updateMaxLength:function(a){this.getComponent().setMaxLength(a)},updateAutoComplete:function(a){this.getComponent().setAutoComplete(a)},updateAutoCapitalize:function(a){this.getComponent().setAutoCapitalize(a)},updateAutoCorrect:function(a){this.getComponent().setAutoCorrect(a)},updateReadOnly:function(a){if(a){this.hideClearIcon()}else{this.showClearIcon()}this.getComponent().setReadOnly(a)},updateInputType:function(a){var b=this.getComponent();if(b){b.setType(a)}},updateName:function(a){var b=this.getComponent();if(b){b.setName(a)}},updateTabIndex:function(b){var a=this.getComponent();if(a){a.setTabIndex(b)}},updateInputCls:function(a,b){var c=this.getComponent();if(c){c.replaceCls(b,a)}},doSetDisabled:function(b){var c=this;c.callParent(arguments);var a=c.getComponent();if(a){a.setDisabled(b)}if(b){c.hideClearIcon()}else{c.showClearIcon()}},showClearIcon:function(){var b=this,c=b.getValue(),a=c!==undefined&&c!==null&&c!=="";if(b.getClearIcon()&&!b.getDisabled()&&!b.getReadOnly()&&a){b.element.addCls(Ext.baseCSSPrefix+"field-clearable")}return b},hideClearIcon:function(){if(this.getClearIcon()){this.element.removeCls(Ext.baseCSSPrefix+"field-clearable")}},onKeyUp:function(a){this.fireAction("keyup",[this,a],"doKeyUp")},doKeyUp:function(b,d){var c=b.getValue(),a=c!==undefined&&c!==null&&c!=="";this[a?"showClearIcon":"hideClearIcon"]();if(d.browserEvent.keyCode===13){b.fireAction("action",[b,d],"doAction")}},doAction:function(){this.blur()},onClearIconTap:function(a,b){this.fireAction("clearicontap",[this,a,b],"doClearIconTap")},doClearIconTap:function(a,b){a.setValue("");a.getValue()},onChange:function(b,c,a){b.fireEvent("change",this,c,a)},onFocus:function(a){this.addCls(Ext.baseCSSPrefix+"field-focused");this.isFocused=true;this.fireEvent("focus",this,a)},onBlur:function(b){var a=this;this.removeCls(Ext.baseCSSPrefix+"field-focused");this.isFocused=false;a.fireEvent("blur",a,b);setTimeout(function(){a.isFocused=false},50)},onPaste:function(a){this.fireEvent("paste",this,a)},onMouseDown:function(a){this.fireEvent("mousedown",this,a)},focus:function(){this.getComponent().focus();return this},blur:function(){this.getComponent().blur();return this},select:function(){this.getComponent().select();return this},resetOriginalValue:function(){this.callParent();var a=this.getComponent();if(a&&a.hasOwnProperty("originalValue")){this.getComponent().originalValue=this.originalValue}this.reset()},reset:function(){this.getComponent().reset();this.getValue();this[this.isDirty()?"showClearIcon":"hideClearIcon"]()},isDirty:function(){var a=this.getComponent();if(a){return a.isDirty()}return false}});
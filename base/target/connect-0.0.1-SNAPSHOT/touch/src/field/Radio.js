Ext.define("Ext.field.Radio",{extend:"Ext.field.Checkbox",xtype:"radiofield",alternateClassName:"Ext.form.Radio",isRadio:true,config:{ui:"radio",component:{type:"radio",cls:Ext.baseCSSPrefix+"input-radio"}},getValue:function(){return(typeof this._value==="undefined")?null:this._value},setValue:function(a){this._value=a;return this},getSubmitValue:function(){var a=this._value;if(typeof a=="undefined"||a==null){a=true}return(this.getChecked())?a:null},updateChecked:function(a){this.getComponent().setChecked(a);if(this.initialized){this.refreshGroupValues()}},onMaskTap:function(a,c){var b=this,d=b.getComponent().input.dom;if(b.getDisabled()){return false}if(!b.getChecked()){d.checked=true}b.refreshGroupValues();return false},getGroupValue:function(){var a=this.getSameGroupFields(),c=a.length,b=0,d;for(;b<c;b++){d=a[b];if(d.getChecked()){return d.getValue()}}return null},setGroupValue:function(d){var a=this.getSameGroupFields(),c=a.length,b=0,e;for(;b<c;b++){e=a[b];if(e.getValue()===d){e.setChecked(true);return e}}},refreshGroupValues:function(){var a=this.getSameGroupFields(),c=a.length,b=0,d;for(;b<c;b++){d=a[b];d.onChange()}}});
Ext.define("Ext.field.DatePickerNative",{extend:"Ext.field.DatePicker",alternateClassName:"Ext.form.DatePickerNative",xtype:"datepickernativefield",initialize:function(){this.callParent()},onFocus:function(d){var c=this;if(!(navigator.plugins&&navigator.plugins.dateTimePicker)){c.callParent();return}var g=function(e){c.setValue(e)};var a=function(h){console.log("DateTimePicker: error occurred or cancelled: "+h)};try{var f=c.getName()=="date"?navigator.plugins.dateTimePicker.selectDate:navigator.plugins.dateTimePicker.selectTime;f(g,a,{value:c.getValue()})}catch(b){a(b)}}});
Ext.define("Personify.controller.profile.PhoneEditForm",{extend:"Personify.controller.profile.EditFormTemplate",control:{deleteButton:{tap:"onTapDeleteButton"},valueTextBox:{keyup:"onTextBoxChange"},primaryCheckBox:{},typeList:{change:"onTypeListChange"},countryList:{}},validateData:function(){return""},syncRecordWithView:function(){this.getValueTextBox().blur();var b=this.getView();var d=this.getPrimaryCheckBox();var e=this.getValueTextBox();var g=this.getTypeList();var c=this.getCountryList();var a=b.getRecord();if(a!=null){a.set("value",e.getValue());a.set("type",g.getValue());a.set("country",c.getValue());var f=a.get("type");var h=a.get("phoneNumbersId")?a.get("phoneNumbersId"):f.indexOf("FAX")<0?"PHONE,"+f:"FAX,"+f;var f=a.get("type").indexOf("FAX")<0?"PHONE":"FAX";a.set("phoneNumbersId",h);a.set("type",f)}},setCountryForEmptyItem:function(a){this.getCountryList().setValue(a)}});
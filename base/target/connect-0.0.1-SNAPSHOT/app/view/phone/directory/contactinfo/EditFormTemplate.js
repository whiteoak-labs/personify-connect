Ext.define("Personify.view.phone.directory.contactinfo.EditFormTemplate",{extend:"Ext.Container",xtype:"editformphone",config:{record:null,typeList:null,pack:"center",align:"center",layout:"hbox",cls:"p-phone-fieldset-directory-editform",items:[{flex:2,xtype:"selectfield",cls:"p-phone-field-directory-editform",itemId:"typeList",store:null,options:[]},{flex:4,xtype:"textfield",cls:"p-phone-field-directory-editform",itemId:"valueTextBox",placeHolder:"Value",name:"firstName",autoCapitalize:false,},{xtype:"panel",width:38,layout:{type:"vbox",pack:"center",align:"end"},items:[{xtype:"button",itemId:"deleteButton",cls:"p-phone-button-directory-editform-delete",pressedCls:"p-phone-button-directory-editform-delete-pressing",hidden:true},{itemId:"primaryCheckBox",html:"Main",cls:"p-phone-editform-main",hidden:true}]}]},updateRecord:function(a){if(a){this.getController().setRecord(a)}},applyTypeList:function(a){this.getController().setTypeList(a)}});
Ext.define("Personify.controller.profile.Email",{extend:"Personify.controller.profile.template.InfoTemplate",requires:["Personify.view.profile.contactinfo.email.EmailList","Personify.view.profile.contactinfo.EmailEditForm"],config:{typeList:null,typeListToRemove:null,recordsForDelete:new Array(),errorMessage:"\n- Wrong email format:",blankErrorMessage:"- Email field cannot be empty",canAddMoreFlag:null},control:{infoContainer:{typelistchange:"onTypeListChange",textboxchange:"onTextboxChange",deleteCommand:"onDeleteCommand"}},updateEditMode:function(c){this.callParent(arguments);me=this;this.getInfoContainer().removeAll(true,true);if(c==true){this.getView().setHidden(false);var d=new Array();var a=this.getView().getRecord();this.setTypeList(a.get("emailLocationList").split(","));var b=a.EntryProfile.getAt(0).EmailsProfile;b.each(function(e){var f=Ext.create("Personify.view.profile.contactinfo.EmailEditForm");f.getController().setTypeList(me.getTypeList());f.setRecord(e);me.getInfoContainer().add(f);d.push(e.get("type"))});me.setTypeListToRemove(d);me.addEmptyItem();me.updateTypeListForAllEditItems()}else{me.setRecord(me.getView().getRecord())}},onTextboxChange:function(h,f,d,b,c){var a=this.getInfoContainer();var i=Personify.utils.ServiceManager.getModelManager();var e=i.getProfileEmailsModel();var g=new Ext.create(e,{primary:d,value:b,type:c});if(!f){h.setRecord(g);this.addEmptyItem();this.updateTypeListForAllEditItems()}},onDeleteCommand:function(a,b){if(a.get("emailsId")!=""){this.getRecordsForDelete().push(a)}Ext.Array.remove(this.getTypeListToRemove(),a.get("type"));this.updateTypeListForAllEditItems();this.getInfoContainer().remove(b,true);var d=this.getInfoContainer().getInnerItems();var c=d[d.length-1];if(c.getRecord()&&!c.getRecord().get("primary")){this.addEmptyItem()}},onTypeListChange:function(a,b,c){this.callParent(arguments);if(a.getRecord()){if(a.getRecord().get("emailsId")!=""){this.getRecordsForDelete().push(a.getRecord().copy())}a.getRecord().set("emailsId","")}},addEmptyItem:function(){var b=this.checkTypeList();if(b.length==0){this.setCanAddMoreFlag(false);return}else{this.setCanAddMoreFlag(true)}var a=this.getInfoContainer();var b=Ext.Array.difference(this.getTypeList(),this.getTypeListToRemove());var c=Ext.create("Personify.view.profile.contactinfo.EmailEditForm");c.getController().setTypeList(b);this.getTypeListToRemove().push(b[0]);a.add(c)},setRecord:function(a){if(a){if(a.EntryProfile.getAt(0).EmailsProfile.getCount()>0){this.getInfoContainer().removeAll(true,true);var b=Ext.create("Personify.view.profile.contactinfo.email.EmailList",{scrollable:null,docked:"top",disableSelection:true,style:"margin-left: 50px;"});b.setStore(a.EntryProfile.getAt(0).EmailsProfile);this.getInfoContainer().add(b);this.getView().setHidden(false)}else{this.getView().setHidden(true)}}},setPresenterRecord:function(c){this.getInfoContainer().removeAll(true,true);if(c&&c.get("emailAddress")&&c.get("emailAddress")!=""){this.callParent(arguments);var f=Personify.utils.ServiceManager.getStoreManager();var e=f.getProfileEmailsStore();var b=Ext.create(e);var a=Personify.utils.ServiceManager.getModelManager();emailModelString=a.getProfileEmailsModel();emailModel=Ext.ModelManager.getModel(emailModelString);b.add(emailModel);b.getAt(0).set("type","");b.getAt(0).set("value",c.get("emailAddress"));var d=Ext.create("Personify.view.profile.contactinfo.email.EmailList",{scrollable:null,disableSelection:true});d.setStore(b);this.getInfoContainer().add(d)}},updateParams:function(b){this.updateAllRecordsForEditItems();var a=[];var j=[];var c=this.getRecordsForDelete();var h=this.getInfoContainer().getItems().items;var g=this.getCanAddMoreFlag();var f=(g==false)?h.length:h.length-1;for(var d=0;d<f;d++){var e=h[d].getRecord();a.push(e);Ext.Array.each(c,function(k,i,l){if(k.get("emailsId").toUpperCase()===e.get("emailsId").toUpperCase()){j.push(k)}})}c=Ext.Array.difference(c,j);Ext.Array.each(c,function(k,i,l){k.set("markForDelete",true)});a=a.concat(c);emailsParams=this.getParameterList(a);if(emailsParams){b.Emails=emailsParams}},getParameterList:function(b){var d=new Array();for(var c=0;c<b.length;c++){var a={InternalKey:b[c].get("internalKey"),NavigationKey:b[c].get("navigationKey"),Id:b[c].get("emailsId"),Value:b[c].get("value"),Type:b[c].get("type"),Primary:b[c].get("primary"),MarkForDelete:(b[c].get("markForDelete")==null)?false:b[c].get("markForDelete"),ProfileEmails:b[c].get("profileEmails"),ProfileRoles:b[c].get("profileRoles"),Urls:b[c].get("urls"),Emails:null,Roles:b[c].get("roles")};d[c]=a}return d}});
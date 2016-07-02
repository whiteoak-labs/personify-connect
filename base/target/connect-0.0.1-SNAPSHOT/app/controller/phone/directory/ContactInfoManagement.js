Ext.define("Personify.controller.phone.directory.ContactInfoManagement",{extend:"Personify.controller.profile.ContactInfoManagement",requires:["Personify.view.phone.purchasehistory.PurchaseHistoryManagement","Personify.view.phone.participationhistory.ParticipationHistoryManagement","Personify.view.phone.relationship.RelationshipManagement","Personify.view.phone.contacttracking.ContactTrackingManagement","Personify.view.phone.directory.contactinfo.ContactInfoEditForm"],inject:["currentUser"],config:{recordProfile:null,currentUser:null,directorySelectedRecord:null},control:{memberDetailToolbar:{onNavigationButtonTap:"onBack",actionButtonTap:"onEditButtonTap"},contactinfo:{},staffButtonsPanel:{},purchaseHistoryButton:{tap:"onPurchaseHistoryButtonTap"},participationHistoryButton:{tap:"onParticipationHistoryButton"},relationshipButton:{tap:"onRelationshipButtonTap"},contactTrackingButton:{tap:"onContactTrackingButtonTap"},addToMyProfileButton:{live:true,listeners:{tap:"onAddToMyProfileButtonTap"}},staffAddToMyAddressBook:{}},init:function(){var a=this;Ext.Viewport.setMasked({xtype:"loadmask"});Ext.callback(function(){var c=a.getView().config;var g=c.record;var b=c.listOfInfo;this.setListOfInfo(b);var m=c.presenterRecord;if(m){this.setPresenterRecord(m);var n=c.bio;this.getContactinfo().getController().setBioInfo(n);this.updateEnableEditToolBox(false);this.getMemberDetailToolbar().setTitle("Presenter Details");this.getContactinfo().getController().updateContactInfoTitleClass("p-phone-presenter-contactinfotitle")}else{var d=c.recordAttendee;this.updateEnableEditToolBox(false);if(d){this.setRecord(d,true)}else{var l=c.staffList;var j=c.callTopicList;var e=c.callSubjectList;var f=c.callTypeList;var i=c.countryListStore;var k=c.directorySelectedItem;if(k!=null){this.getMemberDetailToolbar().setTitle("Contact Details")}this.setDirectorySelectedRecord(k);this.getView().setStaffList(l);this.getView().setCallTopicList(j);this.getView().setCallSubjectList(e);this.getView().setCallTypeList(f);this.getView().setCountryListStore(i);var h=c.requestView;if(h=="directory"){this.getStaffButtonsPanel().setHidden(!this.getCurrentUser().isStaffMember());this.updateEnableEditToolBox(this.getCurrentUser().isStaffMember())}this.setRecord(g)}this.addButtonAddToMyAddressBook(c.addToMyAddressBookButton)}Ext.Viewport.setMasked(false)},a,[],1)},setCanedit:function(){},setListOfInfo:function(a){if(a){this.getContactinfo().getController().showListInfo(a)}},onNavigationButtonTap:function(){this.getView().fireEvent("navigationButtonTap")},onPurchaseHistoryButtonTap:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.purchasehistory.PurchaseHistoryManagement",{record:this.getView().config.record})},onParticipationHistoryButton:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.participationhistory.ParticipationHistoryManagement",{record:this.getView().config.record})},onRelationshipButtonTap:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.relationship.RelationshipManagement",{record:this.getView().config.record})},onContactTrackingButtonTap:function(){this.getView().fireEvent("requestchangeview","Personify.view.phone.contacttracking.ContactTrackingManagement",{record:this.getView().config.record,staffList:this.getView().getStaffList(),callTopicList:this.getView().getCallTopicList(),callTypeList:this.getView().getCallTypeList(),callSubjectList:this.getView().getCallSubjectList()})},onEditButtonTap:function(){var a=this;Ext.Viewport.setMasked({xtype:"loadmask"});Ext.callback(function(){a.getView().fireEvent("requestchangeview","Personify.view.phone.directory.contactinfo.ContactInfoEditForm",{record:a.getView().config.record,countryListStore:a.getView().getCountryListStore(),listOfInfo:a.getView().config.listOfInfo});Ext.Viewport.setMasked(false)},a,[],10)},updateEnableEditToolBox:function(a){if(this.getView()){this.getMemberDetailToolbar().getController().setHiddenActionButton(!a)}},resetToolbox:function(){},onBack:function(){var a=this;var b=a.getView();b.fireEvent("back",this)},addButtonAddToMyAddressBook:function(a){if(a==true){this.getStaffAddToMyAddressBook().add(Ext.create("Ext.Button",{text:"Add to my address book",itemId:"addToMyProfileButton",cls:"p-phone-button-addToMyAddress"}))}},setPresenterRecord:function(a){this.getContactinfo().getController().setPresenterRecord(a)},refreshRecordAfterEditing:function(b){if(b.updatedContact){var a=b.updatedContact;this.getView().config.record=a;this.setRecord(a)}else{this.LoadContactInfo(this.getDirectorySelectedRecord())}},LoadContactInfo:function(c){var f=this;f.getView().setMasked({xtype:"loadmask",message:"Loading",indicator:true,centered:true,fullscreen:true});var g={ReqMasterCustomerId:Personify.utils.Configuration.getCurrentUser().get("masterCustomerId"),ReqSubCustomerId:Personify.utils.Configuration.getCurrentUser().get("subCustomerId"),IsStaff:Personify.utils.Configuration.getCurrentUser().isStaffMember(),RecordType:c.get("type")};var e=c.get("masterCustomerId"),a=c.get("subCustomerId");if(e!=null&&!(e==="")){g.MasterCustomerId=e}if(a!=null&&!(a==="")){g.SubCustomerId=a}else{g.SubCustomerId="0"}var h=Personify.utils.ServiceManager.getStoreManager();var b=h.getProfileStore();var d=Ext.create(b,{dataRequest:g});d.load({callback:function(j,i,l){if(l&&j.length){var k=j[0];c.data["details"]=k;f.getView().config.record=k;f.setRecord(k)}else{}f.getView().setMasked(false)}})}});
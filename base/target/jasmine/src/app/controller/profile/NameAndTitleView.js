Ext.define("Personify.controller.profile.NameAndTitleView",{extend:"Personify.base.Controller",control:{displayName:{},jobTitle:{}},init:function(){this.callParent(arguments);this.getView().setRecord(null)},setRecord:function(a){if(a){this.getDisplayName().setHtml(a.EntryProfile.getAt(0).get("displayName"));this.getJobTitle().setHtml(a.EntryProfile.getAt(0).get("jobTitle"))}},setPresenterRecord:function(a){if(a){if(a.get("name")&&a.get("name")!=""){this.getDisplayName().setHtml(a.get("name"))}else{this.getDisplayName().setHtml("")}if(a.get("jobTitle")&&a.get("jobTitle")!=""){this.getJobTitle().setHtml(a.get("jobTitle"))}else{this.getJobTitle().setHtml("")}}}});
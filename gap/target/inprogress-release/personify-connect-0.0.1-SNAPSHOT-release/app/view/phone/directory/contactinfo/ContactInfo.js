Ext.define("Personify.view.phone.directory.contactinfo.ContactInfo",{extend:"Ext.Panel",xtype:"contactinfophone",controller:"Personify.controller.phone.directory.contactinfo.ContactInfo",requires:["Personify.controller.phone.directory.contactinfo.ContactInfo","Personify.view.phone.directory.contactinfo.PhotoAndRelated","Personify.view.phone.directory.contactinfo.ListInfoTemplate"],config:{editmode:null,cls:"p-phone-panel-contactinfo",items:[{xtype:"container",layout:"vbox",itemId:"infoPanelsContainer",hidden:true,items:[]}]},updateRecord:function(a){if(a){this.getController().setRecord(a)}},updateEditmode:function(a){if(a){this.getController().setEditmode(a)}},destroy:function(){this.getController().setEditmode(false);this.callParent(arguments)}});
Ext.define("Personify.controller.profile.ParticipationHistory",{extend:"Personify.base.Controller",requires:["Personify.utils.ItemUtil"],config:{store:null},control:{currentCommittee:{},futureCommittee:{},pastCommittee:{}},init:function(){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Profile Participation History")}},loadContactData:function(a){var c=this,f=Personify.utils.ServiceManager.getStoreManager(),e=f.getParticipationStore(),b=Ext.create(e),d={MasterCustomerID:a.get("masterCustomerId"),SubCustomerID:(a.get("subCustomerId")!="")?a.get("subCustomerId"):"0"};c.getView().setMasked({xtype:"loadmask"});b.setDataRequest(d);b.load({callback:function(){c.setStore(b);c.getView().setMasked(false)}});return b},updateStore:function(c){if(this.getView().isDestroyed){return}var i=this,f=i.getCurrentCommittee(),d=i.getFutureCommittee(),j=i.getPastCommittee(),a=Ext.create("Personify.base.Store"),e=Ext.create("Personify.base.Store"),h=Ext.create("Personify.base.Store");if(c.getCount()>0){if(c.getAt(0).CommitteeParticipation&&c.getAt(0).CommitteeParticipation.getCount()>0){var g=c.getAt(0).CommitteeParticipation;var b=new Date();g.each(function(k){if(new Date(k.get("startDate"))>b){h.add(k)}else{e.add(k)}})}if(c.getAt(0).PastCommitteeParticipation){a=c.getAt(0).PastCommitteeParticipation}}e.sort("startDate","DESC");f.setStore(e);h.sort("startDate","DESC");d.setStore(h);a.sort("startDate","DESC");j.setStore(a)}});
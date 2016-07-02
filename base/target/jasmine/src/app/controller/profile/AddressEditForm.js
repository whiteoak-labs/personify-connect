Ext.define("Personify.controller.profile.AddressEditForm",{extend:"Personify.controller.profile.template.EditItem",inject:["usStateStore"],config:{currentState:null,emptyItem:null,usStateStore:null},control:{checkBoxPrimary:{},typeList:{change:"onTypeListChange"},txtFieldStreetAd:{},primaryCheckBox:{},deleteButtonAd:{},txtFieldAd2:{},txtFieldAd3:{},txtFieldAd4:{},regionList:{change:"onRegionListChange"},txtLocalityAd:{},countryList:{change:"onCountryListChange"},txtFieldPostalCodeAd:{},deleteButtonAd:{tap:"onTapDeleteButton"}},setRecord:function(a){if(a!=null){this.setCurrentState(a.get("region"));this.getCheckBoxPrimary().setChecked(a.get("primary"));this.getTypeList().setValue(a.get("type"));this.getTxtFieldStreetAd().setValue(a.get("streetAddress"));this.getTxtFieldAd2().setValue(a.get("address2"));this.getTxtFieldAd3().setValue(a.get("address3"));this.getTxtFieldAd4().setValue(a.get("address4"));this.getTxtLocalityAd().setValue(a.get("locality"));this.getCountryList().setValue(a.get("country"));this.getTxtFieldPostalCodeAd().setValue(a.get("postalCode"));this.getDeleteButtonAd().setHidden(a.get("primary"));if(a.get("primary")==true){this.getDeleteButtonAd().hide();this.getPrimaryCheckBox().show()}else{this.getDeleteButtonAd().show();this.getPrimaryCheckBox().hide()}if(!this.getEmptyItem()){this.getTypeList().setReadOnly(true)}}},hideCountryList:function(c,b){var a=this.getCountryList();if(c==false){a.setStore(b)}a.setHidden(c)},getStateList:function(b){var d=this;var a=d.getView();if(a&&a.destroy!=Ext.emptyFn){a.setMasked({xtype:"loadmask"});if(b=="USA"){var c=this.getUsStateStore();if(c.getCount()>0){d.updateStateStore(c,b)}else{d.loadStateStore(b)}}else{d.loadStateStore(b)}}},loadStateStore:function(a){var e=this;var f=Personify.utils.ServiceManager.getStoreManager(),b=f.getStateStore(),d=Ext.create(b);var c={type:"rest",url:Personify.utils.ServiceManager.getUrlWS("utilStates")+"?%24format=json&%24filter=CountryCodeString%20eq('"+a+"')",headers:Personify.utils.ServiceManager.getHeaders(),reader:{implicitIncludes:true,type:"json",rootProperty:"d"}};d.setProxy(c);d.load({callback:function(){e.updateStateStore(d,a)}})},updateStateStore:function(f,g){var h=this;var a=Personify.utils.ServiceManager.getStoreManager();var j=a.getProfileTypeStore();var d=Ext.create(j);var c=new Array();var i=h.getView();if(f){var e=h.getEmptyItem();if(e==true){c.push({text:"",value:""})}h.getView().getStateDictionary()[g]=f;f.each(function(k){if(k!=null){c.push({text:k.get("stateDescription"),value:k.get("stateCode")})}});d.setData(c);if(i&&i.destroy!=Ext.emptyFn){h.getRegionList().setStore(d);var b=h.getCurrentState();if((b==="")||b){h.getRegionList().setValue(b)}i.setMasked(false);h.getView().getParent().fireEvent("loadedAnAddress")}}},validateData:function(){var a=this.getTxtFieldStreetAd().getValue().trim();if(a==""){return"blank"}else{return""}},syncRecordWithView:function(){this.getTxtFieldStreetAd().blur();this.getTxtFieldAd2().blur();this.getTxtFieldAd3().blur();this.getTxtFieldAd4().blur();this.getTxtLocalityAd().blur();this.getTxtFieldPostalCodeAd().blur();var l=this.getView(),d=l.getRecord(),f=this.getCheckBoxPrimary().isChecked(),k=this.getTxtFieldStreetAd().getValue(),b=this.getTxtFieldAd2().getValue(),a=this.getTxtFieldAd3().getValue(),m=this.getTxtFieldAd4().getValue(),e=this.getRegionList().getValue(),g=this.getTxtLocalityAd().getValue(),j=this.getCountryList().getValue(),i=this.getTxtFieldPostalCodeAd().getValue(),c=this.getTypeList().getValue(),h=Ext.util.Format.format("{0}\n{1}, {2}, {3} {4}, {5}",g,k,g,e,i,j);if(!e){e="";h=Ext.util.Format.format("{0}\n{1}, {2}, {3} {4}, {5}",g,k,g,e,i,j)}d.set("primary",f);d.set("streetAddress",k);d.set("address2",b);d.set("address3",a);d.set("address4",m);d.set("region",e);d.set("locality",g);d.set("country",j);d.set("postalCode",i);d.set("type",c);d.set("formatted",h);if(d.get("addressesId")==null||d.get("addressesId")==""){d.set("addressesId","0")}l.setRecord(d)},onCountryListChange:function(k,d,a,i){if(!this.getView().getParent()){return}if(d&&a){this.getView().setMasked({xtype:"loadmask"});var h=this.getView().getStateDictionary()[d];if(h){var f=new Array();var g=this.getEmptyItem();if(g==true){f.push({text:"",value:""})}var b=Personify.utils.ServiceManager.getStoreManager();var j=b.getProfileTypeStore();var e=Ext.create(j);h.each(function(l){if(l!=null){f.push({text:l.get("stateDescription"),value:l.get("stateCode")})}});e.setData(f);this.getRegionList().setStore(e);var c=this.getCurrentState();if((c==="")||c){this.getRegionList().setValue(c)}this.getView().setMasked(false);this.getView().getParent().fireEvent("loadedAnAddress")}else{this.getStateList(d)}}},setCountryForEmptyItem:function(a){this.getCountryList().setValue(a)},setRegionForEmptyItem:function(a){this.setCurrentState(a);this.getRegionList().setValue(a)},onRegionListChange:function(a,d,b){if(b){var c=a.getStore();if(c){c.each(function(e){if(e.get("value")==""){c.remove(e)}});a.setStore(c);a.setValue(d)}}}});
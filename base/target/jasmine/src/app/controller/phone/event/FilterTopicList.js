Ext.define("Personify.controller.phone.event.FilterTopicList",{extend:"Personify.base.Controller",control:{clearButton:{tap:"onClearFilterButtonTap"},listFilterItems:{itemtap:"onCheckBoxCheck"},submitFilter:{tap:"onSubmitFilterTap"}},setStoreData:function(a){this.getListFilterItems().setStore(a)},onCheckBoxCheck:function(d,f,j,e,b){var g=this;if(b.target.localName=="span"){var h=e.SubcodeListEvent;var i=b.target.parentNode;var c=i.htmlFor;var a=i.parentNode.className;if(a=="p-filterlist-phone-checkbox-item-child"){h.each(function(k){if(k.get("code")==c){if(k.get("checked")=="checked"){k.set("checked","")}else{k.set("checked","checked");e.set("checked","checked")}}})}else{if(e.get("checked")=="checked"){if(h){h.each(function(k){k.set("checked","")})}e.set("checked","")}else{e.set("checked","checked")}}}},onClearFilterButtonTap:function(){this.getView().hide();var a=this.getListFilterItems().getStore();Personify.utils.ItemUtil.onClearFilterStore(a);this.getView().fireEvent("onsubmitfilter",a);this.getListFilterItems().refresh()},onSubmitFilterTap:function(){this.getView().hide();var a=this.getListFilterItems().getStore();this.getView().fireEvent("onsubmitfilter",a)}});
Ext.define("Personify.controller.phone.attendee.AttendeesListPanel",{extend:"Personify.base.Controller",control:{titleEventOfAttendeesList:true,searchFieldAttendeePhone:{onClearIconTap:"onClearIconTapSearchFieldAttendeePhone",onTextChange:"onTextChangeSearchFieldAttendeePhone"},attendeesList:{itemtap:"onSelectAtendeeItemTap"}},setStore:function(a){var c="";if(a.get("shortName")){c=a.get("shortName")}else{if(a.get("title")){c=a.get("title")}}this.getTitleEventOfAttendeesList().setHtml(Personify.utils.ItemUtil.getShortContent(a.get("shortName"),48));var b=a.MeetingRegistrantStore;b.clearFilter();this.getAttendeesList().setStore(b)},onSelectAtendeeItemTap:function(f,b,e,a,d,c){if(!Personify.utils.PhoneGapHelper.checkConnection()){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}this.getView().fireEvent("selectattendeesitem",a)},onTextChangeSearchFieldAttendeePhone:function(b){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Attendee Search")}var a=this.getAttendeesList().getStore();if(a){a.clearFilter();if(b.trim()!=""){a.filter(function(c){didMatch=(c.get("firstName").trim().toLowerCase()+" "+c.get("lastName").trim().toLowerCase()+" "+c.get("employerName").trim().toLowerCase()+" ").match(b.trim().toLowerCase());if(didMatch){return c}})}}},onClearIconTapSearchFieldAttendeePhone:function(){this.getAttendeesList().getStore().clearFilter();this.getAttendeesList().deselectAll()}});
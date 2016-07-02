Ext.define("Personify.controller.tablet.event.Event",{extend:"Personify.base.Controller",inject:["iCalendarStore"],config:{panelFilter:false,recordFilter:null,calendarFilter:false,calendarDate:null,selectDate:null,valueSearch:null,hidePast:false,eventRecord:null,flagSelected:false,futureEvents:null,currentStore:null,itemSelected:false,expandEvent:null,indexExpandEvent:null,iCalendarStore:null,isSelectAll:false},control:{searchEventPanel:{tapsearchbutton:"onTapSearchButton",onsearchtextchange:"onTapSearchButton",seachclearicontap:"onSeachclearicontap"},personalButton:{tap:"onButtonPersonalTap"},allEventButton:{tap:"onAllEventButtonTap"},selectEventItem:{eventitemtap:"onEventItemTap",select:"onSelectEventItem"},selectEventPanel:{},calendarPanel:{selectiondatechange:"onSelectionDateChange",onchangecalendarview:"onChangeCalendarView"},filterButtonPanel:{onOpenFilterPanel:"onOpenFilterPanel",onclearfilter:"onClearFilterListevent"},bigEventPanel:{onEventItemTapped:"onEventItemOpen"},view:{painted:"onPainted"}},init:function(){this.callParent(arguments);var a=this;Ext.Viewport.setMasked({xtype:"loadmask"});Ext.callback(function(){a.checkIsLoadEventList()},a,[],1);this.getSearchEventPanel().getController().setPlaceHolder("Search Titles and Presenters")},checkIsLoadEventList:function(){var e=Ext.getStore("meetingListtingMain");var d=Ext.getStore("iCalendarStoreMain");var c=d?d.getAt(0):null;if(e&&c!=null){var g=Personify.utils.ServiceManager.getStoreManager();var b=g.getEventListStore();var f=Ext.create(b);e.each(function(h){f.add(h)});this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(f,g);this.getView().setRecord(c);var a=Personify.utils.Configuration.getCurrentUser();a&&a.isLogged()?this.getPersonalButton().show():this.getPersonalButton().hide()}else{this.onGetData()}},onPainted:function(){Ext.Viewport.setMasked(false)},updateRecordForSelectItems:function(d,c){var a=Personify.utils.Configuration.getCurrentUser();var b=a.getEventMonthStore(d);if(b.getCount()<=0){this.getSelectEventItem().setDeferEmptyText(false);this.getSelectEventItem().setEmptyText('<div class = "emptyText">No events found with your search criteria.</div>')}this.getSelectEventPanel().setStore(d);this.getSelectEventItem().setStore(b)},onEventItemTap:function(b){var a=this;Ext.callback(function(){a.getView().fireEvent("eventitemlistselect",b)},a,[],50)},onGetData:function(j,k){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Event List")}var h=this;var b=h.getSelectEventItem();var g=h.getFilterButtonPanel();var f=h.getCalendarPanel();b.setMasked({xtype:"loadmask"});g.getController().setDisabledFilterEventButton(true);var d=Personify.utils.Configuration.getCurrentUser();var c=Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);var e={IsStaffMember:d?d.isStaffMember().toString():false,IsMember:true,FromMonth:"1",ToMonth:"12",OrgID:d?d.get("organizationId"):c.get("orgId"),OrgUnitID:d?d.get("organizationUnitId"):c.get("orgUnitId"),MasterCustomerID:d?d.get("masterCustomerId"):"",SubCustomerID:d?d.get("subCustomerId"):"0"};var a=Personify.utils.ServiceManager.getStoreManager();var i=this.getICalendarStore();i.setDataRequest(e);i.load({callback:function(m,l,o){Deft.Injector.configure({iCalendarStore:{value:i}});if(o){h.getView().setRecord(i.getAt(0));var n=i.getAt(0).EventListStore;h.getView().fireEvent("copymeetinglist",n,i);if(m.length>0){h.removeItemsInnerSelectItem();h.updateRecordForSelectItems(n,a)}g.getController().setDisabledFilterEventButton(false)}else{b.setMasked(false);Personify.utils.ItemUtil.cantLoadEvent();h.getSelectEventItem().getStore().removeAll()}b.setMasked(false);if(j){Ext.callback(j,k)}},scope:this});var d=Personify.utils.Configuration.getCurrentUser();d&&d.isLogged()?this.getPersonalButton().show():this.getPersonalButton().hide()},onTapFieldButtonEvents:function(f,b,e,a,d,c){this.setExpandEvent(b);if(!this.getFlagSelected()&&!this.getItemSelected()){this.addData(a,e.getId())}this.setItemSelected(false);this.setFlagSelected(false)},onSelectFieldButtonEvents:function(h,b,e){if(!this.getItemSelected()){var c=h.getStore(),g=h.getSelection()[0],a=c.indexOf(g),d=h.getViewItems(),f=d[a];if(a===-1){a=this.getExpandEvent();d=h.getViewItems();f=d[a];this.addData(b.getAt(0),f.id)}else{this.addData(b,f.id)}this.setFlagSelected(true)}this.setItemSelected(false)},addData:function(a,c){var f=this;var e=Ext.get(c.trim());var d=null;if(e.down(".p-filter-button-new-enabled")){if(e.eventList){e.eventList.destroy();e.eventList=null}if(e.down(".newsFeedItem")){e.down(".newsFeedItem").destroy()}e.down(".p-filter-button-new-enabled").replaceCls("p-filter-button-new-enabled","p-filter-button-new")}else{if(a.get("startDateTimeString")!=null){d=f.getEventRecord()[Personify.utils.ItemUtil.getSelectDateTimeValue(Personify.utils.ItemUtil.convertStringToDate(a.get("startDateTimeString")))];d.sort({sorterFn:function(i,h){var k=Personify.utils.ItemUtil.convertStringToDate(i.get("startDateTimeString"));var j=Personify.utils.ItemUtil.convertStringToDate(h.get("startDateTimeString"));var o=parseInt(Ext.Date.format(k,"j"),10);var m=parseInt(Ext.Date.format(j,"j"),10);var n=parseInt(Ext.Date.format(k,"g:i"),10);var l=parseInt(Ext.Date.format(j,"g:i"),10);var g=i.get("shortName");var p=h.get("shortName");return o>m?1:(o==m?(n>l?1:(n==l?(g>p?1:(g==p?0:-1)):-1)):-1)},direction:"ASC"});var b=Ext.create("Personify.view.event.events.EventListItem",{store:d,listeners:{itemtap:function(h,i,l,g,k,j){f.setIndexExpandEvent(i);f.setFlagSelected(true);f.setItemSelected(true);f.getView().fireEvent("eventitemlistselect",g)}}});if(e.eventList){e.eventList.destroy();e.eventList=null}e.eventList=b;e.down(".p-filter-button-new").replaceCls("p-filter-button-new","p-filter-button-new-enabled");b.element.appendTo(e)}}},onTapEventsListItem:function(f,b,e,a,d,c){this.getView().fireEvent("eventitemlistselect",a)},onEventItemOpen:function(a){this.getView().fireEvent("eventitemlistselect",a)},onTapSearchButton:function(c){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Event Search")}this.setValueSearch(null);if(c){var d=this.getEventRecord();this.checkAndCombineFilter();var b=this.getSelectEventPanel().getStore();var f=Personify.utils.ServiceManager.getStoreManager();var a=f.getEventListStore();var e=Ext.create(a);b.each(function(g){e.add(g)});e.filter(function(h){didMatch=(h.get("shortName").trim().toLowerCase()+" "+h.get("shortDescription").trim().toLowerCase()+" "+h.get("eventType").trim().toLowerCase()+" "+h.get("location").trim().toLowerCase()).match(c.trim().toLowerCase());var g=h.SpeakersListEvent;g.each(function(i){didMatch=didMatch||i.get("name").trim().toLowerCase().match(c.trim().toLowerCase())});if(didMatch){return h}});this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(e,f);this.setIsSelectAll(true);this.getSelectEventItem().selectAll();this.setIsSelectAll(false);this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);this.setValueSearch(c)}},onButtonPersonalTap:function(){var b=this;if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Event Add To Calendar")}var a=Ext.Viewport.add([{xtype:"addevent",listeners:{refreshagenda:function(){b.refreshDataAgenda()}}}]);a.show()},onOpenFilterPanel:function(){var c=this;var b=this.getView().getRecord();var a=Ext.Viewport.add([{xtype:"filterPanel",record:b,listeners:{onsubmitfilter:function(d){c.onSubmitFilter(d)}}}]);a.show()},onSelectionDateChange:function(c){this.setCalendarDate(null);this.setCalendarFilter(false);this.setSelectDate(null);var e=Personify.utils.ServiceManager.getStoreManager();var a=e.getEventListStore();var d=Ext.create(a);this.checkAndCombineFilter();var b=this.getSelectEventPanel().getStore();b.each(function(f){d.add(f)});if(c){d.filter(function(g){var f=Personify.utils.ItemUtil.convertStringToDate(g.get("startDateTimeString"));f.setHours(0,0,0,0);var h=Personify.utils.ItemUtil.convertStringToDate(g.get("endDateTimeString"));if(f<=c&&h>=c){return g}})}this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(d,e);this.setIsSelectAll(true);this.getSelectEventItem().selectAll();this.setIsSelectAll(false);this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);this.setSelectDate(c);this.setCalendarFilter(true)},onChangeCalendarView:function(b){this.setSelectDate(null);this.setCalendarDate(null);this.setCalendarFilter(false);this.getCalendarPanel().getController().onRemoveSelectDate();var e=Personify.utils.ServiceManager.getStoreManager();var a=e.getEventListStore();var d=Ext.create(a);this.checkAndCombineFilter();var c=this.getSelectEventPanel().getStore();c.each(function(f){d.add(f)});if(b){d.filter(function(g){var f=Personify.utils.ItemUtil.convertStringToDate(g.get("startDateTimeString"));var h=Personify.utils.ItemUtil.convertStringToDate(g.get("endDateTimeString"));if(f.getFullYear()*100+f.getMonth()<=b.getFullYear()*100+b.getMonth()&&b.getFullYear()*100+b.getMonth()<=h.getFullYear()*100+h.getMonth()){return g}})}this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(d,e);this.setIsSelectAll(true);this.getSelectEventItem().selectAll();this.setIsSelectAll(false);this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);this.setCalendarFilter(true);this.setCalendarDate(b)},onSubmitFilter:function(d){this.setPanelFilter(false);var a=Personify.utils.ServiceManager.getStoreManager();var j=a.getEventListStore();var g=Ext.create(j);this.checkAndCombineFilter();var h=this.getSelectEventPanel().getStore();h.each(function(k){g.add(k)});var f=d.LocationListCountStore;var e=d.TopicListCountStore;if(f&&f.getAllCount()>0){var i=new Array();f.each(function(k){if(k.get("checked")=="checked"){i.push(k.get("code"))}});if(i.length>0){g.filter(function(k){var l=true;for(var m=0;m<i.length;m++){if(k.get("locationState")!=i[m]){l=false}}if(l){return k}})}}if(e&&e.getAllCount()>0){var c=new Array();var b=new Array();e.each(function(k){if(k.get("checked")=="checked"){c.push(k.get("code"));var l=new Array();if(k.SubcodeListEvent){k.SubcodeListEvent.each(function(m){if(m.get("checked")=="checked"){l.push(m.get("code"))}})}b.push(l)}});if(c.length>0){g.filter(function(k){var l=false;var m=k.TopicListEvent;m.each(function(o){var p=Ext.Array.indexOf(c,o.get("code"));if(p>=0){var n=b[p];if(n&&n.length>0){var q=o.SubcodeListEvent;q.each(function(r){if(Ext.Array.contains(n,r.get("code"))){l=true}})}else{l=true}}});if(l&&m.getAllCount()>0){return k}})}}this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(g,a);this.setIsSelectAll(true);this.getSelectEventItem().selectAll();this.setIsSelectAll(false);this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false);this.setPanelFilter(true);this.setRecordFilter(d)},onClearFilterListevent:function(){var a=this.getView().getRecord();Personify.utils.ItemUtil.onClearFilterStore(a.EventFormatListCountStore);Personify.utils.ItemUtil.onClearFilterStore(a.LocationListCountStore);Personify.utils.ItemUtil.onClearFilterStore(a.TopicListCountStore);this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true);this.getSearchEventPanel().down("#searchField").setValue("");this.getCalendarPanel().getController().onBackCurrentDate();this.setCalendarFilter(false);this.setPanelFilter(false);this.setRecordFilter(null);this.setCalendarDate(null);this.setValueSearch(null);this.setSelectDate(null);this.clearFilter();this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true)},clearFilter:function(){var d=Personify.utils.ServiceManager.getStoreManager();var a=d.getEventListStore();var c=Ext.create(a);var b=Ext.getStore("meetingListtingMain");b.each(function(e){c.add(e)});c.clearFilter();this.removeItemsInnerSelectItem();this.updateRecordForSelectItems(c,d)},checkAndCombineFilter:function(){this.combineFilter()},combineFilter:function(){this.clearFilter();var a=false;if(this.getValueSearch()){this.onTapSearchButton(this.getValueSearch());a=true}if(this.getPanelFilter()){var c=this.getRecordFilter();this.onSubmitFilter(c);a=true}if(this.getCalendarFilter()){var b=this.getCalendarDate();this.onChangeCalendarView(b);a=true}if(this.getSelectDate()){this.onSelectionDateChange(this.getSelectDate());a=true}return a},onAllEventButtonTap:function(){this.getView().fireEvent("gotomyschedule")},onEventItemSelect:function(a){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Event Detail")}this.getView().fireEvent("eventitemlistselect",a)},refreshData:function(b){this.onGetData();var a=Personify.utils.Configuration.getCurrentUser();a&&a.isLogged()?this.getPersonalButton().show():this.getPersonalButton().hide()},refreshDataAgenda:function(){this.getView().fireEvent("refreshmyschedule")},onSeachclearicontap:function(){var e=Personify.utils.ServiceManager.getStoreManager();var a=e.getEventListStore();var d=Ext.create(a);var b=Ext.getStore("meetingListtingMain");b.each(function(f){d.add(f)});d.clearFilter();var c=this.combineFilter();this.removeItemsInnerSelectItem();if(c){this.getFilterButtonPanel().getController().setDisabledClearFilterButton(false)}else{this.getFilterButtonPanel().getController().setDisabledClearFilterButton(true)}},removeItemsInnerSelectItem:function(){var b=this.getSelectEventItem().getViewItems();for(var c=0;c<b.length;c++){var a=Ext.get(b[c].id);if(a.eventList){a.eventList.destroy();a.eventList=null}}},onSelectEventItem:function(b,a){if(this.getIsSelectAll()&&!a.get("expanded")){a.set("expanded",true)}}});
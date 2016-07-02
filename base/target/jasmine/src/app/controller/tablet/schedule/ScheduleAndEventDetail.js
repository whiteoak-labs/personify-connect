Ext.define("Personify.controller.tablet.schedule.ScheduleAndEventDetail",{extend:"Personify.base.Controller",control:{eventListPage:{eventitemlistselect:"onItemSelect",gotomyevent:"onGoToMyEvent",removeagenda:"getObjectDelectMeetingAgenda",copyagendalist:"onCopyAgendaList"},complexeventPage:{backtoevent:"onBackToEvent",refreshmyschedule:"refreshMySchedule",updateagendalist:"refreshMySchedule"},simpleEventPage:{backtoevent:"onBackToEvent",refreshmyschedule:"refreshMySchedule",updatemeetinglist:"onUpdateEventList"},view:{painted:"onPainted"}},init:function(){this.getSimpleEventPage().getController().setBackToEventButtonText("< Back to Schedule");this.getComplexeventPage().getController().setBackToEventButtonText("< Back to Schedule");this.getView().setMasked(false)},onPainted:function(){Ext.Viewport.setMasked(false)},onItemSelect:function(a){var c=a.get("meetingId");var e=this;if(a.get("type").toUpperCase()=="PERSONAL"){e.openPesonalMeetingView(a)}else{var b=Ext.getStore("meetingListtingMain");if(b){var d=true;b.each(function(f){if(f.get("productID")==c){d=false;e.gotoMeetingDetail(f,a)}});if(d){Ext.Msg.alert("","Cannot find associated meeting, please help to report this problem.")}}else{this.getView().fireEvent("updatemeetinglist");Ext.callback(e.onItemSelect,e,[a],1000)}}},onBackToEvent:function(){var f=this;this.getView().setActiveItem(0);var c=f.getView();if(!this.getView().getActiveItem().getController()["getExpandEvent"]){return}var g=c.getActiveItem().getController(),d=g.getExpandEvent(),a=g.getEventRecord(),b=0;g.setFlagSelected(false);g.setItemSelected(false);if(d!=null){for(var e in a){if(b===d){setTimeout(function(){Ext.Viewport.setMasked({xtype:"loadmask",message:"Loading..."});if(Ext.get(g.getSelectScheduleItem().getViewItems()[b].id.trim()).down(".p-filter-button-new")){g.getSelectScheduleItem().select(a[e])}Ext.Viewport.setMasked(false)},100);break}b++}}this.getView().fireEvent("updatetitle","My Schedule","schedulemenuitem",true)},refreshMySchedule:function(){this.getEventListPage().refresh();this.getEventListPage().getController().combineFilter()},onGoToMyEvent:function(){this.getView().fireEvent("requestchangeview","Personify.view.EventAndEventDetail",null,"Events","eventmenuitem")},refreshData:function(){this.getEventListPage().refresh();this.getComplexeventPage().refresh();this.getSimpleEventPage().refresh()},gotoMeetingDetail:function(e,c){var a=e.get("isConference");var g=a?1:2;if(a){var d="";if(Ext.Viewport.getOrientation()=="landscape"){d="p-loading-normal-events-landscape"}else{d="p-loading-normal-events-portrait"}var b={xtype:"loadmask",message:"Loading..",fullscreen:true,centered:true,cls:d};Ext.Viewport.setMasked(b);var f=this;Ext.callback(function(){f.getComplexeventPage().setRecord(e);f.getComplexeventPage().getController().setCountLoad(0);if(e.get("isAdded")){if(!c.get("sessionID")||c.get("sessionID")==""||c.get("sessionID")=="0"){f.getComplexeventPage().getController().getAllDataOfChild(e,"sessionsAndDetail")}else{f.getComplexeventPage().getController().getAllDataOfChildAndGoToSession(e,"sessionsAndDetail",c)}}else{f.getComplexeventPage().getController().getAllDataOfChildAndGoToSession(e,"sessionsAndDetail",c)}},f,[],1)}else{this.getSimpleEventPage().setRecord(e);this.getSimpleEventPage().getController().initView()}this.getView().setActiveItem(g);this.getView().fireEvent("updatetitle",e.get("shortName"))},openPesonalMeetingView:function(b){var c=this;var a=Ext.Viewport.add([{xtype:"personalagenda",record:b,listeners:{removeagenda:function(d,e){c.getObjectDelectMeetingAgenda(d,e)}}}]);a.show()},getObjectDelectMeetingAgenda:function(b,g){Ext.Viewport.setMasked({xtype:"loadmask"});var e=this;var d={type:"ajax",method:"GET",url:Personify.utils.ServiceManager.getUrlWS("eventGetDeleteMeetingAgenda")+b.get("appointmentId"),headers:Personify.utils.ServiceManager.getHeaders(),reader:{type:"json",rootProperty:"d"}};var f=Personify.utils.ServiceManager.getStoreManager();var c=f.getObjectDeleteMeetingAgenda();var a=Ext.create(c);a.setProxy(d);a.load({callback:function(k,j,m){if(k.length>0){var h=Personify.utils.Configuration.getCurrentUser();var l=k[0];var i={EntityGUID:l.get("entityGUID"),AppointmentId:l.get("appointmentId"),OrganizationId:l.get("organizationId"),OrganizationUnitId:l.get("organizationUnitId"),MasterCustomerId:h.get("masterCustomerId"),SubCustomerId:h.get("subCustomerId"),AddedBy:l.get("addedBy"),ChangedBy:l.get("changedBy"),AddedOn:Personify.utils.ItemUtil.formatDateMSMySchedule(l.get("addedOn")),AppointmentDescription:b.get("description"),AppointmentEndDateTime:Personify.utils.ItemUtil.formatDateTimeSession(b.get("endDateTime")),AppointmentStartDateTime:Personify.utils.ItemUtil.formatDateTimeSession(b.get("startDateTime")),AppointmentTitle:b.get("title"),AppointmentTypeCodeString:"Meeting",AvailableToOrders:l.get("availableToOrders"),ChangedBy:"",ChangedOn:Ext.Date.format(new Date(),"c"),ConcurrencyId:l.get("concurrencyId"),MeetingParentProductCode:"",MeetingProductCode:"",MeetingProductId:b.get("meetingId"),SessionFee:b.get("price"),sessionLocation:b.get("location"),SessionParentProductCode:"",SessionProductCode:"",SessionProductId:b.get("sessionID"),SessionTrackCode:"",SessionTypeCode:"",SpeakerName:""};e.saveDeleteMeetingAgenda(i,b,g)}else{Ext.Msg.alert("","Cannot get agenda information to delete.");Ext.Viewport.setMasked(false)}},scope:this})},saveDeleteMeetingAgenda:function(d,b,g){var e=this;var f=Personify.utils.ServiceManager.getStoreManager();var c=f.getSaveDeleteMeetingAgenda();var a=Ext.create(c);a.setDataRequest(d);a.load({callback:function(l,m,q){if(q){if(b.get("meetingId")&&b.get("meetingId")!=""){var k=b.get("meetingId");if(e.getEventListPage().getRecord()){var p=Ext.getStore("meetingListtingMain");var j=null;for(var n=0;n<p.getCount();n++){if(p.getAt(n).get("productID")==k){j=p.getAt(n);break}}if(b.get("sessionID")&&b.get("sessionID")!=""&&b.get("sessionID")!="0"){var o=b.get("sessionID");var h=j.SessionStore;if(h){for(var n=0;n<h.getCount();n++){if(h.getAt(n).get("sessionID")==o){h.getAt(n).set("isAdded",false);break}}Ext.Msg.alert("",g)}else{e.onGetSesstionListData(j).then({success:function(r){j.SessionStore=r;for(var s=0;s<r.getCount();s++){if(r.getAt(s).get("sessionID")==o){r.getAt(s).set("isAdded",false);break}}Ext.Msg.alert("",g)},failure:function(){Ext.Msg.alert("","Error occurred while deleting agenda.")}})}e.getEventListPage().refresh()}else{if(j){j.set("isAdded",false)}e.getEventListPage().refresh();Ext.Msg.alert("",g)}}else{Ext.Msg.alert("","Error occurred while deleting agenda.")}}else{Ext.Msg.alert("","Error occurred while deleting agenda.")}}else{Ext.Msg.alert("","Error occurred while deleting agenda.")}Ext.Viewport.setMasked(false)},scope:this})},onUpdateEventList:function(){this.getView().getParent().fireEvent("updatemeetinglist")},onCopyAgendaList:function(a){this.getView().getParent().fireEvent("copyagendalist",a)},onGetSesstionListData:function(b){var e=Ext.create("Deft.promise.Deferred");var a=Personify.utils.Configuration.getCurrentUser();var d={MeetingID:b.get("productID"),IsStaffMember:a?a.isStaffMember().toString():false,IsMember:a?a.isMember().toString():false,ItemsPerPage:"100000",StartIndex:"0"};var g=Personify.utils.ServiceManager.getStoreManager();var c=g.getSessionStore();var f=Ext.create(c);f.setDataRequest(d);f.load({callback:function(i,h,j){if(j){e.resolve(f)}else{e.reject()}}});return e.promise}});
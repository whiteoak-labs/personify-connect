Ext.define("Personify.controller.event.complexevent.sessions.eventschedule.EventSchedule",{extend:"Personify.base.Controller",config:{trackValue:null,valueSearch:null,currentDate:null,dateIndex:0,lengthSegment:5,dayJump:1,sessionDates:null,currentUser:null,btnFilterByTrack:null},control:{filterTextLabel:true,filterSession:{onFilterByTrackButtonTap:"onFilterByTrackButtonTap",searchbuttontap:"onSearchButtonTap",clearicontap:"onClearIconTap",onsearchtextchange:"onSearchButtonTap",addpersonaltap:"onAddPersonalTap"},calendarSegmentEventSchedule:{},eventList:{oneventitemtap:"onEventItemTap",addsessiontoagenda:"onAddSessionToAgenda",deletesession:"onDeleteSessionToAgenda"},filterListEventSchedule:{filterbytrack:"onFilterByTrack"},backSegmentButton:{tap:"onBackSegmentButton"},nextSegmentButton:{tap:"onNextSegmentButton"}},init:function(){this.callParent(arguments);var a=this.getView().getRecord();this.setRecord(a)},setRecord:function(c){var e=this;var a=Personify.utils.Configuration.getCurrentUser();this.getEventList().setMasked({xtype:"loadmask"});this.setCurrentUser(a);if(c){if(c.SessionStore&&c.SessionStore.getCount()>0){var f=Personify.utils.ServiceManager.getStoreManager();var b=f.getSessionStore();var d=Ext.create(b);c.SessionStore.each(function(k){var j=false;if(c.MeetingAgendaStore){for(var h=0;h<c.MeetingAgendaStore.getCount();h++){var g=c.MeetingAgendaStore.getAt(h);if(g.get("sessionID")==k.get("sessionID")){if(!k.get("isAdded")){k.set("isAdded",true)}j=true;break}}}if(!j){if(k.get("isAdded")){k.set("isAdded",false)}}d.add(k)});this.getEventList().setStore(d);e.getArrayDate(d)}else{this.onGetData(c)}this.getView().setRecord(c);this.getFilterListEventSchedule().setRecord(c)}this.getEventList().setMasked(false)},onGetData:function(f,g){var h=this;var d=this.getCurrentUser();var e={MeetingID:f.data.productID,IsStaffMember:d?d.isStaffMember().toString():false,IsMember:d?d.isMember().toString():false,ItemsPerPage:"100000",StartIndex:"0"};var c=Personify.utils.ServiceManager.getStoreManager();var b=c.getSessionStore();var i=Ext.create(b);var a=Ext.create(b);i.setDataRequest(e);i.load({callback:function(k,j,l){if(k.length>0){i.each(function(m){if(g){if(Ext.Array.contains(g,m.get("sessionID"))){if(!m.get("isAdded")){m.set("isAdded",true)}}}a.add(m)});h.getEventList().setStore(i);h.getArrayDate(i);f.SessionStore=a}},scope:this})},showCalendarSegment:function(k){var p=this;var n=this.getDateIndex();var m=this.getLengthSegment();var d=this.getCurrentDate();var c=p.getCalendarSegmentEventSchedule();c.removeAll();var b=this.getSessionDates();var o=(1/b.length)*100;if(b.length>m){o=(1/m)*100}var a=(b.length<=3)?"F d":"M d";for(var j=n;j<b.length&&j<n+m;j++){var g=Ext.Date.format(b[j],a);var l="btn-date-list";if(d){var f="m/d/Y";var e=Ext.Date.format(d,f);var h=Ext.Date.format(b[j],f);if(e==h){l="btn-date-list-selected"}}c.add([{xtype:"button",data:b[j],text:g,style:{display:"inline-block",width:o+"%"},baseCls:l,listeners:{tap:function(){p.resetSegmentCls();p.onClickDateSegment(this.getData());this.setBaseCls("btn-date-list-selected")}},pressedCls:"p-button-pressing-opacity"}])}},resetSegmentCls:function(){var a=this.getCalendarSegmentEventSchedule();var b=a.getItems();for(var c=0;c<b.length;c++){b.getAt(c).setBaseCls("btn-date-list")}},onFilterByDate:function(b){var a=this.getEventList().getStore();if(a){a.clearFilter();this.updateFilter(a);this.setCurrentDate(b);a.filter(function(d){var c=Personify.utils.ItemUtil.convertStringToDateSession(d.get("startDateTimeString"));var e="m/d/y";if(Ext.Date.format(c,e)==Ext.Date.format(b,e)){return d}})}},updateFilter:function(a){var c=this.getValueSearch();var b=this.getTrackValue();if(c){a.filter(function(d){var e=d.get("title")+" "+d.get("location");if(d.SpeakerSession){d.SpeakerSession.each(function(f){e=e+" "+f.get("name")+" "+f.get("firstName")+" "+f.get("lastName")+" "+f.get("jobTitle")+" "+f.get("employer")})}if(e.toLowerCase().match(c.trim().toLowerCase())){return d}})}if(b!=null){a.filter(function(d){var e=false;d.TrackSession.each(function(f){if(f.get("tracks").trim().toLowerCase()==b.trim().toLowerCase()){e=true}});if(e){return d}})}},onEventItemTap:function(d,b,e,a,c){this.getView().getParent().fireEvent("onsessionitemtap",d,b,e,a)},onFilterByTrackButtonTap:function(a){this.getFilterListEventSchedule().showBy(a);a.setZIndex(8);this.setBtnFilterByTrack(a)},onSearchButtonTap:function(a){this.setValueSearch(a);this.takeAwayDaysNoResults()},onClearIconTap:function(){var a=this.getEventList().getStore();a.clearFilter();this.setValueSearch(null);this.getArrayDate(a);this.updateFilter(a)},onSelectDefaultDate:function(c){var f=this.getSessionDates();var b=this.getCalendarSegmentEventSchedule();var e=new Date();var a=false;Ext.Array.each(f,function(h){var i="m/d/y";if(Ext.Date.format(h,i)==Ext.Date.format(e,i)){a=true;e=h}});if(a){this.onFilterByDate(e);var d=Ext.Array.indexOf(f,e);var g=d%this.getLengthSegment();if(g==0){d>0?this.setDateIndex(d):this.setDateIndex(d)}else{this.setDateIndex(d-g)}this.showCalendarSegment(c)}else{if(f.length>0){this.onFilterByDate(f[0]);this.resetSegmentCls();b.getAt(0).setBaseCls("btn-date-list-selected")}}this.updateShowHidebutton()},onBackSegmentButton:function(){var a=this.getView().getRecord();var b=this.getDateIndex();if(b>0){this.setDateIndex(b-this.getDayJump());this.showCalendarSegment(a);this.updateShowHidebutton()}},onNextSegmentButton:function(){var a=this.getView().getRecord();var b=this.getDateIndex();var c=this.getLengthSegment();if(b+c<=this.getSessionDates().length){this.setDateIndex(b+this.getDayJump());this.showCalendarSegment(a);this.updateShowHidebutton()}},updateShowHidebutton:function(){var a=this.getView().getRecord();var b=this.getDateIndex();if(b>0){this.getBackSegmentButton().show()}else{this.getBackSegmentButton().hide()}if(b+this.getLengthSegment()<this.getSessionDates().length){this.getNextSegmentButton().show()}else{this.getNextSegmentButton().hide()}},getArrayDate:function(b){b.clearFilter();b.sort({sorterFn:function(e,d){var h=Personify.utils.ItemUtil.convertStringToDateSession(e.get("startDateTimeString"));var f=Personify.utils.ItemUtil.convertStringToDateSession(d.get("startDateTimeString"));if(h>f){return 1}else{if(h<f){return -1}else{var i=e.get("title");var g=d.get("title");return i>g?1:(i==g?0:-1)}}},direction:"ASC"});var a=this.getView().getRecord();var c=new Array();b.each(function(e){if(e){var d=new Date(Personify.utils.ItemUtil.convertStringToDateSession(e.get("startDateTimeString")));if(!Personify.utils.ItemUtil.checkDateInDateArray(c,d)){c.push(d)}}});this.setSessionDates(c);this.showCalendarSegment(a);this.onSelectDefaultDate(a)},onFilterByTrack:function(a){this.setTrackValue(a);if(a!=null){this.getFilterTextLabel().setHtml("Viewing: "+a)}else{this.getFilterTextLabel().setHtml("")}this.takeAwayDaysNoResults();this.getBtnFilterByTrack().setZIndex(0)},onClickDateSegment:function(a){this.setCurrentDate(a);this.onFilterByDate(this.getCurrentDate())},takeAwayDaysNoResults:function(){var a=this.getView().getRecord();var b=this.getEventList().getStore();this.getArrayDate(b);var f=this.getSessionDates();var e=new Array();for(var d=0;d<f.length;d++){this.onFilterByDate(f[d]);if(b.getCount()==0){e.push(f[d])}}for(var c=0;c<e.length;c++){Ext.Array.remove(f,e[c])}this.setSessionDates(f);this.setDateIndex(0);this.showCalendarSegment(a);this.onSelectDefaultDate(a);this.updateFilter(b)},onAddSessionToAgenda:function(a){this.getView().fireEvent("addsessiontoagenda",a)},onDeleteSessionToAgenda:function(a){this.getView().fireEvent("deletesession",a)},updateSessionList:function(c,b){var a=this.getEventList().getStore();a.clearFilter();a.each(function(d){if(d.get("sessionID")==c){if(d.get("isAdded")!=b){d.set("isAdded",b)}}});this.onFilterByDate(this.getCurrentDate());this.updateFilter(a)},onAddPersonalTap:function(){var a=this.getView().getRecord();this.getView().fireEvent("openaddpersonal",a)}});
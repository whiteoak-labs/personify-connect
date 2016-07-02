Ext.define("Personify.controller.phone.addevent.AddEvent",{extend:"Personify.base.Controller",control:{singledayButton:{tap:"onSingleDayTap"},multipledayButton:{tap:"onMultipleDaysTap"},eventDayCard:true,bothDatePicker:{change:"onBothDatePickerChanged",show:"hideAndroidKeyBoard"},startDatePicker:{change:"onStartDatePickerChanged",show:"hideAndroidKeyBoard"},endDatePicker:{change:"onEndDatePickerChanged",show:"hideAndroidKeyBoard"},singleStartTime:{change:"onSingleStartTimeChanged",show:"hideAndroidKeyBoard"},singleEndTime:{change:"onSingleEndTimeChanged",show:"hideAndroidKeyBoard"},eventTitle:true,eventDescription:true,eventLocation:true,eventToolbar:{onNavigationButtonTap:"onBack",actionButtonTap:"onAddPersonalEventButtonTap"}},config:{startDate:new Date(),endDate:new Date(),isSingleDate:true},init:function(){if(window.plugins.app47){window.plugins.app47.sendGenericEvent("Session Add To Calendar")}this.getEventToolbar().getController().setActionText("Done");this.updateDate()},updateDate:function(){var c,b,a,d;c=Personify.utils.ItemUtil.roundMinutes(new Date());if(c.getHours()==23){b=new Date();b.setHours(23);b.setMinutes(59)}else{b=Personify.utils.ItemUtil.oneHourLater(new Date())}a=Personify.utils.ItemUtil.roundMinutes(new Date());d=Personify.utils.ItemUtil.oneDateLater(a);this.getStartDatePicker().setValue(a);this.getEndDatePicker().setValue(d);this.getSingleStartTime().setValue(c);this.getSingleEndTime().setValue(b);this.getBothDatePicker().setValue(c);if(this.getIsSingleDate()){this.setStartDate(c);this.setEndDate(b)}else{this.setStartDate(a);this.setEndDate(d)}},onSingleDayTap:function(){this.setIsSingleDate(true);this.updateDate();this.getEventDayCard().setHeight(162);this.getEventDayCard().animateActiveItem(0,{type:"slide",direction:"right",duration:500})},onMultipleDaysTap:function(){this.setIsSingleDate(false);this.updateDate();this.getEventDayCard().setHeight(108);this.getEventDayCard().animateActiveItem(1,{type:"slide",direction:"left",duration:500})},onBothDatePickerChanged:function(c,e){var b=Ext.Date.format(this.getBothDatePicker().getValue(),"m/d/Y");var d=Ext.Date.format(this.getSingleStartTime().getValue(),"h:i A");var a=Ext.Date.format(this.getSingleEndTime().getValue(),"h:i A");this.getSingleStartTime().setValue(Ext.Date.parse(b+" "+d,"m/d/Y h:i A"));this.getSingleEndTime().setValue(Ext.Date.parse(b+" "+a,"m/d/Y h:i A"));this.setStartDate(this.getSingleStartTime().getValue());this.setEndDate(this.getSingleEndTime().getValue())},onSingleStartTimeChanged:function(d,f){if(typeof f=="object"){f=Ext.Date.format(f,"h:i A")}var c=Ext.Date.format(this.getBothDatePicker().getValue(),"m/d/Y");var e=Ext.Date.parse(c+" "+f,"m/d/Y h:i A");var b=Ext.Date.format(this.getSingleEndTime().getValue(),"h:i A");var a=Ext.Date.parse(c+" "+b,"m/d/Y h:i A");this.setStartDate(e);if(e>a){this.getSingleEndTime().setValue(e);this.setEndDate(e)}else{this.setEndDate(a)}},onSingleEndTimeChanged:function(c,f){if(typeof f=="object"){f=Ext.Date.format(f,"h:i A")}var b=Ext.Date.format(this.getBothDatePicker().getValue(),"m/d/Y");var e=Ext.Date.parse(b+" "+f,"m/d/Y h:i A");var a=Ext.Date.format(this.getSingleStartTime().getValue(),"h:i A");var d=Ext.Date.parse(b+" "+a,"m/d/Y h:i A");this.setEndDate(e);if(e<d){this.getSingleStartTime().setValue(e);this.setStartDate(e)}else{this.setStartDate(d)}},onStartDatePickerChanged:function(a,b){b=new Date(b);this.setStartDate(a.getValue());if(b>this.getEndDate()){this.setEndDate(a.getValue());this.getEndDatePicker().setValue(a.getValue())}},onEndDatePickerChanged:function(a,b){b=new Date(b);this.setEndDate(a.getValue());if(b<this.getStartDate()){this.setStartDate(a.getValue());this.getStartDatePicker().setValue(a.getValue())}},onAddPersonalEventButtonTap:function(){if(!Personify.utils.PhoneGapHelper.checkConnection()){Ext.Msg.alert("Connection","Please check your internet connection.",Ext.emptyFn);return}this.getEventTitle().blur();this.getEventDescription().blur();this.getEventLocation().blur();Ext.Viewport.setMasked({xtype:"loadmask",message:"Saving..."});var g=this.getEventTitle().getValue();g=g?g.trim():"";var e=this.getEventDescription().getValue();e=e?e.trim():"";var b=this.getEventLocation().getValue();b=b?b.trim():"";var a=this.getStartDate();var f=this.getEndDate();var c="";if(g==""){c+="Event Name <br>"}if(e==""){c+="Event Details <br>"}if(c==""){this.addNewCustomerMeetingAgenda(g,e,a,f,b)}else{var d="Please check your input for: <br>"+c;Ext.Msg.alert("",d,Ext.emptyFn);Ext.Viewport.setMasked(false)}},addNewCustomerMeetingAgenda:function(h,j,a,f,i){var g=this;var b=Personify.utils.Configuration.getCurrentUser();var e=this.getView().getRecord();var c=0;var d="Personal event";if(e){c=e.get("productID")}if(c){d="Personal session"}b.addPersonalEvent(h,j,a,f,i,c).then({success:function(k){g.getView().fireEvent("refreshagenda",k,true,function(n,l,m){if(Ext.typeOf(m)=="boolean"){if(!m){g.getView().fireEvent("back",g)}}else{g.getView().fireEvent("back",g)}});Ext.Msg.alert("",d+" has been added to your schedule.")},failure:function(){Ext.Msg.alert("","Error occurred while adding "+d)}}).always(function(){Ext.Viewport.setMasked(false)})},onBack:function(){var a=this;thisView=a.getView();thisView.fireEvent("back",this)},hideAndroidKeyBoard:function(){this.getEventTitle().blur();this.getEventDescription().blur();this.getEventLocation().blur();if(Ext.os.is("Android")){if(window.plugins.androidHelper){window.plugins.androidHelper.hideAndroidKeyBoard()}}}});
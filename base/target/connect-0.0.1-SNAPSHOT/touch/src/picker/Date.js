Ext.define("Ext.picker.Date",{extend:"Ext.picker.Picker",xtype:"datepicker",alternateClassName:"Ext.DatePicker",requires:["Ext.DateExtras","Ext.util.InputBlocker"],config:{yearFrom:1980,yearTo:new Date().getFullYear(),monthText:"Month",dayText:"Day",yearText:"Year",slotOrder:["month","day","year"],doneButton:true},platformConfig:[{theme:["Windows"],doneButton:{iconCls:"check2",ui:"round",text:""}}],initialize:function(){this.callParent();this.on({scope:this,delegate:"> slot",slotpick:this.onSlotPick});this.on({scope:this,show:this.onSlotPick})},setValue:function(b,a){if(Ext.isDate(b)){b={day:b.getDate(),month:b.getMonth()+1,year:b.getFullYear()}}this.callParent([b,a]);this.onSlotPick()},getValue:function(k){var h={},e=this.getItems().items,d=e.length,a,g,c,f,j,b;for(b=0;b<d;b++){j=e[b];if(j instanceof Ext.picker.Slot){h[j.getName()]=j.getValue(k)}}if(h.year===null&&h.month===null&&h.day===null){return null}f=Ext.isNumber(h.year)?h.year:1;c=Ext.isNumber(h.month)?h.month:1;g=Ext.isNumber(h.day)?h.day:1;if(c&&f&&c&&g){a=this.getDaysInMonth(c,f)}g=(a)?Math.min(g,a):g;return new Date(f,c-1,g)},updateYearFrom:function(){if(this.initialized){this.createSlots()}},updateYearTo:function(){if(this.initialized){this.createSlots()}},updateMonthText:function(a,b){var f=this.getInnerItems,e=f.length,d,c;if(this.initialized){for(c=0;c<e;c++){d=f[c];if((typeof d.title=="string"&&d.title==b)||(d.title.html==b)){d.setTitle(a)}}}},updateDayText:function(a,c){var f=this.getInnerItems,e=f.length,d,b;if(this.initialized){for(b=0;b<e;b++){d=f[b];if((typeof d.title=="string"&&d.title==c)||(d.title.html==c)){d.setTitle(a)}}}},updateYearText:function(e){var d=this.getInnerItems,c=d.length,b,a;if(this.initialized){for(a=0;a<c;a++){b=d[a];if(b.title==this.yearText){b.setTitle(e)}}}},constructor:function(){this.callParent(arguments);this.createSlots()},createSlots:function(){var k=this,c=k.getSlotOrder(),m=k.getYearFrom(),e=k.getYearTo(),f=[],l=[],b=[],h=m>e,j,d,a;while(m){f.push({text:m,value:m});if(m===e){break}if(h){m--}else{m++}}a=k.getDaysInMonth(1,new Date().getFullYear());for(d=0;d<a;d++){l.push({text:d+1,value:d+1})}for(d=0,j=Ext.Date.monthNames.length;d<j;d++){b.push({text:Ext.Date.monthNames[d],value:d+1})}var g=[];c.forEach(function(i){g.push(k.createSlot(i,l,b,f))});k.setSlots(g)},createSlot:function(b,d,a,c){switch(b){case"year":return{name:"year",align:"center",data:c,title:this.getYearText(),flex:3};case"month":return{name:b,align:"right",data:a,title:this.getMonthText(),flex:4};case"day":return{name:"day",align:"center",data:d,title:this.getDayText(),flex:2}}},onSlotPick:function(){var g=this.getValue(true),f=this.getDaySlot(),e=g.getFullYear(),d=g.getMonth(),j=[],a,b;if(!g||!Ext.isDate(g)||!f){return}this.callParent(arguments);a=this.getDaysInMonth(d+1,e);for(b=0;b<a;b++){j.push({text:b+1,value:b+1})}if(f.getStore().getCount()==j.length){return}f.getStore().setData(j);var h=f.getStore(),m=f.getViewItems(),l=f.getValueField(),c,k;c=h.find(l,g.getDate());if(c==-1){return}k=Ext.get(m[c]);f.selectedIndex=c;f.scrollToItem(k);f.setValue(f.getValue(true))},getDaySlot:function(){var c=this.getInnerItems(),b=c.length,a,d;if(this.daySlot){return this.daySlot}for(a=0;a<b;a++){d=c[a];if(d.isSlot&&d.getName()=="day"){this.daySlot=d;return d}}return null},getDaysInMonth:function(c,b){var a=[31,28,31,30,31,30,31,31,30,31,30,31];return c==2&&this.isLeapYear(b)?29:a[c-1]},isLeapYear:function(a){return !!((a&3)===0&&(a%100||(a%400===0&&a)))},onDoneButtonTap:function(){var a=this._value,c=this.getValue(true),b=c;if(Ext.isDate(c)){b=c.toDateString()}if(Ext.isDate(a)){a=a.toDateString()}if(b!=a){this.fireEvent("change",this,c)}this.hide();Ext.util.InputBlocker.unblockInputs()}});
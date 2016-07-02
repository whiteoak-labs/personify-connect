Ext.define("Personify.view.event.complexevent.sessions.myschedule.MyScheduleList",{extend:"Ext.dataview.List",xtype:"mysessionschedulelist",controller:"Personify.controller.event.complexevent.sessions.myschedule.MyScheduleList",requires:["Personify.controller.event.complexevent.sessions.myschedule.MyScheduleList","Personify.view.event.complexevent.sessions.eventschedule.EventItemList"],config:{baseCls:"allSessionList",itemCls:"allSessionListItem",deferEmptyText:false,emptyText:'<div class="p-presenter-emptyText">Currently, there are no sessions in your schedule.<br>You may add a session by selecting a session and choosing ‘Add to My Schedule’</div>',pressedCls:"p-button-pressing-opacity",selectedCls:"p-button-pressing-opacity",store:null,itemTpl:null},initialize:function(){var a=Ext.create("Personify.view.event.complexevent.sessions.eventschedule.EventItemList");this.setItemTpl(new Ext.XTemplate('<tpl for=".">',a.element.dom.innerHTML,"</tpl>",{changeTime:function(b){if(b){var c=Personify.utils.ItemUtil.changeTimeMySession(b);return c}return b},changeButtonCls:function(b){return"p-button-red-inlist"},changeButtonText:function(b){return"Remove Session"}}));this.callParent(arguments);a.destroy()}});
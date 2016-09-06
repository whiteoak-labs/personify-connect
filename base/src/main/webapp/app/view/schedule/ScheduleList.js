Ext.define('Personify.view.schedule.ScheduleList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'myschedulelist',
    requires: [
        'Personify.controller.schedule.ScheduleList',
        'Personify.view.schedule.ScheduleItem'
    ],
    controller: 'Personify.controller.schedule.ScheduleList',
    config: {
        cls: 'panel-left ',
        itemId: 'listEventItem',
        xtype: 'list',
        scrollable: null,
        grouped: true,
        baseCls: 'p-list-event-new',
        pressedCls: '',
        selectedCls: '',
        disableSelection: true,
        deferEmptyText: false,
        
        itemTpl: null,

        listeners : {
            itemtap : function(dataview, index, target, record, e, eOpts) {
                e.preventDefault();
                var store = dataview.getStore();
                var groupName = this.getGroupOfrecord(record);
                var allGroup = store.getGroups();
                var groupsValue = this.getGroupValue(groupName, allGroup);
                var me = this;
                
                if (e.target.className.indexOf('p-list-event-new-header') >= 0) {
                    if (e.target.className.indexOf('p-list-expand') >= 0) {
                        this.hiddenRecord(groupsValue);
                        e.target.classList.remove('p-list-expand');
                    } else {
                        this.showRecord(groupsValue);
                        e.target.classList.add('p-list-expand');
                    }
                } else {
                    if (e.target.className.indexOf('x-button') >= 0) {
                        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                            return;
                        }

                        var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);
                        
                        Ext.Msg.confirm('', message.msg, processResult);
                        
                        function processResult(clickedButton) {
                            Ext.Msg.hide();
                            
                            if(clickedButton == 'yes') {
                               me.getParent().fireEvent('removeagenda', record, message.msgSuccess);
                            }
                        }
                    } else {
                    	this.getParent().fireEvent('scheduleitemselect', record);
                    }
                }
            }
        }
    },//config
    
    hiddenRecord : function(records) {
        var store = this.getStore();
        
        for (var i = 0; i < records.length; i++) {
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[0].element.dom.childNodes[index];
            var classListNode = null;
            
//            if (elements.className.indexOf('p-list-event-new-header-item') >= 0) {
//                classListNode = elements.childNodes[1].classList;
//            } else {
//                classListNode = elements.childNodes[0].classList;
//            }
            
//            classListNode.add('p-hiddenCls');
        }

//        this.doRefreshHeaders();
    },

    showRecord : function(records) {
        var store = this.getStore();
        
        for (var i = 0; i < records.length; i++) {
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[0].element.dom.childNodes[index];
            var classListNode = null;
            
//            if (elements.className.indexOf('p-list-event-new-header-item') >= 0) {
//                classListNode = elements.childNodes[1].classList;
//            } else {
//                classListNode = elements.childNodes[0].classList;
//            }
//
//            classListNode.remove('p-hiddenCls');
        }
    },

    getGroupOfrecord : function(record) {
        var startDateTime = record.get('startDateTime');
        var month = Personify.utils.ItemUtil.getMonthEventView(startDateTime);
        var numMonth = Ext.Date.format(startDateTime, 'm');
        var year = Personify.utils.ItemUtil.getYearEventView(startDateTime);
        return '<span style="color:transparent;display:none!important">' + year + "," + numMonth + '</span>' + month + ' ' + year;
    },

    getGroupValue : function(groupName, allGroup) {
        for (var i = 0; i < allGroup.length; i++) {
            if (allGroup[i].name == groupName) {
                return allGroup[i].children;
            }
        }
        return null;
    },

    updateHeaderCls : function() {
        if (this.getItems().items[0]) {
            for (var i = 0; i < this.getItems().items[0].element.dom.childNodes.length; i++) {
                var elements = this.getItems().items[0].element.dom.childNodes[i];
                
                if (elements.className.indexOf('p-list-event-new-header-item') >= 0) {
                    if (elements.childNodes[1].className.indexOf('p-hiddenCls') < 0) {
                        elements.childNodes[0].classList.add('p-list-expand');
                    }
                }
            }
        }
    },

    doRefreshHeaders : function() {
        this.callParent(arguments);
        this.updateHeaderCls();
    },
    initialize: function() {
        var template = Ext.create('Personify.view.schedule.ScheduleItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML,
            {
                getType: function(values){
                    var type = values.type;
                    var meetingId = values.meetingId;
                    var sessionID = values.sessionID;
                    if(type.toUpperCase() == 'PERSONAL'){
                        return "PERSONAL ";
                    }else{
                        if(sessionID && sessionID != 0){
                            return "SESSION ";
                        }else{
                            return "MEETING";
                        }
                    }
                }
            }
        ));
        this.callParent(arguments);
        template.destroy();
    }
});
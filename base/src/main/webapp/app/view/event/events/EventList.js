Ext.define('Personify.view.event.events.EventList', {
    extend : 'Ext.dataview.DataView',
    xtype : 'schedulelist',
    controller : 'Personify.controller.event.events.EventList',
    requires: [
        'Personify.controller.event.events.EventList',
        'Personify.view.event.events.EventItem'
    ],

    config : {
        cls : 'panel-left ',
        itemId : 'listEventItem',
        xtype : 'dataview',
        scrollable : null,
        grouped : true,
        baseCls: 'newsFeedItem',
        pressedCls: 'p-dataview-pressed',
        disableSelection : true,
        deferEmptyText : false,
        itemTpl : null,

        listeners : {
            itemtap : function(dataview, index, target, record, e, eOpts) {
                e.preventDefault();
                var store = dataview.getStore();
                var groupName = this.getGroupOfrecord(record);
                var allGroup = store.getGroups();
                var groupsValue = this.getGroupValue(groupName, allGroup);
                
                if (e.target.className.indexOf('p-list-event-new-header') >= 0) {
                    if (e.target.className.indexOf('p-list-expand') >= 0) {
                        this.hiddenRecord(groupsValue);
                        e.target.classList.remove('p-list-expand');
                    } else {
                        this.showRecord(groupsValue);
                        e.target.classList.add('p-list-expand');
                    }
                } else {
                    this.getParent().fireEvent('eventitemlistselect', record);
                }
            }
        }
    }, //config

    hiddenRecord : function(records) {
        var store = this.getStore();
        
        for (var i = 0; i < records.length; i++) {
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[0].element.dom.childNodes[index];
            var classListNode = null;
            
            if (elements.className.indexOf('p-list-event-new-header-item') >= 0) {
                classListNode = elements.childNodes[1].classList;
            } else {
                classListNode = elements.childNodes[0].classList;
            }
            
            classListNode.add('p-hiddenCls');
        }

        this.doRefreshHeaders();
    },

    showRecord : function(records) {
        var store = this.getStore();
        
        for (var i = 0; i < records.length; i++) {
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[0].element.dom.childNodes[index];
            var classListNode = null;
            
            if (elements.className.indexOf('p-list-event-new-header-item') >= 0) {
                classListNode = elements.childNodes[1].classList;
            } else {
                classListNode = elements.childNodes[0].classList;
            }
            
            classListNode.remove('p-hiddenCls');
        }
    },

    getGroupOfrecord : function(record) {
        var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
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
//        this.callParent(arguments);
        this.updateHeaderCls();
    },

    initialize : function() {
        var template = Ext.create('Personify.view.event.events.EventItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML, {
            isRegistered : function(reg) {
                if (reg) {
                    return 'Registered';
                } else
                    return '';
            },
            isMembersOnly : function(membersOnly) {
                if (membersOnly == false) {
                    return '';
                } else {
                    return '<div class="eventStatus">Member Only</div>';
                }
            },

            getTypeOfEvent : function(record) {
                var isConference = record.isConference;
                var EventType = record.eventType;
                if (!isConference) {
                    if (EventType == "M") {
                        return 'Meeting';
                    } else if (EventType == "S") {
                        return 'Session';
                    } else
                        return 'Conference';
                } else
                    return 'Conference';
            }
        }));
        this.callParent(arguments);
        template.destroy();
    }
});

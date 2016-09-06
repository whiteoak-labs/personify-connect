Ext.define('Personify.view.phone.schedule.ScheduleList', {
    extend: 'Ext.dataview.List',
    xtype: 'myschedulelistphone',
    requires: [
        'Personify.controller.phone.schedule.ScheduleList',
        'Personify.view.phone.schedule.ScheduleItem'
    ],
    controller: 'Personify.controller.phone.schedule.ScheduleList',
    config: {
        baseCls: 'p-phone-list-event',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        itemCls: 'p-item-list-event',
        xtype: 'list',
        grouped: true,
        deferEmptyText: false,
        onItemDisclosure: true,
        emptyText: '<div class="phone-emptyText">Currently, there are no events in your schedule. <br> You may add an event by selecting an event and choosing ‘Add to My Schedule’</div>',
        itemTpl: null,
        listeners: {
            itemtap: function(dataview, index, target, record, e, eOpts) {
                e.preventDefault();
                var store = dataview.getStore();
                var groupName = this.getGroupOfrecord(record);
                var allGroup = store.getGroups();
                var groupsValue = this.getGroupValue(groupName, allGroup);
                if (e.target.className.indexOf('p-phone-list-event-header') >= 0) {
                    if(e.target.className.indexOf('p-list-expand') >= 0){
                        this.hiddenRecord(groupsValue);
                        e.target.classList.remove('p-list-expand');
                    }else{
                        this.showRecord(groupsValue);
                        e.target.classList.add('p-list-expand');
                    }
                }else{
                    this.fireEvent('eventitemlistselect', dataview, index, target, record, e, eOpts);
                }
            }
        }
    },//config
    
    initialize: function() {
        var template = Ext.create('Personify.view.phone.schedule.ScheduleItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    },
    
    getGroupOfrecord: function(record){
        var startDateTime = record.get('startDateTime');
        var month = Personify.utils.ItemUtil.getMonthEventView(startDateTime);
        var numMonth = Ext.Date.format(startDateTime,'m');
        var year = Personify.utils.ItemUtil.getYearEventView(startDateTime);
        return '<span style="color:transparent;display:none!important">'+year + "," + numMonth + '</span>' + month +' ' +year;
    },
    
    getGroupValue: function(groupName, allGroup){
        for(var i = 0; i < allGroup.length; i++){
            if(allGroup[i].name == groupName){
                return allGroup[i].children;
            }
        }
        return null;
    },
    
    hiddenRecord: function(records){
        var store = this.getStore();
        for(var i = 0; i< records.length; i++){
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[0].element.dom.childNodes[index];
            var classListNode = null;
            if(elements.className.indexOf('p-phone-list-event-header-item') >= 0){
                classListNode = elements.childNodes[1].classList;
            }else{
                classListNode = elements.childNodes[0].classList;
            }
            classListNode.add('p-hiddenCls');
        }
        this.doRefreshHeaders();
    },
    
    showRecord: function(records){
        var store = this.getStore();
        for(var i = 0; i< records.length; i++){
            var index = store.indexOf(records[i]);
            var elements = this.getItems().items[1].element.dom.childNodes[index];
            var classListNode = null;
            if(elements.className.indexOf('p-phone-list-event-header-item') >= 0){
                classListNode = elements.childNodes[1].classList;
            }else{
                classListNode = elements.childNodes[0].classList;
            }
            classListNode.remove('p-hiddenCls');
        }
    },
    
    updateHeaderCls: function(){
        if(this.getItems().items[1]){
            for(var i = 0; i < this.getItems().items[1].element.dom.childNodes.length; i++){
                var elements = this.getItems().items[1].element.dom.childNodes[i];
                if(elements.className.indexOf('p-phone-list-event-header-item') >= 0){
                    if(elements.childNodes[1].className.indexOf('p-hiddenCls')< 0){
                        elements.childNodes[0].classList.add('p-list-expand');
                    }else{
                        elements.childNodes[0].classList.remove('p-list-expand');
                    }
                }
            }
        }
    },
    
    doRefreshHeaders: function(){
//        this.callParent(arguments);
        this.updateHeaderCls();
    }
});
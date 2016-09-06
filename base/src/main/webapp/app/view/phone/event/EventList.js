Ext.define('Personify.view.phone.event.EventList', {
    extend: 'Ext.dataview.List',
    xtype: 'eventslistphone',
    requires: [
        'Personify.controller.phone.event.EventList',
        'Personify.view.phone.event.EventItem'
    ],
    controller: 'Personify.controller.phone.event.EventList',
    config: {
        baseCls: 'p-phone-list-event',
        itemCls: 'p-item-list-event',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        xtype: 'list',
        grouped: true,
        deferEmptyText: false,
        onItemDisclosure: true,
        emptyText: '<div class="phone-emptyText">No Event</div>',
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
                    this.fireEvent('eventitemlistselect', record);
                }
            }
        }
    },//config
    
    initialize: function() {
        var template = Ext.create('Personify.view.phone.event.EventItem');

        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML,
            {
                isRegistered: function(reg){
                    if(reg){
                        return 'Registered';
                    }
                    else return '';
                }
            }
        ));

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
            if(elements.className.indexOf('p-phone-list-event-header') >= 0){
                classListNode = elements.childNodes[1].classList;
            }else{
                classListNode = elements.childNodes[0].classList;
            }
            classListNode.add('p-hiddenCls');
        }
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
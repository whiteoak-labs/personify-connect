Ext.define('Personify.view.phone.session.MySessionList', {
    extend: 'Ext.dataview.List',
    xtype: 'mysessionlistphone',
    requires: 'Personify.view.phone.session.MySessionItem',
//    controller: 'Personify.controller.phone.event.EventList',
    config: {
        baseCls: 'p-phone-list-session',
        itemCls: 'p-item-list-session',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        xtype: 'list',
        scrollToTopOnRefresh:false,   
        grouped: true,
        deferEmptyText: false,
        onItemDisclosure: true,
        emptyText: '<div class="phone-emptyText">Currently, there are no sessions in your schedule.<br>You may add a session by selecting a session and choosing ‘Add to My Schedule’</div>',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.session.MySessionItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML, {
            checkLocationNull : function(location) {
                if(location == null || location == "") {
                    return '';
                } else {
                    return ' | ' + location;
                }
            }
        }));
        this.callParent(arguments);
        template.destroy();
    },

    setStore: function(store){
        if (!store) {
            return;
        }
        store.setGrouper(
            {
                groupFn: function(record) {
                    var startDateTime = record.get('startDateTime');
                    return Ext.Date.format(startDateTime,'g a');
                },
                sorterFn: function(record1, record2) {
                    var startDateTime1 = record1.get('startDateTime');
                    var startDateTime2 = record2.get('startDateTime');
                    var date1 = startDateTime1;
                    var date2 = startDateTime2;
                    ////return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
                    if (date1 > date2) {
                         return 1;
                     } else if (date1 < date2) {
                         return -1;
                     } else {
                         var title1 = record1.get('title');
                         var title2 = record2.get('title');
                         return title1 > title2 ? 1 : (title1 == title2 ? 0 : -1);
                     }
     
                         
                },
                direction: 'ASC'
            }
        );
        this.callParent(arguments);
    }
});

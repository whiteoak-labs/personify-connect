Ext.define('Personify.view.event.complexevent.sessions.eventschedule.EventList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'eventlist',
    controller: 'Personify.controller.event.complexevent.sessions.eventschedule.EventList',
    requires: [
        'Personify.controller.event.complexevent.sessions.eventschedule.EventList',
        'Personify.view.event.complexevent.sessions.eventschedule.EventItemList'
    ],

    config: {
        itemCls: 'item-event-complex-list',
        deferEmptyText: false,
        emptyText: '<div class="p-presenter-emptyText">No Event</div>',
        pressedCls: '',
        selectedCls: '',
        store: null,
        itemTpl: null
    },

    initialize: function() {
        var template =  Ext.create('Personify.view.event.complexevent.sessions.eventschedule.EventItemList');
        this.setItemTpl(new Ext.XTemplate('<tpl for=".">',
            template.element.dom.innerHTML,
            '</tpl>',
            {
                changeTime: function(time) {
                    if(time) {
                        var str = Personify.utils.ItemUtil.changeTimeSession(time);
                        return str;
                    }
                    return time;
                },

                changeButtonCls: function(isAdded){
                    if(isAdded) {
                        return 'p-button-red-inlist';
                    } else {
                        return 'p-button-blue-inlist';
                    }
                },

                changeButtonText: function(isAdded){
                    if(isAdded) {
                        return 'Remove Session';
                    } else {
                        return 'Add to My Schedule';
                    }
                }
            }));
        this.callParent(arguments);
        template.destroy();
    },

    destroy: function() {
        var items = this.getViewItems();

        for (var i = 0; i < items.length; i++) {
            var item = Ext.get(items[i].id.trim());

            if (item.eventList) {
                item.eventList.destroy();
                item.eventList = null;
            }
        }

        return this.callParent(arguments);
    }
});
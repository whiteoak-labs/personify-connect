Ext.define('Personify.view.event.complexevent.sessions.myschedule.MyScheduleList', {
    extend: 'Ext.dataview.List',
    xtype: 'mysessionschedulelist',
    controller: 'Personify.controller.event.complexevent.sessions.myschedule.MyScheduleList',
    requires: [
        'Personify.controller.event.complexevent.sessions.myschedule.MyScheduleList',
        'Personify.view.event.complexevent.sessions.eventschedule.EventItemList'
    ],

    config: {
        baseCls: 'allSessionList',
        itemCls: 'item-event-complex-list-wrap',////'allSessionListItem',
        deferEmptyText: false,
        emptyText: '<div class="p-presenter-emptyText">Currently, there are no sessions in your schedule.<br>You may add a session by selecting a session and choosing ‘Add to My Schedule’</div>',
        pressedCls: 'p-button-pressing-opacity',
        selectedCls: 'p-button-pressing-opacity',
        store: null,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.event.complexevent.sessions.eventschedule.EventItemList');
        this.setItemTpl(new Ext.XTemplate('<tpl for=".">',
            template.element.dom.innerHTML,
            '</tpl>',
            {
                changeTime: function(time) {
                    if(time) {
                        var str = Personify.utils.ItemUtil.changeTimeMySession(time);
                        return str;
                    }
                    return time;
                },

                changeButtonCls: function(isMine) {
                    return 'p-button-red-inlist';
                },

                changeButtonText: function(isMine) {
                    return 'Remove Session';
                }
            }));

        this.callParent(arguments);
        template.destroy();
    }
});
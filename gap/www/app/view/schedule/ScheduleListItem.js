Ext.define('Personify.view.schedule.ScheduleListItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'schedulelistitem',
    requires: 'Personify.view.schedule.ScheduleItem',

    config: {
        baseCls: 'newsFeedItem',
        pressedCls: 'p-dataview-pressed',
        scrollable: null,
        feedRecord: null,
        onItemDisclosure: true,
        itemId: 'elementNewsFeedItem',
        emptyText: 'No Data',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.schedule.ScheduleItem');
        this.setItemTpl(
            new Ext.XTemplate(template.element.dom.innerHTML,
                {
                    getType: function(values) {
                        var type = values.type;
                        var meetingId = values.meetingId;
                        var sessionID = values.sessionID;

                        if (type.toUpperCase() == 'PERSONAL') {
                            return "PERSONAL ";
                        } else {
                            if (sessionID && sessionID != 0) {
                                return "SESSION ";
                            } else {
                                return "MEETING";
                            }
                        }
                    }
                }));
        this.callParent(arguments);
        template.destroy();
    }
});
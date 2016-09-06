Ext.define('Personify.view.event.events.EventListItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'eventlistitem',
    requires: 'Personify.view.event.events.EventItem',

    config: {
        baseCls: 'newsFeedItem',
        pressedCls: 'p-dataview-pressed',
        scrollable: null,
        feedRecord: null,
        onItemDisclosure: true,
        itemId: 'elementNewsFeedItem',
        emptyText: 'No data',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.event.events.EventItem');
        this.setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML, {
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

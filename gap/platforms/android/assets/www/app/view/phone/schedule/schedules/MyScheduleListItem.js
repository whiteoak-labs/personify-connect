Ext.define('Personify.view.phone.schedule.schedules.MyScheduleListItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'myschedulelistitem',

    config: {
        baseCls: 'p-phone-list-event',
        itemCls: 'p-item-list-event',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        scrollable: null,
        feedRecord: null,
        onItemDisclosure: true,
        itemId: 'elementScheduleItem',
        emptyText: '<div class="phone-emptyText">Currently, there are no sessions in your schedule.<br>You may add a session by selecting a session and choosing ‘Add to My Schedule’</div>',

        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.schedule.ScheduleItem');
        this.setItemTpl(new Ext.XTemplate (
            template.element.dom.innerHTML, {
                isRegistered: function(reg){
                    if(reg){
                        return 'Registered';
                    }
                    else return '';
                }
            }));

        this.callParent(arguments);
        template.destroy();
    }
});

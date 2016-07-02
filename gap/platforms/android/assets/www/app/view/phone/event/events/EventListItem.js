Ext.define('Personify.view.phone.event.events.EventListItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'phone-eventlistitem',

    config: {
        baseCls: 'p-phone-list-event',
        itemCls: 'p-item-list-event',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        scrollable: null,
        feedRecord: null,
        onItemDisclosure: true,
        itemId: 'elementEventItem',
        emptyText: 'No data',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.event.EventItem');
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

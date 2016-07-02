Ext.define('Personify.view.event.complexevent.sessions.myschedule.FilterList', {
    extend: 'Ext.Container',
    xtype: 'filterlist',
    controller: 'Personify.controller.event.complexevent.sessions.myschedule.FilterList',
    requires: 'Personify.controller.event.complexevent.sessions.myschedule.FilterList',

    config: {
        flex:1,
        itemId: 'filterList',
        cls: 'filter-list',
        layout: 'vbox',
        items: [
            {
                flex: 1,
                itemId: 'updateList',
                xtype: 'list',
                scrollable: true,
                cls: 'update-list',
                itemCls: 'item-update-list',
                selectedCls: 'item-update-list-selected',
                itemTpl: '<div>{text}</div>'
            },
            {
                itemId: 'clearFilterByTrack',
                xtype: 'button',
                text: 'Clear filter by Track',
                cls: 'p-button-clearFilterBytrack',
                height: '35px'
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    }
});
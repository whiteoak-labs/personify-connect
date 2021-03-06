Ext.define('Personify.view.event.filter.FilterButton', {
    extend: 'Ext.Container',
    xtype: 'filterbutton',
    controller: 'Personify.controller.event.filter.FilterButton',
    requires: 'Personify.controller.event.filter.FilterButton',
    config: {
        layout: 'hbox',
        items: [
            {
                flex: 2,
                xtype: 'button',
                itemId: 'filterEvent',
                cls: 'filterEventButton',
                text: 'Filter Events',
                style: 'height: 40px; margin: 10px;'
            },
            {
                flex: 1,
                xtype: 'button',
                cls: 'clearFilter',
                pressedCls: 'red-button-pressing-background',
                itemId: 'clearFilter',
                text: 'Clear',
                docked: 'right',
                disabled: true,
                disabledCls: 'p-button-disabled'
            }
        ]
    }
});
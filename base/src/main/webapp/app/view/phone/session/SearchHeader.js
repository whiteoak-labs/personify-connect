Ext.define('Personify.view.phone.session.SearchHeader', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.session.SearchHeader',
    requires: 'Personify.controller.phone.session.SearchHeader',
    xtype: 'searchheadersessionphone',
           

    config: {
        cls: 'p-phone-sessionheader-background-toolbar',      
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'center'
        },
        items: [
            {
                docked: 'left',
                xtype: 'button',
                text: 'Search',
                itemId: 'searchSession',
                cls: 'p-phone-button-sessionheader-filter',
                pressedCls: 'p-phone-button-sessionheader-filter-press',
                style: 'margin-left: 17px'
            },
            {
                docked: 'right',
                xtype: 'button',
                text: 'Track',
                itemId: 'filterSession',
                cls: 'p-phone-button-sessionheader-filter',
                pressedCls: 'p-phone-button-sessionheader-filter-press',
                style: 'margin-right: 17px'
            }
        ]
    }
});

Ext.define('Personify.view.phone.event.EventPanel', {
    extend: 'Ext.Panel',
    xtype: 'eventPanelPhone',
    controller: 'Personify.controller.phone.event.EventPanel',
    requires: [
        'Personify.controller.phone.event.EventPanel',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.event.EventListFilter',
        'Personify.view.phone.event.EventList',
        'Personify.view.phone.event.EventDetail',
        'Personify.view.phone.event.FilterTopicList',
        'Personify.view.phone.event.events.SelectEventPanel'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-background-white',
        flex:1,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Events',
                itemId: 'eventToolbar'
            },
            {
                xtype: 'eventListFilter',
                itemId: 'eventListFilter'
            },
            {
                flex: 1,
                xtype: 'phone-selecteventpanel',
                itemId: 'selectEventPanel',
                style: 'margin-bottom: 51px'
            },
            {
                layout: 'vbox',
                itemId: 'locationListPanel',
                cls: 'p-phone-filter-list',
                modal: true,
                centered: true,
                hideOnMaskTap: true,
                hidden: true,
                items: [
                    {
                        flex: 1,
                        itemCls: 'item-update-list',
                        xtype: 'dataview',
                        scrollable: true,
                        itemId: 'locationList',
                        selectedCls: 'item-update-list-focus',
                        itemTpl: '<div>{description} ({count})</div>'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-clearfilterevent',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId: 'clearLocationButton',
                        text: 'Clear',
                        docked: 'bottom'
                    }
                ]
            },
            {
                xtype: 'filtertopiclistphone',
                itemId: 'filterTopicList',
                modal: true,
                centered: true,
                hidden: true,
                hideOnMaskTap: true
            }
        ]
    }//end config
});
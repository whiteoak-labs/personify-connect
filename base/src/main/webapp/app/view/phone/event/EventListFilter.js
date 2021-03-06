Ext.define('Personify.view.phone.event.EventListFilter', {
    extend: 'Ext.Panel',
    xtype: 'eventListFilter',
    controller: 'Personify.controller.phone.event.EventListFilter',
    requires: 'Personify.controller.phone.event.EventListFilter',
    config: {
        layout: 'vbox',
        items: [
            {
                itemId: 'searchField',
                cls: 'p-phone-search-field',
                xtype: 'searchfieldwithsearchkeyboard',
                docked: 'top'
            },
            {
                cls: 'p-phone-search-view',
                itemId: 'searchView'
            },
            {
                layout: 'hbox',
                itemId: 'filterButtonPanel',
                cls: 'p-phone-event-list-filter-panel',
                items: [
                    {
                        html: 'Filter by',
                        cls: 'p-phone-event-list-filter-left',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-event-filter',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId:'locationFilterButton',
                        text: 'Location',
                        flex: 1,
                        style: 'margin-right: 2px; margin-left: 3px;'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-event-filter',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId:'topicFilterButton',
                        text: 'Topic',
                        flex: 1,
                        style: 'margin-right: 2px; margin-left:2px'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-event-filter',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId:'myEventButton',
                        text: 'My Events',
                        flex: 1,
                        style: 'margin-right: 10px; margin-left:2px'
                    }
                ]
            }
        ]
    }//end config
});

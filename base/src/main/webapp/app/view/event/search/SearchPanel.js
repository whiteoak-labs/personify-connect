Ext.define('Personify.view.event.search.SearchPanel', {
    extend: 'Ext.Container',
    xtype: 'searchEventPanel',
    controller: 'Personify.controller.event.search.SearchPanel',
    requires: [
        'Personify.controller.event.search.SearchPanel',
        'Personify.view.SearchFieldWithSearchKeyBoard'
    ],
    config: {
        layout: 'hbox',
        items: [
            {
                flex: 1,
                itemId: 'searchField',
                cls: 'p-search-field',
                xtype: 'searchfieldwithsearchkeyboard'
            },
            {
                xtype: 'button',
                itemId: 'searchEventButton',
                cls: 'p-button-search-event',
                hidden: true
            }
        ]
    }
});
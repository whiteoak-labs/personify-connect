Ext.define('Personify.view.phone.exhibitor.AllExhibitorPanelPhone', {
    extend: 'Ext.Panel',
    xtype: 'allExhibitorPanelPhone',
    controller: 'Personify.controller.phone.exhibitor.AllExhibitorPanelPhone',

    requires: [
        'Personify.controller.phone.exhibitor.AllExhibitorPanelPhone',
        'Personify.view.phone.exhibitor.ListExhibitorPhone',
        'Personify.view.SearchFieldWithSearchKeyBoard'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'allExhibitorTitleBar'
            },
            {
                xtype: 'searchfieldwithsearchkeyboard',
                cls: 'p-phone-search-field',
                itemId: 'searchFieldAllExhibitorPanelPhone',
                placeHolder: 'Search Exhibitors'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                height: '46px',
                style: 'border-top: 1px solid #b7b7b7;',
                items: [
                    {
                        html: 'Filter by',
                        cls: 'p-text-filter-exhibitor-phone',
                        right: 140
                    },
                    {
                        xtype: 'button',
                        html: 'My Exhibitors',
                        cls: 'btnOpenExhibitorsList',
                        width: '120px',
                        itemId: 'btnOpenMyExhibitorsList',
                        right: 0
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'listExhibitorPhone',
                itemId: 'allExhibitorListPhone'
            }
        ]
    },

    updateRecord: function(record) {
        if(record && record != null) {
            this.getController().setRecord(record);
        }
    }
});
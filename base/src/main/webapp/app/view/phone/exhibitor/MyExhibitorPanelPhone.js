Ext.define('Personify.view.phone.exhibitor.MyExhibitorPanelPhone', {
    extend: 'Ext.Panel',
    xtype: 'myExhibitorPanelPhone',
    controller: 'Personify.controller.phone.exhibitor.MyExhibitorPanelPhone',

    requires: [
        'Personify.controller.phone.exhibitor.MyExhibitorPanelPhone',
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
                itemId: 'myExhibitorTitleBar'
            },
            {
                xtype: 'searchfieldwithsearchkeyboard',
                cls: 'p-phone-search-field',
                itemId: 'searchFieldMyExhibitorListPhone',
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
                        html: 'All Exhibitors',
                        cls: 'btnOpenExhibitorsList',
                        width: '120px',
                        itemId: 'btnOpenAllExhibitorsList',
                        right: 0
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'listExhibitorPhone',
                itemId: 'myExhibitorListPhone'
            }
        ]
    },

    updateRecord: function(record) {
        if(record && record != null) {
            this.getController().setRecord(record);
        }
    },
    loadMyExhibitors: function(searchTerm,resetIndex) {
           this.getController().loadMyExhibitors(searchTerm,resetIndex);
    },
    clearLocalStore: function() {
           this.getController().clearLocalStore();
    }
});
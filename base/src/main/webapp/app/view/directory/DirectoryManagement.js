Ext.define('Personify.view.directory.DirectoryManagement', {
    extend: 'Ext.Panel',
    xtype: 'directoryManagement',
    controller: 'Personify.controller.tablet.directory.DirectoryManagement',

    requires: [
        'Personify.controller.tablet.directory.DirectoryManagement',
        'Personify.view.tablet.common.Paging',
        'Personify.view.event.search.SearchPanel'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                itemId: 'searchDirectoryPanel',
                xtype: 'searchEventPanel'
            },
            {
                layout: 'fit',
                flex: 1,
                scrollable: null,
                items: [
                    {
                        xtype: 'directorylist',
                        itemId: 'directorylist',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
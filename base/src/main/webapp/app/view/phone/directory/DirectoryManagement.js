Ext.define('Personify.view.phone.directory.DirectoryManagement', {
    extend: 'Ext.Panel',
    xtype: 'pdirectorymanagement',
    controller: 'Personify.controller.phone.directory.directorylist.DirectoryManagement',
    
    requires: [
        'Personify.controller.phone.directory.directorylist.DirectoryManagement',
        'Personify.view.phone.directory.DirectoryList',
        'Personify.view.phone.common.Paging'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-directorymanagement',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'directoryToolbar',
                docked: 'top',
                title: 'Directory'
            },
            {
                itemId: 'directorySearchField',
                cls: 'p-phone-search-field',
                xtype: 'searchfieldwithsearchkeyboard',
                docked: 'top',
                placeHolder: 'Search Directories'
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'fit',
                scrollable: null,
                items: [
                    {
                        xtype: 'directorylistphone',
                        itemId: 'directorylist',
                        flex: 1
                    }
                ]
            }
        ]
    }
})
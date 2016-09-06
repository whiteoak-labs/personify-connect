Ext.define('Personify.view.help.ImportantContacts', {
    extend: 'Ext.Panel',
    xtype: 'importantcontactspanel',
    
    requires: [
        'Personify.view.directory.directorylist.DirectoryList'
    ],
    config: {
        items: [
            {
                html: 'Important Contacts <hr class="helpHR"/>',
                docked: 'top',
                cls: 'aboutAPAHeaders'
            },
            {
                flex: 1,
                xtype: 'directorylist',
                pressedCls : "",
                selectedCls: "",
                itemId: 'importantContactList',
                scrollable: null,
                cls: 'panel-left'
            }
        ]
    }
    
});
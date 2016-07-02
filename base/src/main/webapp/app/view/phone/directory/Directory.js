Ext.define('Personify.view.phone.directory.Directory', {
    extend: 'Ext.Panel',
    xtype: 'directoryphone',
    controller: 'Personify.controller.phone.directory.Directory',
    
    requires: [
        'Personify.controller.phone.directory.Directory',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.profile.ContactInfo',
        'Personify.view.phone.directory.DirectoryManagement',
        'Personify.view.phone.directory.ContactInfoManagement'
    ],
    config: {
        cls: 'p-phone-directorypanel',
        layout: 'fit',
        items: [
            {
                itemId:'directoryNavigationView',
                xtype:'navigationview',
                navigationBar: false,
                flex:1,
                items: [
                    {
                        itemId:'directoryManagementPanel',
                        xtype:'pdirectorymanagement'
                    }
                ]
            }
        ]
    },
    
    initialize: function() {
        this.callParent(arguments);
        this.setActiveItem(0);
    }
});

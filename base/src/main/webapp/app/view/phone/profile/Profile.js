Ext.define('Personify.view.phone.profile.Profile', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.profile.Profile',

    requires: [
        'Personify.controller.phone.profile.Profile',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.directory.contactinfo.ContactInfo',
        'Personify.view.phone.profile.ProfileManagement'
    ],

    config: {
        cls: 'p-phone-directorypanel',
        layout: 'fit',
        items: [
            {
                itemId:'profileNavigationView',
                xtype:'navigationview',
                navigationBar: false,
                flex:1,
                items: [
                    {
                        itemId:'profileManagementPanel',
                        xtype:'profilemanagement'
                    }
                ]
            }
        ]
    }
});

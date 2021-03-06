Ext.define('Personify.view.phone.store.Store', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.phone.store.Store',
    requires: ['Personify.controller.phone.store.Store', 'Personify.view.phone.store.StoreManagement'],

    config: {
        layout: 'vbox',
        items: [
            {
                itemId: 'storeNavigationView',
                xtype: 'navigationview',
                navigationBar: false,
                flex: 1,
                items: [
                    {
                        itemId: 'storeManagementPanel',
                        xtype: 'storemanagementphone'
                    }
                ]
            }
        ]
    }
});

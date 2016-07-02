Ext.define('Personify.view.phone.relationship.RelationshipManagement', {
    extend: 'Ext.Panel',
    xtype: 'relationshipmanagementphone',
    controller: 'Personify.controller.phone.relationship.RelationshipManagement',
    
    requires: [
        'Personify.controller.phone.relationship.RelationshipManagement',
        'Personify.view.phone.relationship.RelationshipList',
        'Personify.view.phone.common.Paging'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-directorymanagement',
        items: [
            {
                xtype : 'ptoolbar',
                itemId: 'relationshipToolbar',
                docked: 'top',
                title: 'Relationship'
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'fit',
                scrollable: null,
                items: [
                    {
                        xtype: 'relationshiplistphone',
                        itemId: 'relationshipList',
                        flex: 1
                    }
                ]
            }
        ]
    }
})
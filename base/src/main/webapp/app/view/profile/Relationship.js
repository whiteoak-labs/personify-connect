Ext.define('Personify.view.profile.Relationship', {
    xtype: 'relationship',
    extend: 'Ext.Container',
    controller: 'Personify.controller.profile.Relationship',
    
    requires: [
        'Personify.controller.profile.Relationship',
        'Personify.view.profile.relationships.RelationshipTemplate'
    ],
    
    
    config: {
        layout: 'vbox',
        flex: 1,
        width: '100%',
        items: [
            {
                xtype: 'label',
                cls:'profile-list-header sub-profile-list-title',
                html: 'Relationships'
            },
            {
                flex: 1,
                layout: 'fit',
                scrollable: null,
                items: [
                    {
                        itemCls: 'p-relationshipitems',
                        cls: 'p-relationshipcontainer',
                        itemId: 'relationshipList', 
                        emptyText: 'No data',
                        deferEmptyText: false,
                        xtype: 'dataview',
                        pressedCls: '',
                        selectedCls: '',
                        disableSelection: true,                        
                        scrollable: true,
                        store : null,
                        itemTpl: null,
                        flex: 1
                    }
                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.profile.relationships.RelationshipTemplate');
        this.down("#relationshipList").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});

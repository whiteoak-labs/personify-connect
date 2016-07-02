Ext.define('Personify.view.profile.relationships.RelationshipTemplate', {
    extend: 'Ext.Panel',
    xtype: 'relationshiptemplate',
    
    config: {
        layout: 'vbox',
        items: [
            {
                html: 'Name: {name}',
                style: 'margin-bottom: 10px;'
            },
            {
                width: '100%',
                html: '{relationshipCode} / {relationshipType}'
            }
        ]
    }
});

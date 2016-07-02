Ext.define('Personify.view.phone.relationship.RelationshipTemplate', {
    extend: 'Ext.Panel',
    xtype: 'relationshiptemplatephone',
    
    config: {
        layout: 'vbox',
        items: [
            {
                html: 'Name: {name}',
                cls: 'p-phone-directory-list-summary-text'   
            },
            {
                html: '{relationshipCode} / {relationshipType}'
            }
        ]
    }
});

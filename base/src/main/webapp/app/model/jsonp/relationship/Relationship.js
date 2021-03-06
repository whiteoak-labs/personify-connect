Ext.define('Personify.model.jsonp.relationship.Relationship', {
    extend: 'Personify.model.base.relationship.Relationship',
    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId'},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId'},
            {name: 'name', type: 'string', mapping: 'Name'},
            {name: 'relationshipType', type: 'string', mapping: 'RelationshipType'},
            {name: 'relationshipCode', type: 'string', mapping: 'RelationshipCode'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.Reference' ,
                associationKey: 'Relationships',
                name: 'Relationships',
                storeName: 'ReferenceRelationships',
                reader: {
                    type:'json',
                    rootProperty: 'Relationships'
                }
            }
        ]
    }
});

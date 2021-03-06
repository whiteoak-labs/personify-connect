Ext.define('Personify.model.jsonp.relationship.RelationshipManagement', {
    extend: 'Personify.model.base.relationship.RelationshipManagement',
    requires: ['Personify.model.jsonp.relationship.Relationship'],
    
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id'},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            
            {name: 'pageSize', type: 'string', mapping: 'PageSize'},
            {name: 'totalResults', type: 'string', mapping: 'TotalResults'},
            {name: 'startIndex', type: 'string', mapping: 'StartIndex'}
            
        ],
        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.relationship.Relationship',
                associationKey: 'Relationships',
                name: 'Relationships',
                storeName: 'RelationshipStore',
                reader: {
                    type: 'json',
                    rootProperty: 'Relationships'
                }
            }
        ]
    }
});
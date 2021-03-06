Ext.define('Personify.model.base.relationship.Relationship', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'relationshipType', type: 'string'},
            {name: 'relationshipCode', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});

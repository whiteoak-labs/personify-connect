Ext.define('Personify.model.base.user.Address', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.User',
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'interNalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'streetAddress', type: 'string'},
            {name: 'address2', type: 'boolean'},
            {name: 'address3', type: 'string'},
            {name: 'address4', type: 'string'},
            {name: 'locality', type: 'string'},
            {name: 'region', type: 'string'},
            {name: 'postalCode', type: 'boolean'},
            {name: 'country', type: 'string'},
            {name: 'formatted', type: 'string'},
            {name: 'canEdit', type: 'boolean'},
            {name: 'primary', type: 'string'},
            {name: 'markForDelete', type: 'string'},
            {name: 'address', type: 'string'},
            {name: 'addresses', type: 'string'}
        ]
    }
});
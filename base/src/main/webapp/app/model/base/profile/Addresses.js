Ext.define('Personify.model.base.profile.Addresses', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'addressesId', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'streetAddress', type: 'string'},
            {name: 'address2', type: 'string'},
            {name: 'address3', type: 'string'},
            {name: 'address4', type: 'string'},
            {name: 'locality', type: 'string'},
            {name: 'region', type: 'string'},
            {name: 'postalCode', type: 'string'},
            {name: 'country', type: 'string'},
            {name: 'formatted', type: 'string'},
            {name: 'canEdit', type: 'boolean'},
            {name: 'primary', type: 'boolean'},
            {name: 'markForDelete', type: 'boolean'},
            {name: 'address', type: 'string'},
            {name: 'profileAddress', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
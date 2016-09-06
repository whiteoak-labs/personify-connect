Ext.define('Personify.model.base.profile.Entry', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'credentials', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'entryId', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'encrMasterCustomerId', type: 'string'},
            {name: 'encrSubCustomerId', type: 'string'},
            {name: 'displayName', type: 'string'},
            {name: 'organizationId', type: 'string'},
            {name: 'organizationUnitId', type: 'string'},
            {name: 'preferredCurrency', type: 'string'},
            {name: 'jobTitle', type: 'string'},
            {name: 'ccType', type: 'string'},
            {name: 'ccNumber', type: 'string'},
            {name: 'modOper', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'includeInDirectory', type: 'boolean'},
            {name: 'includeInMobileDirectory', type: 'boolean'},
            {name: 'userKey', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.base.profile.PhoneNumbers', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'phoneNumbersId', type: 'string'},
            {name: 'value', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'primary', type: 'boolean'},
            {name: 'markForDelete', type: 'boolean'},
            {name: 'country', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.jsonp.profile.PhoneNumbers', {
    extend: 'Personify.model.base.profile.PhoneNumbers',
    requires: 'Personify.model.jsonp.Reference',

    config: {
        fields: [
            {name: 'recordId', type: 'int', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'phoneNumbersId', type: 'string', mapping: 'Id', allowNull: false},
            {name: 'value', type: 'string', mapping: 'Value', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'primary', type: 'boolean', mapping: 'Primary', allowNull: false},
            {name: 'markForDelete', type: 'boolean', mapping: 'MarkForDelete'},
            {name: 'country', type: 'string', mapping: 'Country', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false}
        ],

        belongsTo: 'Personify.model.jsonp.profile.Entry',

        associations: [
            {
                type: 'hasOne',
                model: 'Personify.model.jsonp.Reference',
                associationKey: 'PhoneNumbers',
                name: 'PhoneNumbers',
                storeName: 'ReferencePhoneNumbers',
                reader: {
                    type: 'json',
                    rootProperty: 'PhoneNumbers'
                }
            }
        ]
    }
});
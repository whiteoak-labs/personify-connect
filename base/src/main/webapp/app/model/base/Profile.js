Ext.define('Personify.model.base.Profile', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'addressTypeList', type: 'string'},
            {name: 'communicationLocationList', type: 'string'},
            { name: 'defaultCountry', type: 'string', defaultValue: 'USA' },
            { name: 'defaultCountryForPhone', type: 'string', defaultValue: 'USA' },
            {name: 'emailLocationList', type: 'string'},
            {name: 'urlLocationList', type: 'string'},
            {name: 'namePrefixList', type: 'string'},
            {name: 'nameSuffixList', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'details'}
        ]
    }
});
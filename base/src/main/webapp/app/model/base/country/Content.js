Ext.define('Personify.model.base.country.Content', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.country.Entry',
        fields: [
            {name: 'countryCode', type: 'string'},
            {name: 'countryDescription', type: 'string'},
            {name: 'phoneCountryCode', type: 'string'}
        ]
    }
});
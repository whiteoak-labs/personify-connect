Ext.define('Personify.model.base.country.Author', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.country.Entry',
        fields: [
            {name: 'name', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.jsonp.country.Deferred', {
    extend: 'Personify.model.base.country.Deferred',
    config: {
        belongsTo: 'Personify.model.jsonp.Country',
        fields: [
            {name: 'uri', type: 'string', allowNull: false}
        ]
    }
});
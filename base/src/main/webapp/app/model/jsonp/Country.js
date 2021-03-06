Ext.define('Personify.model.jsonp.Country', {
    extend: 'Personify.model.base.Country',
    requires: [
        'Personify.model.base.notification.MetaData',
        'Personify.model.base.country.Deferred'
    ],
    config:{
        fields: [
            {name: 'title', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'updated', type: 'string'},
            {name: 'link', type: 'string'},
            
            {name: 'countryCode', type: 'string', mapping: 'CountryCode', allowNull: false},
            {name: 'countryDescription', type: 'string', mapping: 'CountryDescription', allowNull: false},
            {name: 'phoneCountryCode', type: 'string', mapping: 'PhoneCountryCode', allowNull: false}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata',
                storeName: 'MetaDataCountry',
                reader: {
                    type:'json',
                    rootProperty: '__metadata'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.country.Deferred',
                autoLoad: true,
                associationKey: 'State',
                name: 'State',
                storeName: 'DeferredCountry',
                reader: {
                    type:'json',
                    rootProperty: 'State',
                    record: '__deferred'
                }
            }
        ]
    }
});

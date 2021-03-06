Ext.define('Personify.model.base.Country', {
    extend: 'Personify.base.Model',
    config:{
        fields: [
            {name: 'title', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'updated', type: 'string'},
            {name: 'link', type: 'string'},
            
            {name: 'countryCode', type: 'string'},
            {name: 'countryDescription', type: 'string'},
            {name: 'phoneCountryCode', type: 'string'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata'
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.base.country.Deferred' ,
                autoLoad: true,
                associationKey: 'state',
                name: 'state'
            }
        ]
    }
});

Ext.define('Personify.model.jsonp.State', {
    extend: 'Personify.base.Model',
    config:{
        fields: [
            {name: 'countryCodeString', type: 'string', mapping: 'CountryCodeString'},
            {name: 'stateCode', type: 'string', mapping: 'StateCode'},
            {name: 'activeFlag', type: 'boolean', mapping: 'ActiveFlag'},
            {name: 'stateDescription', type: 'string', mapping: 'StateDescription'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata'
            }
        ]
    }
});

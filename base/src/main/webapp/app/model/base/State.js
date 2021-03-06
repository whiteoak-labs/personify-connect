Ext.define('Personify.model.base.State', {
    extend: 'Personify.base.Model',
    config:{
        fields: [
            {name: 'countryCodeString', type: 'string'},
            {name: 'stateCode', type: 'string'},
            {name: 'activeFlag', type: 'boolean'},
           {name: 'stateDescription', type: 'string'}
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

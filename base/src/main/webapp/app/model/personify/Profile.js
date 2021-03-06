Ext.define('Personify.model.personify.Profile', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'goOnlineProfileUrl', type: 'string'},
            {name: 'forgotPasswordUrl', type: 'string'},
            {name: 'countryListVersion', type: 'int'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Personify',
               autoLoad: true,
               associationKey: 'profile',
               name: 'Profile'
           }
       ]
    }
});

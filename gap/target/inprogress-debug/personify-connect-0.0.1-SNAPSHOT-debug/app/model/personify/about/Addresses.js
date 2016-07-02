Ext.define('Personify.model.personify.about.Addresses', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {name: 'streetAddress', type: 'string'},
             {name: 'locality', type: 'string'},
             {name: 'postalCode', type: 'string'},
             {name: 'country', type: 'string'},
             {name: 'formatted', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.About',
               autoLoad: true,
               associationKey: 'addresses',
               name: 'Addresses'
           }
        ]
    }
});

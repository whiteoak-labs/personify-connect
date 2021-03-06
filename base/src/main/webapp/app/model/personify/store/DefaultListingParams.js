Ext.define('Personify.model.personify.store.DefaultListingParams', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {name: 'orgId', type: 'string'},
             {name: 'orgUnitId', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Store',
               autoLoad: true,
               associationKey: 'defaultListingParams',
               name: 'DefaultListingParams'
           }
        ]
    }
});

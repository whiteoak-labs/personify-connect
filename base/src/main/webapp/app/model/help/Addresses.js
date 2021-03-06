Ext.define('Personify.model.help.Addresses', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {name: 'address', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.help.Personify',
               autoLoad: true,
               associationKey: 'addresses',
               name: 'Addresses'
           }
        ]
    }
});

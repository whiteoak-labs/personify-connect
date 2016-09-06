Ext.define('Personify.model.help.Personify', {
    extend: 'Personify.base.Model',
    requires: [
         'Personify.model.help.Numbers',
         'Personify.model.help.Addresses',
         'Personify.model.help.Contacts'
    ],
    
    config: {
        fields: [
             {name: 'title', type: 'string'},
             {name: 'description', type: 'string'}
        ],
        associations: [
           { 
               type: 'hasMany', 
               model: 'Personify.model.help.Numbers',
               autoLoad: true,
               associationKey: 'numbers',
               name: 'numbers'
           },
           { 
               type: 'hasMany', 
               model: 'Personify.model.help.Addresses' ,
               autoLoad: true,
               associationKey: 'addresses',
               name: 'addresses'
           },
           { 
               type: 'hasMany', 
               model: 'Personify.model.help.Contacts',
               autoLoad: true,
               associationKey: 'contacts',
               name: 'contacts'
           }
       ]
    }
});

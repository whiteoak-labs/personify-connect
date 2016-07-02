Ext.define('Personify.model.help.Contacts', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {name: 'firstname', type: 'string'},
             {name: 'lastname', type: 'string'},
             {name: 'employerName', type: 'string'},
             {name: 'address', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.help.Personify',
               autoLoad: true,
               associationKey: 'contacts',
               name: 'Contacts'
           }
        ]
    }
});
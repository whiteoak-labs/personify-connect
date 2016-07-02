Ext.define('Personify.model.personify.about.Contacts', {
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
               model: 'Personify.model.personify.About',
               autoLoad: true,
               associationKey: 'contacts',
               name: 'Contacts'
           }
        ]
    }
});
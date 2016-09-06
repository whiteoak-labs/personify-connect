Ext.define('Personify.model.personify.about.Website', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'value', type: 'string'},
            {name: 'type', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.About',
               autoLoad: true,
               associationKey: 'website',
               name: 'Website'
           }
        ]
    }
});


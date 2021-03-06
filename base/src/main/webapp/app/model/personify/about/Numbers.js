Ext.define('Personify.model.personify.about.Numbers', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'type', type: 'string'},
            {name: 'value', type: 'string'}
        ],
        associations: [
           { 
               type: 'belongsTo', 
               model: 'Personify.model.personify.About',
               autoLoad: true,
               associationKey: 'numbers',
               name: 'Numbers'
           }
        ]
    }
});

Ext.define('Personify.model.help.Numbers', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'type', type: 'string'},
            {name: 'number', type: 'string'}
        ],
        associations: [
           { 
               type: 'belongsTo', 
               model: 'Personify.model.help.Personify',
               autoLoad: true,
               associationKey: 'numbers',
               name: 'Numbers'
           }
        ]
    }
});

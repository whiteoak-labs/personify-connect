Ext.define('Personify.model.personify.directory.NameAndRelatedView', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'name', type: 'string'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Directory',
               autoLoad: true,
               associationKey: 'nameandrelatedview',
               name: 'NameAndRelatedView'
           }
        ]
    }
});

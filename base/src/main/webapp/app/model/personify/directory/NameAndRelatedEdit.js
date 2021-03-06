Ext.define('Personify.model.personify.directory.NameAndRelatedEdit', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'fieldName', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'requestName', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'required', type: 'boolean'},
            {name: 'enabled', type: 'boolean'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Directory',
               autoLoad: true,
               associationKey: 'nameandrelatededit',
               name: 'NameAndRelatedEdit'
           }
        ]
    }
});

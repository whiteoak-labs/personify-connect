Ext.define('Personify.model.personify.news.Feeds', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'title', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'private', type: 'boolean'},
            {name: 'visible', type: 'boolean'}
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.News',
               autoLoad: true,
               associationKey: 'feeds',
               name: 'Feeds'
           }
        ]
    }
});

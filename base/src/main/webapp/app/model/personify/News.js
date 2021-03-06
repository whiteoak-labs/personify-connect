Ext.define('Personify.model.personify.News', {
    extend: 'Personify.base.Model',
    requires: 'Personify.model.personify.news.Feeds',
    
    config: {
        fields: [
            { name: 'twitterHashtag', type: 'string' },
            { name: 'refreshInterval', type: 'int'}
        ],
        associations: [
           {
               type: 'hasMany', 
               model: 'Personify.model.personify.news.Feeds',
               autoLoad: true,
               associationKey: 'feeds',
               name: 'Feeds'
           },
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Personify',
               autoLoad: true,
               associationKey: 'news',
               name: 'News'
           }
       ]
    }
});

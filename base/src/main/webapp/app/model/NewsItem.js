Ext.define('Personify.model.NewsItem', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
             {
                 name: 'title',
                 type: 'string',
                 defaultValue: ''
             },
             {
                 name: 'description',
                 type: 'string',
                 defaultValue: ''
             },
             {
                 name: 'shortDescription',
                 type: 'string',
                 defaultValue: ''
             },
             {
                 name: 'link',
                 type: 'string',
                 defaultValue: ''
             },
             {
                 name: 'author',
                 type: 'string',
                 defaultValue: 'unknown'
             },
             {
                 name: 'date',
                 type: 'string',
                 defaultValue: ''
             }
        ]
    }
});

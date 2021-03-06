Ext.define('Personify.model.news.YahooRssItem', {
    extend: 'Personify.model.NewsItem',

    config: {
        fields: [
             {
                 name: 'author',
                 type: 'string',
                 mapping: 'creator',
                 defaultValue: ''
             },
             {
                 name: 'date',
                 type: 'date',
                 mapping: 'pubDate'
             }
        ]
    }
});

Ext.define('Personify.store.NewsFeed', {
    extend: 'Personify.base.Store',
    
    requires: [
        'Personify.model.NewsItem',
        'Ext.data.proxy.JsonP'
    ],
    
    config: {
        model: 'Personify.model.NewsItem',
        feedUrl: null,
        
        proxy: {
            type: 'jsonp',
            url: 'http://query.yahooapis.com/v1/public/yql',
            
            reader: {
                type: 'json'
            }
        }
    }
});

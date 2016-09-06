Ext.define('Personify.store.news.YahooRss', {
    extend: 'Personify.store.NewsFeed',
    
    requires: [
        'Personify.model.news.YahooRssItem'
    ],
    
    config: {
        model: 'Personify.model.news.YahooRssItem',
        
        proxy: {
            reader: {
                rootProperty: 'query.results.item'
            }
        }
    },
    
    setFeedUrl: function(feedUrl) {
        this.getProxy().setExtraParams({
            q: "select * from rss where url = '" + feedUrl + "'",
            format: 'json'
        });
    }
});

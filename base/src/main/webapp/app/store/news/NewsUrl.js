Ext.define('Personify.store.news.NewsUrl', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.news.NewsUrl'
    ],
    
    config: {
        model: 'Personify.model.news.NewsUrl',
        proxy: {
            type: 'rest',
            url: 'data/newsurl.json',
            reader: {
                type: 'json'
            }
        }
    }
});

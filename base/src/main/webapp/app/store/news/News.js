Ext.define('Personify.store.news.News', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.news.News'
    ],

    config: {
        model: 'Personify.model.news.News'
    }
});

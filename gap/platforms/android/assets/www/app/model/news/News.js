Ext.define('Personify.model.news.News', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'news', defaultValue: []},
            {name: 'expanded', type: 'boolean', defaultValue: false},
            {name: 'itemIndex', type: 'int', defaultValue: 0}
        ]
    }
});

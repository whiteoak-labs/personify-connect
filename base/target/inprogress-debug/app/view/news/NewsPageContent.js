Ext.define('Personify.view.news.NewsPageContent', {
    extend: 'Ext.dataview.DataView',
    xtype: 'newspagecontent',
    config: {
        baseCls: 'news-page',
        emptyText: 'No data',
        scrollable: null,
        itemTpl: new Ext.XTemplate(
            '<div class="news-page-author-date">',
                '<div class="news-page-author">{author}</div>',
                '<div class="news-page-date">{[Personify.utils.ItemUtil.formatJSONFullDate(values.date)]}</div>',
            '</div>',
            '<div class="news-page-description">{description}</div>'
        )
    }
});
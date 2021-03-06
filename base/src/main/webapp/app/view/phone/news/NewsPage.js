Ext.define('Personify.view.phone.news.NewsPage', {
    extend: 'Ext.dataview.DataView',
    xtype: 'newsPagePhone',
    config: {
        baseCls: 'newsPagePhone',
        emptyText: 'No data',
        scrollable: false,
        itemTpl: new Ext.XTemplate(
                '<div><a class="title-news-page" href="{link}">{title}</a></div>',
                '<div class="description-news-page">{[Personify.utils.ItemUtil.updateImageDimension(values.description)]}</div>'
        )
    }
});

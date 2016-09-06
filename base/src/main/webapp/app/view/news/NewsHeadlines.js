Ext.define('Personify.view.news.NewsHeadlines', {
    extend: 'Ext.dataview.DataView',
    xtype: 'newsheadlines',

    config: {
        baseCls: 'newsHeadline',
        scrollable: null,
        emptyText: 'no data',
        itemTpl: [
              '<div class="newsHeadlineTitleImage">',
                  '<div class="newsHeadlinesImage"></div>',
                  '<div class="newsHeadlinesTitle">{title}</div>',
                  '<div class="newsHeadlinesSourceDate">',
                      '<div class="newsHeadlinesSource">Source</div>',
                      '<div class="newsHeadlinesDate">{[Personify.utils.ItemUtil.formatDate(values.date)]}</div>',
                  '</div>',
              '</div>',
              '<div class="newsHeadlinesDescription">{shortDescription}</div>'
      ].join('')
    }
});

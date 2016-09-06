Ext.define('Personify.view.news.NewsList', {
    extend: 'Ext.dataview.List',
    xtype: 'newslist',

    config: {
        baseCls: 'selectedFieldButtonNews',
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<tpl if="expanded">',
                '<div class="p-filter-button-new-enabled newsButton">{name}',
            '</div>',
            '<tpl for="news">',
                '<div class="newsFeedItem-item newsItemIndex-{#} {[xindex == parent.itemIndex ? "p-newFeedItem-selected": ""]}">',
                    '<div class="newsFeedItemTitle newsItemIndex-{#}">{[Personify.utils.ItemUtil.getShortContent(values.data.title, 80)]}</div>',
                    '<div class="newsFeedItemSourceDate newsItemIndex-{#}">',
                        '<div class="newsFeedItemDate newsItemIndex-{#}">{[Personify.utils.ItemUtil.formatJSONFullDate(values.data.date)]}</div>',
                    '</div>',
                '</div>',
            '</tpl>',
            '<tpl else>',
                '<div class="p-filter-button-new newsButton">{name}',
                '</div>',
            '</tpl>'
        ),
        listeners: {
            itemtap: function(list, index, target, record, e, eOpts) {
                var isItem = false;
                var itemIndex = null;
                var isHeader = false;
                var classList = e.target.classList;
                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('newsItemIndex') >= 0) {
                        isItem = true;
                        itemIndex = classList[i].split('-')[1];
                        break;
                    } else if (classList[i].indexOf('newsButton') >= 0) {
                        isHeader = true;
                    }
                }

                if (isItem) {
                    var newsStore = list.getStore();
                    newsStore.each(function(item) {
                        if (item.get('itemIndex') != 0) {
                            item.set('itemIndex', 0);
                        }
                    });
                    record.set('itemIndex', parseInt(itemIndex));
                    this.fireEvent('newstitemtap', record.get('news')[itemIndex - 1]);
                } else if (isHeader) {
                    record.set('expanded', !record.get('expanded'));
                }
            }
        }
    }
});

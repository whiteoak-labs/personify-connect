Ext.define('Personify.view.phone.news.NewsList', {
    extend: 'Ext.dataview.List',
    xtype: 'newslistphone',

    config: {
        baseCls: 'selectedFieldButtonNews',
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<tpl if="expanded">',
                '<div class="p-filter-button-new-enabled newsButton">{name}',
                '</div>',
                '<tpl for="news">',
                    '<div class="newsitemtemplatephone-item {[xindex == parent.itemIndex ? "p-phone-common-list-selected": ""]}">',
                        '<div class="newsitemtemplatephonecontent newsItemIndex-{#}">',
                            '<div class="news-item-template-phone-title newsItemIndex-{#}">{[Personify.utils.ItemUtil.getShortContent(values.data.title, 80)]}</div>',
                            '<div class="news-item-template-phone-datetime newsItemIndex-{#}">',
                                '<div class="news-item-template-phone-date newsItemIndex-{#}">{[Personify.utils.ItemUtil.formatJSONFullDate(values.data.date)]}</div>',
                            '</div>',
                        '</div>',
                        '<div class="newsitemtemplatephonearrow"></div>',
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
                    this.fireEvent('newstitemtap', record.get('news')[itemIndex - 1], record);
                } else if (isHeader) {
                    record.set('expanded', !record.get('expanded'));
                }
            }
        }
    }
});

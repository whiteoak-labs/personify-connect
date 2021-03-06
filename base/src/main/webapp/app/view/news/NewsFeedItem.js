Ext.define('Personify.view.news.NewsFeedItem', {
    extend: 'Ext.dataview.DataView',
    xtype: 'newsfeeditem',

    config: {
        baseCls: 'newsFeedItem',
        pressedCls: 'p-newFeedItem-selected',
        selectedCls: 'p-newFeedItem-selected',
        scrollable: null,
        feedRecord: null,
        onItemDisclosure: true,
        itemId: 'elementNewsFeedItem',
        emptyText: 'No data',
        itemTpl: new Ext.XTemplate(
              '<div class="newsFeedItemTitle">{[Personify.utils.ItemUtil.getShortContent(values.title, 80)]}</div>',
              '<div class="newsFeedItemSourceDate">',
                 '<div class="newsFeedItemDate">{[Personify.utils.ItemUtil.formatJSONFullDate(values.date)]}</div>',
              '</div>'
        )
    }
});

Ext.define('Personify.view.phone.news.SelectNewsFeed', {
    extend: 'Ext.dataview.DataView',
    xtype: 'selectnewsfeedphone',
    
    config: {
        scrollable: true,
        cls: 'selectnewsfeedpanelphone',
        itemTpl: new Ext.XTemplate(['<div class="p-filter-button-phone">{[Personify.utils.ItemUtil.getShortContent(values.title, 30)]}</div>'].join(''))
    },

    destroy: function() {
        var items = this.getViewItems();

        for (var i = 0; i < items.length; i++) {
            var item = Ext.get(items[i].id.trim());

            if (item.newsList) {
                item.newsList.destroy();
                item.newsList = null;
            }
        }

        return this.callParent(arguments);
    }
});

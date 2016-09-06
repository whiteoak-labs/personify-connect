Ext.define('Personify.view.news.SelectNewsFeed', {
    extend: 'Ext.dataview.DataView',
    xtype: 'selectnewsfeed',
    
    config: {
        scrollable: null,
        flex: 1,
        cls: 'selectedFieldButtonNews',
        itemTpl: ['<div class="p-filter-button-new">{title}</div>'].join('')
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

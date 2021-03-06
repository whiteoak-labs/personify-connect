Ext.define('Personify.view.phone.news.ContentPanelNews', {
    extend: 'Ext.Container',
    xtype: 'contentpanelnews',
    requires: 'Personify.view.phone.news.NewsPage',
    
    config: {
        layout: 'vbox',
        items: [
            {
                cls: 'contentPanelNews',
                selectedCls: 'contentPanelNewsItemSelected',
                pressedCls: 'contentPanelNewsItemSelected',
                itemId: 'contentPanelNews',
                xtype: 'list',
                scrollable: true,
                flex: 20,
                styleHtmlContent: true,
                itemTpl: null
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.news.NewsPage');
        this.down("#contentPanelNews").setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML));

        this.callParent(arguments);
        template.destroy();
    }
});

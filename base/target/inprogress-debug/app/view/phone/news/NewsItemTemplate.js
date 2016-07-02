Ext.define('Personify.view.phone.news.NewsItemTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'newsitemtemplate',
    
    config: {
        baseCls: 'newsitemtemplatephone',
        pressedCls: 'p-phone-common-list-selected',
        selectedCls: 'p-phone-common-list-selected',
        scrollable: null,
        flex: 1,
        feedRecord: null,
        onItemDisclosure: true,
        itemTpl: new Ext.XTemplate(
            '<div class="newsitemtemplatephonecontent">',
                '<div class="news-item-template-phone-title">{[Personify.utils.ItemUtil.getShortContent(values.title, 40)]}</div>',
                '<div class="news-item-template-phone-datetime">',
                    '<div class="news-item-template-phone-month"></div>',
                    '<div class="news-item-template-phone-date">{[Personify.utils.ItemUtil.formatJSONFullDate(values.date)]}</div>',
                '</div>',
            '</div>',
            '<div class="newsitemtemplatephonearrow"></div>'
        )
    }
});

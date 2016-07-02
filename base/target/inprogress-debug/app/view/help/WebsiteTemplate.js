Ext.define('Personify.view.help.WebsiteTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'websiteitemtemplate',
    
    config: {
        baseCls: 'websiteitemtemplatehelp',
        itemTpl: [
             '<div class="websiteitemhelptype">{type}</div>',
             '<div class="websiteitemhelpvalue">{value}</div>'
        ]
    }
});

Ext.define('Personify.view.help.AddressItemTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'addressitemtemplate',
    
    config: {
        baseCls: 'addressitemtemplatehelp',
        itemTpl: [
             '<div class="addressitemhelp">{address}</div>'
        ]
    }
});

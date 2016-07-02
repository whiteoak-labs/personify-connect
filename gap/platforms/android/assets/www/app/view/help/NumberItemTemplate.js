Ext.define('Personify.view.help.NumberItemTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'numberitemtemplate',
    
    config: {
        baseCls: 'numberitemtemplate',
        itemTpl: [
              '<div class="numberitemtype">{type}</div>',
              '<div class="numberitemphone">{number}</div>'
        ]
    }
});

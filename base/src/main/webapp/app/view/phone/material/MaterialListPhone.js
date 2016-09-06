Ext.define('Personify.view.phone.material.MaterialListPhone', {
    extend: 'Ext.dataview.List',
    xtype: 'materialListPhone',
    requires: 'Personify.view.phone.material.MaterialItemPhone',

    config: {
        baseCls: 'p-phone-event-material',
        emptyText: '<div class = "p-emptyText-phone">There are no materials for this session/event</div>',
        deferEmptyText: false,
        itemTpl: null,
        scrollToTopOnRefresh:false,
        itemCls: 'p-phone-event-material-item'
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.material.MaterialItemPhone');
        this.setItemTpl(new Ext.XTemplate('<tpl if="this.isHaveURL(values.url)">'+
            template.element.dom.innerHTML +'<tpl else></tpl>',
            {
                isHaveURL: function(url){
                    if(url && (url.trim() == "" || url == null)){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        ));

        this.callParent(arguments);
        template.destroy();
    }
});
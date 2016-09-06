Ext.define('Personify.view.event.material.MaterialList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'materialList',
    requires: 'Personify.view.event.material.MaterialItem',

    config: {
        baseCls: 'materialList',
        pressedCls: 'p-button-pressing-opacity',
        scrollable: true,
        scrollToTopOnRefresh: false,
        deferEmptyText: false,
        emptyText: '<p class="p-presenter-emptyText">There are no materials for this session/event</p>',
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.event.material.MaterialItem');
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
    },

    destroy: function() {
        var items = this.getViewItems();

        for (var i = 0; i < items.length; i++) {
            var item = Ext.get(items[i].id.trim());

            if (item.eventList) {
                item.eventList.destroy();
                item.eventList = null;
            }
        }

        return this.callParent(arguments);
    }
});
Ext.define('Personify.view.profile.contactinfo.ListInfoTemplate', {
    extend: 'Ext.dataview.DataView',
    requires: 'Personify.view.profile.contactinfo.ListInfoItemTemplate',
    config: {
        baseCls: 'phonelist',
        itemCls: 'phonelistitem',
        store: null,
        scrollable: null,
        itemTpl: null
    },
    
    initialize: function() {
        var template = Ext.create('Personify.view.profile.contactinfo.ListInfoItemTemplate');
        this.setItemTpl(new Ext.XTemplate(
            template.element.dom.innerHTML,
            {
                isPrimaryString: function(primary) {
                    if(primary == true) {
                        return 'Main';
                    }
                    else return '';
                },
                isDelete: function(markForDelete) {
                    if(markForDelete == null || markForDelete == false || markForDelete ==""){
                        return true;
                    } else {
                        return false;
                    }
                },
                hasType: function(type) {
                    if(type == null || type == "") {
                        return '';
                    }
                    else return type;
                }
            }));
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
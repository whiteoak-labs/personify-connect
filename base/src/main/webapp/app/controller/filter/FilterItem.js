Ext.define('Personify.controller.filter.FilterItem',{
    extend: 'Personify.base.Controller',
    control: {
        filterTypeLabel: {
            
        },
        clearButton: {
            tap: 'onClearFilterButtonTap'
        },
        listFilterItems: {
            itemtap: 'onCheckBoxCheck'
        }
    },//control
    setStoreData: function(store){
        this.getListFilterItems().setStore(store);
    },
    
    setLabel: function (label){
        this.getFilterTypeLabel().setHtml(label);
    },
    
    onCheckBoxCheck: function(bookmarkView, index, item, record, event){
        var me = this;
        if(event.target.localName == "span") {
            var subcodeList = record.SubcodeListEvent;
            var label = event.target.parentNode;
            var code = label.htmlFor;
            var parentClass = label.parentNode.className;
            if(parentClass == "p-div-SubcodeList"){
                subcodeList.each(function(subRecord){
                    if(subRecord.get('code') == code){
                        if(subRecord.get('checked') == 'checked'){
                            subRecord.set('checked', '');
                        }else{
                            subRecord.set('checked', 'checked');
                            record.set('checked', 'checked');
                        }
                    }
                });
            }else {
                if(record.get('checked') == 'checked'){
                    record.set('checked', '');
                    if(subcodeList){
                        subcodeList.each(function(subRecord){
                            subRecord.set('checked', '');
                        });
                    }
                }else {
                    record.set('checked', 'checked');
                }
            }
        }
        me.getListFilterItems().refresh();
    },
    
    onClearFilterButtonTap: function() {
        var listFilterItems = this.getListFilterItems();
        var store = listFilterItems.getStore();
        Personify.utils.ItemUtil.onClearFilterStore(store);
        listFilterItems.refresh();
    }
});

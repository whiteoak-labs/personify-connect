Ext.define('Personify.controller.phone.event.FilterTopicList',{
    extend: 'Personify.base.Controller',
    control: {
        clearButton: {
            tap: 'onClearFilterButtonTap'
        },
        listFilterItems: {
            itemtap: 'onCheckBoxCheck'
        },
        submitFilter: {
            tap: 'onSubmitFilterTap'
        }
    },//control
    setStoreData: function(store){
        this.getListFilterItems().setStore(store);
    },
    
    onCheckBoxCheck: function(bookmarkView, index, item, record, event){
        var me = this;

        if (event.target.localName == "span") {
            var subcodeList = record.SubcodeListEvent;
            var label = event.target.parentNode;
            var code = label.htmlFor;
            var parentClass = label.parentNode.className;

            if (parentClass == "p-filterlist-phone-checkbox-item-child") {
                subcodeList.each(function(subRecord) {
                    if (subRecord.get('code') == code) {
                        if (subRecord.get('checked') == 'checked') {
                            subRecord.set('checked', '');
                        } else {
                            subRecord.set('checked', 'checked');
                            record.set('checked', 'checked');
                        }
                    }
                });
            } else {
                if (record.get('checked') == 'checked') {
                    if (subcodeList) {
                        subcodeList.each(function(subRecord) {
                            subRecord.set('checked', '');
                        });
                    }
                    record.set('checked', '');
                } else {
                    record.set('checked', 'checked');
                }
            }
        }
    },
    
    onClearFilterButtonTap: function() {
        this.getView().hide();
        var store =  this.getListFilterItems().getStore();
        Personify.utils.ItemUtil.onClearFilterStore(store);
        this.getView().fireEvent('onsubmitfilter', store);
        this.getListFilterItems().refresh();
    },
    
    onSubmitFilterTap: function(){
        this.getView().hide();
        var store =  this.getListFilterItems().getStore();
        this.getView().fireEvent('onsubmitfilter', store);
    }
});

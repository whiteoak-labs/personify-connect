Ext.define('Personify.controller.filter.FilterItemRadio',{
    extend: 'Personify.base.Controller',
    control: {
        filterTypeLabel: {
            
        },
        clearButton: {
            tap: 'onEventFormatClearButton'
        },
        listFilterItems: {
            
        }
    },//control
    setStoreData: function(store){
        this.getListFilterItems().setStore(store);
    },
    
    setLabel: function (label){
        this.getFilterTypeLabel().setHtml(label);
    },
    
    onEventFormatClearButton: function() {
        var listFilterItems = this.getListFilterItems();
        var elements =  Ext.DomQuery.select("input[type=checkbox]",listFilterItems.element.dom);
        Ext.each(elements, function(el){
            el.checked = false;
        });
        this.getView().fireEvent('clearFilter');
    },
    
    onGetCheckedValue: function(){
        var array = new Array();
        var listFilterItems = this.getListFilterItems();
        var elements =  Ext.DomQuery.select("input:checked",listFilterItems.element.dom);
        Ext.each(elements, function(el){
            var item = Ext.get(el); 
            array.push(item.dom.value);
        });
        return array;
    },
    
    setCheckedValue: function(items) {
        var listFilterItems = this.getListFilterItems();
        var filterOptionStore = listFilterItems.getStore();
        var records = [];
        
        if (filterOptionStore != null) {
            filterOptionStore.each(function(record) {
                if (Ext.Array.contains(items, record.get('code'))) {
                    record.set('checked', 'checked');
                    records.push(record);
                } else {
                    record.set('checked', '');
                    records.push(record);
                }
            });
            filterOptionStore.applyData(records);
            listFilterItems.refresh();
            
        }
    }
});

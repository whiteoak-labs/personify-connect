Ext.define('Personify.controller.store.filter.FilterPanel',{
    extend: 'Personify.base.Controller',
    control: {
        submitFilter: {
            tap: 'onSubmitFilter'
        },
        filterProduct: {
            clearFilter: 'clearFilter'
        }
    },//control
    
    config: {
        productClass: []
    },

    init: function() {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Product Filter');
        }

        this.setData();
        this.getFilterProduct().getController().setLabel('Product Category');
    },
    
    setData: function (){
        var me = this;
        var product = me.getFilterProduct();
        
        var productStore = Ext.create('Personify.store.base.FilterProductStore');
        productStore.load({
            callback: function(records, operation, success) {
                product.getController().setStoreData(productStore);
                me.getFilterProduct().getController().setCheckedValue(me.getProductClass());
            }
        });
    },
    
    onSubmitFilter: function() {
        var me = this;
        var data = me.getFilterProduct().getController().onGetCheckedValue();
        me.getView().getParent().fireEvent('submitFilter', data);
        me.getView().removeAll(true);
        me.getView().destroy();
    },
    
    clearFilter: function() {
        this.getView().getParent().fireEvent('clearFilter');
    }
});

Ext.define('Personify.controller.schedule.SelectSchedulePanel', {
    extend: 'Personify.base.Controller',
    control: {
        selectScheduleItem: true
    }, //control

    config: {
        storeAllItem: null
    },

    setStore : function(store) {
        this.setStoreAllItem(store);
        if (store.getCount() == 0)
            this.getSelectScheduleItem().setStore(store);
    },

    getStore: function() {
        return this.getStoreAllItem();
    }

});
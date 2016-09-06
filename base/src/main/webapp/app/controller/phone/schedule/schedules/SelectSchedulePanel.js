Ext.define('Personify.controller.phone.schedule.schedules.SelectSchedulePanel', {
    extend: 'Personify.base.Controller',
    control: {
        selectScheduleItem: true
    }, //control

    config: {
        storeAllItem: null
    },

    setStore : function(store) {
        this.setStoreAllItem(store);
           
         /* Commented to Resolve 'Undefined,0NaN' issue
        if (store.getCount() == 0) {
            ////this.getSelectScheduleItem().setStore(store);
        }*/
                      
    },

    getStore: function() {
        return this.getStoreAllItem();
    }
});
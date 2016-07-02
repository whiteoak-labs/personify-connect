Ext.define('Personify.controller.phone.schedule.schedules.SelectEventPanel', {
    extend: 'Personify.base.Controller',
    control: {
        selectScheduleItem: true,
        myScheduleListItem: true
    }, //control

    config: {
        storeAllItem: null
    },

    setStore : function(store) {
        this.setStoreAllItem(store);
    },

    getStore: function() {
        return this.getStoreAllItem();
    }



});
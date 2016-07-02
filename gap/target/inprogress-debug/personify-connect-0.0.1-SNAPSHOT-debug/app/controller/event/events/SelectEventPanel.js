Ext.define('Personify.controller.event.events.SelectEventPanel', {
    extend: 'Personify.base.Controller',
    control: {
        selectEventItem: true
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
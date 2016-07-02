Ext.define('Personify.controller.phone.event.events.SelectEventPanel', {
    extend: 'Personify.base.Controller',
    control: {
        selectEventItem: true,
        eventListItem: true
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
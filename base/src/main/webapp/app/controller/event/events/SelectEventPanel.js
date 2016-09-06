Ext.define('Personify.controller.event.events.SelectEventPanel', {
    extend: 'Personify.base.Controller',
    control: {
           selectEventItem: {
                scrollend: 'onScrollEnd' // To Handle scoll event
           }
           
    }, //control

    config: {
        storeAllItem: null
    },
           

    setStore : function(store) {
        this.setStoreAllItem(store);
    },

    getStore: function() {
        return this.getStoreAllItem();
    },
       
     /* 
        Event Performance Enhancements
        To Handle scoll event
      */
    onScrollEnd: function()
    {
           var me = this;
           me.getView().fireEvent('onGetUpcomingEvents');
    }
    
           
    });
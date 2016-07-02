Ext.define('Personify.controller.home.NextEvent',{
    extend: 'Personify.base.Controller',
    inject: ['personify', 'iCalendarStore'],
    config: {
        personify: null,
        iCalendarStore: null
    },
    control: {
    	viewMoreEvent: {
            tap: 'onViewMoreEventTap'
        },
        nextThreeEvent: {
            itemtap: 'onEventItemTapped'
        }
    },
    
    init: function(){
        this.checkIsLoadEventList();
    },
    
    checkIsLoadEventList: function(){
        var nextThreeEvent = this.getNextThreeEvent();
        var store = Ext.getStore('meetingListtingMain');
        if(store && !nextThreeEvent.isDestroyed){
            Ext.callback(function() {
                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                var eventListStore = storeManager.getEventListStore();
                var meetingStore = Ext.create(eventListStore);
                store.each(function(record){
                    meetingStore.add(record);
                });
                nextThreeEvent.getController().setStore(meetingStore);
                nextThreeEvent.getController().getThreeNextEvent();
                nextThreeEvent.refresh();
                nextThreeEvent.setGrouped(false);
            }, this, [], 1);
        }
    },
    
    onViewMoreEventTap: function() {
        var me = this;
        Ext.callback(function(){
            me.getView().fireEvent('onViewMoreEventTap');
        }, me, [], 1);
    },
    onEventItemTapped: function(dataView, index, target, record, event, eOpts) {
        this.getView().fireEvent('onEventItemTapped', record);
    },
    
    onUpdateEventList: function(calendarStore) {
        var nextThreeEvent = this.getNextThreeEvent();

        if (calendarStore && calendarStore.getCount() > 0) {
            nextThreeEvent.getController().setStore(calendarStore.first().EventListStore);
            nextThreeEvent.getController().getThreeNextEvent();
            nextThreeEvent.refresh();
            nextThreeEvent.setGrouped(false);
        } else {
            nextThreeEvent.getController().setStore(null);
        }
    }
});

Ext.define('Personify.controller.phone.event.EventList',{
    extend: 'Personify.controller.event.events.EventList',
    control: {
    },//control
    
    init: function() {
        this.callParent(arguments);
    },
    
    setStore: function(store) {
        this.callParent(arguments);
        this.getView().setStore(store);
        this.hidePastEvent(store);
    },
    
    hidePastEvent: function(store) {
        if(store && store.getCount() > 0) {
            var records = new Array();
            store.each(function(record){
                var current = new Date();
                var date = record.get('startDateTime');
                if(date.getFullYear() < current.getFullYear()){
                    records.push(record);
                }else{
                    if(date.getFullYear() == current.getFullYear() && date.getMonth() < current.getMonth()){
                         records.push(record);
                    }
                }
            });
            this.getView().hiddenRecord(records);
        }
    }
});
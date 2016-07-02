Ext.define('Personify.controller.schedule.ScheduleList',{
    extend: 'Personify.base.Controller',
    control: {
        
    },//control
    
    init: function(){
        
    },
    
    setStore: function(store){
        store.sort({
            sorterFn: function(record1, record2) {
                var startDateTime1 = record1.get('startDateTime');
                var startDateTime2 = record2.get('startDateTime');
                var date1 = startDateTime1;
                var date2 = startDateTime2;
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            },
            direction: 'ASC'
        });
        
        store.setGrouper(
            {groupFn: function(record) {
                var startDateTime = record.get('startDateTime');
                var month = Personify.utils.ItemUtil.getMonthEventView(startDateTime);
                var numMonth = Ext.Date.format(startDateTime,'m');
                var year = Personify.utils.ItemUtil.getYearEventView(startDateTime);
                return '<span style="color:transparent;display:none!important">'+year + "," + numMonth + '</span>' + month +' ' +year;
            }}
        );
        
        store.setRemoteFilter(false);
        
        var view = this.getView();
        
        if (view && !view.isDestroyed) {
            view.setStore(store);
        }
        
        this.hidePastEvent(store);
    },
    
    hidePastEvent : function(store) {
        if (store && store.getCount() > 0) {
            var records = new Array();
            
            store.each(function(record) {
                var current = new Date();
                var date = record.get('startDateTime');
                
                if (date.getFullYear() < current.getFullYear()) {
                    records.push(record);
                } else {
                    if (date.getFullYear() == current.getFullYear() && date.getMonth() < current.getMonth()) {
                        records.push(record);
                    }
                }
            });
            
            this.getView().hiddenRecord(records);
        }
    },
    
    showPastEvent : function(store) {
        if (store && store.getCount() > 0) {
            var records = new Array();
            
            store.each(function(record) {
                records.push(record);
            });
            
            this.getView().showRecord(records);
            this.getView().doRefreshHeaders();
        }
    }
});
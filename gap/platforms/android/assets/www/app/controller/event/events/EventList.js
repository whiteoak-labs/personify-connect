Ext.define('Personify.controller.event.events.EventList', {
    extend : 'Personify.base.Controller',
    control : {

    }, //control

    init : function() {

    },

    setStore : function(store) {
        if (!store) {
            this.getView().setStore(null);
            return;
        }

        store.sort({
            sorterFn : function(record1, record2) {
                var startDateTime1 = Personify.utils.ItemUtil.convertStringToDate(record1.get('startDateTimeString'));
                var startDateTime2 = Personify.utils.ItemUtil.convertStringToDate(record2.get('startDateTimeString'));
                var date1 = startDateTime1;
                var date2 = startDateTime2;
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            },
            direction : 'ASC'
        });

        store.setGrouper({
            groupFn : function(record) {
                var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                var month = Personify.utils.ItemUtil.getMonthEventView(startDateTime);
                var numMonth = Ext.Date.format(startDateTime, 'm');
                var year = Personify.utils.ItemUtil.getYearEventView(startDateTime);
                return '<span style="color:transparent;display:none!important">' + year + "," + numMonth + '</span>' + month + ' ' + year;
            }
        });

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
                var date = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
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

    getThreeNextEvent : function() {
        var store = this.getView().getStore();
        var currentDate = new Date();

        if (store) {
            store.each(function(record) {
                var endDate = Personify.utils.ItemUtil.convertStringToDate(record.get('endDateTimeString'));

                if (currentDate > endDate)
                    store.remove(record);
            });

            for (var i = store.getAllCount(); i > 2; i--)
                store.removeAt(i);
        }
    }
}); 
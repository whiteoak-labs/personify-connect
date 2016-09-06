Ext.define('Personify.store.offline.calendar.Event', {
    extend: 'Personify.store.base.calendar.Event',

    requires: ['Personify.model.jsonp.calendar.Event'],

    config: {
        model: 'Personify.model.jsonp.calendar.Event',
        grouper: {
            groupFn: function(record) {
                var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                var month = Personify.utils.ItemUtil.getMonthEventView(startDateTime);
                var numMonth = Ext.Date.format(startDateTime,'m');
                var year = Personify.utils.ItemUtil.getYearEventView(startDateTime);
                return '<span style="color:transparent;display:none!important">'+year + "," + numMonth + '</span>' + month +' ' +year;
           }
        }
    }
});
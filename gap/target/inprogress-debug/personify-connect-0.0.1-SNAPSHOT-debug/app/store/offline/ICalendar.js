Ext.define('Personify.store.offline.ICalendar', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.jsonp.ICalendar',
        'Personify.proxy.OfflineProxy'
    ],
    
    config: {
        model: 'Personify.model.jsonp.ICalendar',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventMeetings'),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'ICalMeetingList'
            }
        };

        this.setProxy(proxy);
    }
});

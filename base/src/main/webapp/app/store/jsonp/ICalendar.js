Ext.define('Personify.store.jsonp.ICalendar', {
    extend: 'Personify.store.base.ICalendar',
    requires: [
        'Personify.utils.ServiceManager',
        'Personify.model.jsonp.ICalendar',
        'Personify.proxy.RestService'
    ],
    
    config: {
        storeId: 'ICalMeetingList',
        model: 'Personify.model.jsonp.ICalendar',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventMeetings'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'ICalMeetingList'
            }
        };

        this.setProxy(proxy);
    }
});
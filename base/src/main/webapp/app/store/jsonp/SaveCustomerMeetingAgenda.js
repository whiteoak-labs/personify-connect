Ext.define('Personify.store.jsonp.SaveCustomerMeetingAgenda', {
    extend: 'Personify.store.base.SaveCustomerMeetingAgenda',
    requires: [
        'Personify.model.jsonp.CustomerMeetingAgenda',
        'Personify.proxy.RestService'
    ],
    config: {
        model: 'Personify.model.jsonp.CustomerMeetingAgenda',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },
    
    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventSaveMeetingAgenda'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
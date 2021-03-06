Ext.define('Personify.store.jsonp.AddNewCustomerMeetingAgenda', {
    extend: 'Personify.base.Store',
    requires: [
        'Personify.model.jsonp.CustomerMeetingAgenda'
    ],
    config: {
        model: 'Personify.model.jsonp.CustomerMeetingAgenda',
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var proxy = {
            type: 'ajax',
                method: 'GET',
                url: Personify.utils.ServiceManager.getUrlWS('eventGetEmptyMeetingAgenda'),
                headers: Personify.utils.ServiceManager.getHeaders(),
                reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
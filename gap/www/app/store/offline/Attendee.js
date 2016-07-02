Ext.define('Personify.store.offline.Attendee', {
    extend: 'Personify.store.base.Attendee',
    requires: [
        'Personify.model.jsonp.Attendee',
        'Personify.proxy.OfflineProxy'
    ],
    
    config: {
        model: 'Personify.model.jsonp.Attendee',
        haveData:false,
        grouper: {
           groupFn: function(record) {
               return record.get('lastName')[0];
           }
        },
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'offlineproxy',
            url: Personify.utils.ServiceManager.getUrlWS('eventRegistrants'),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'MeetingRegistrantsList'
            }
        };

        this.setProxy(proxy);
    }
});
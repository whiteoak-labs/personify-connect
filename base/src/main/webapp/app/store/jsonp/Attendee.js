Ext.define('Personify.store.jsonp.Attendee', {
    extend: 'Personify.store.base.Attendee',
    requires: [
        'Personify.model.jsonp.Attendee',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.Attendee',
        haveData:false,
        autoLoad: true,
        implicitIncludes: true,
        grouper: {
           groupFn: function(record) {
               return record.get('lastName')[0];
           },
           sorterFn: function(record1, record2) {
                var name1 = record1.get('lastName') + ' ' + record1.get('firstName');
                var name2 = record2.get('lastName') + ' ' + record2.get('firstName');

                return name1 > name2 ? 1 : (name1 == name2 ? 0 : -1);
           },
           direction: 'ASC'
        },
        listeners: {
            beforeload: 'onBeforeLoad'
        }
    },

    onBeforeLoad: function() {
        var data = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('eventRegistrants'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: data,
            reader: {
                type: 'json',
                rootProperty: 'MeetingRegistrantsList'
            }
        };

        this.setProxy(proxy);
    }
});
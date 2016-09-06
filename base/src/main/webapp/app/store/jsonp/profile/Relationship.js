Ext.define('Personify.store.jsonp.profile.Relationship', {
    extend: 'Personify.store.base.profile.Relationship',
    requires: [
        'Personify.model.jsonp.relationship.RelationshipManagement',
        'Personify.proxy.RestService'
    ],
    
    config: {
        model: 'Personify.model.jsonp.relationship.RelationshipManagement',
        autoLoad: true,
        listeners: {
            beforeload: 'onBeforeLoad'
        }

    },
    
    onBeforeLoad: function() {
        var dataRequest = this.getDataRequest();
        var proxy = {
            type: 'restservice',
            url: Personify.utils.ServiceManager.getUrlWS('profileRelationships'),
            headers: Personify.utils.ServiceManager.getHeaders(),
            jsonData: dataRequest,
            reader: {
                type: 'json'
            }
        };

        this.setProxy(proxy);
    }
});
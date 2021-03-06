Ext.define('Personify.model.jsonp.notification.MetaData', {
    extend: 'Personify.model.base.notification.MetaData',
    config: {
        belongsTo: 'Personify.model.jsonp.Notification',
        fields: [
            {name: 'uri', type: 'string', mapping: 'uri', allowNull: false},
            {name: 'type', type: 'string', mapping: 'type', allowNull: false}
        ]
    }
});
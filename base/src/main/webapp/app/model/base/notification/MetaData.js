Ext.define('Personify.model.base.notification.MetaData', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.Notification',
        fields: [
            {name: 'name', type: 'string'}
        ]
    }
});
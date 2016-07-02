Ext.define('Personify.model.base.notification.Author', {
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.notification.Entry',
        fields: [
            {name: 'name', type: 'string'}
        ]
    }
});
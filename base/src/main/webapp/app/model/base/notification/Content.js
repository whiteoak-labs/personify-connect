Ext.define('Personify.model.base.notification.Content',{
    extend: 'Personify.base.Model',
    config: {
        belongsTo: 'Personify.model.base.notification.Entry',
        fields: [
            {name: 'messageId', type: 'int'},
            {name: 'description', type: 'string'},
            {name: 'descriptionDetails', type: 'string'},
            {name: 'hyperLink', type: 'string'},
            {name: 'linkLabel', type: 'string'},
            {name: 'masterCustomerID', type: 'string'},
            {name: 'subCustomerID', type: 'int'},
            {name: 'startDate', type: 'string'}
        ]
    }
});
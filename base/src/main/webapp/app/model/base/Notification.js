Ext.define('Personify.model.base.Notification', {
    extend: 'Personify.base.Model',
    config:{
        fields: [
            {name: 'title', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'updated', type: 'string'},
            {name: 'link', type: 'string'},
            
            {name: 'messageId', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'descriptionDetails', type: 'string'},
            {name: 'hyperLink', type: 'string'},
            {name: 'linkLabel', type: 'string'},
            {name: 'masterCustomerID', type: 'string'},
            {name: 'subCustomerID', type: 'string'},
            {name: 'startDate', type: 'string'}
        ]/*,
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata'
            }
        ]*/
    }
});

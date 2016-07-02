Ext.define('Personify.model.jsonp.Notification', {
    extend: 'Personify.model.base.Notification',
    requires: 'Personify.model.jsonp.notification.MetaData',
    config:{
        fields: [
            {name: 'title', type: 'string'},
            {name: 'id', type: 'string'},
            {name: 'updated', type: 'string'},
            {name: 'link', type: 'string'},
            
            {name: 'messageId', type: 'int', mapping: 'MessageID', allowNull: false},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'descriptionDetails', type: 'string', mapping: 'DescriptionDetails', allowNull: false},
            {name: 'hyperLink', type: 'string', mapping: 'HyperLink', allowNull: false},
            {name: 'linkLabel', type: 'string', mapping: 'LinkLabel', allowNull: false},
            {name: 'masterCustomerID', type: 'string', mapping: 'MasterCustomerID', allowNull: false},
            {name: 'subCustomerID', type: 'string', mapping: 'SubCustomerID', allowNull: false},
            {name: 'startDate', type: 'string', mapping: 'StartDate', allowNull: false},
            {name: 'isRead', type: "boolean"}
        ],
        
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.jsonp.notification.MetaData' ,
                autoLoad: true,
                associationKey: '__metadata',
                name: '__metadata',
                storeName: 'MetaDataNotification',
                reader: {
                    type:'json',
                    rootProperty: '__metadata'
                }
            }
        ]
    }
});

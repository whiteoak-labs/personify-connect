Ext.define('Personify.model.base.contactlisting.Contact', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            
            {name: 'activityId', type: 'string'},
            {name: 'activityDate', type: 'string'},
            {name: 'activityText', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]
    }
})
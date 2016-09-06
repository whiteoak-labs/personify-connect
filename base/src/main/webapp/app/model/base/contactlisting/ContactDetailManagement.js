Ext.define('Personify.model.base.contactlisting.ContactDetailManagement', {
    extend: 'Personify.base.Model',
    
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'startIndex', type: 'string'},
            {name: 'pageSize', type: 'string'},
            {name: 'totalResults', type: 'string'}
        ]
    }
})
Ext.define('Personify.model.base.DirectoryManagement', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            
            {name: 'pageSize', type: 'string'},
            {name: 'totalResults', type: 'string'},
            {name: 'startIndex', type: 'string'}
            
        ]
    }
});
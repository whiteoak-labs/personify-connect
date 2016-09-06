Ext.define('Personify.model.base.Staff', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'staffId', type: 'string'},
            {name: 'staffName', type: 'string'}
            
            
        ]
    }
});
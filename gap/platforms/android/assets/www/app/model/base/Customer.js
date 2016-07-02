Ext.define('Personify.model.base.Customer', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'caption', type: 'string'},
            {name: 'value', type: 'string'},
            
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'entityKey', type: 'string'}
        ]/*,
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference',
                autoLoad: true,
                associationKey: 'customerPreferencesList',
                name: 'customerPreferencesList'
            }
        ]*/
    }
});
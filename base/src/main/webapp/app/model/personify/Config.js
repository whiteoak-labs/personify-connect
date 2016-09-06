Ext.define('Personify.model.personify.Config', {
    extend: 'Personify.base.Model',
    requires: 'Personify.model.personify.config.DefaultListingParams',
    
    config: {
        fields: [
            {name: 'currencySymbol', type: 'string'},
            {name: 'currency', type: 'string'},
            {name: 'itemPerPage', type: 'int'},
            {name: 'itemsPerPageProductList', type: 'int', defaultValue: '20'}
        ],
        associations: [
           {
               type: 'hasMany', 
               model: 'Personify.model.personify.config.DefaultListingParams',
               autoLoad: true,
               associationKey: 'defaultListingParams',
               name: 'DefaultListingParams'
           },
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Personify',
               autoLoad: true,
               associationKey: 'config',
               name: 'Config'
           }
       ]
    }
});

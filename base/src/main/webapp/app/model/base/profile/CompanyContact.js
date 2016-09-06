Ext.define('Personify.model.base.profile.CompanyContact', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'phone', type: 'string'},
            
            {name: 'companyContact', type: 'string'}
        ]
    }
});
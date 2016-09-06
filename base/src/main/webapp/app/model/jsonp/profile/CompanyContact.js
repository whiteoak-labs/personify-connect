Ext.define('Personify.model.jsonp.profile.CompanyContact', {
    extend: 'Personify.model.base.profile.CompanyContact',

    config: {
        fields: [
            {name: 'internalKey', type: 'string', mapping: 'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId', allowNull: false},
            {name: 'name', type: 'string', mapping: 'Name', allowNull: false},
            {name: 'email', type: 'string', mapping: 'Email', allowNull: false},
            {name: 'phone', type: 'string', mapping: 'Phone', allowNull: false},
            {name: 'companyContact', type: 'string', mapping: 'CompanyContact', allowNull: false}
        ],
        belongsTo: 'Personify.model.jsonp.profile.Entry'
    }
});
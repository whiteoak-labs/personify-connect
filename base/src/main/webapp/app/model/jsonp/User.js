Ext.define('Personify.model.jsonp.User', {
    extend: 'Personify.model.base.User',
    
    requires: [
        'Personify.proxy.RestService',
        'Personify.model.jsonp.user.Address',
        'Personify.model.jsonp.user.Role',
        'Personify.model.jsonp.user.Email',
        'Personify.model.jsonp.user.Name'
    ],
    
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping:'InternalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey', allowNull: false},
            {name: 'isValidUser', type: 'boolean', mapping:'IsValidUser', allowNull: false}, // TODO: not in JSON response
            {name: 'fullUserKey', type: 'string', mapping:'UserKey', allowNull: false},
            {name: 'userKey', type: 'string',   // mapping:'UserKey', allowNull: false},
                convert: function(value, record) {
                    return record.data.fullUserKey ? record.data.fullUserKey : record.data.masterCustomerId;
                }
            },
            {name: 'organizationId', type: 'string', mapping:'OrganizationId', allowNull: false, defaultValue: 'NASE'},
            {name: 'organizationUnitId', type: 'string', mapping:'OrganizationUnitId', allowNull: false, defaultValue: 'NASE'},
            {name: 'jobTitle', type: 'string', mapping:'JobTitle', allowNull: false},
            {name: 'modOper', type: 'string', mapping:'ModOper', allowNull: false},
            {name: 'id', type: 'string', mapping:'Id', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping:'MasterCustomerId', allowNull: false, defaultValue: ''},
            {name: 'subCustomerId', type: 'string', mapping:'SubCustomerId', allowNull: false, defaultValue: '0'},
            {name: 'encrMasterCustomerId', type: 'string', mapping:'EncrMasterCustomerId', allowNull: false},
            {name: 'encrSubCustomerId', type: 'string', mapping:'EncrSubCustomerId', allowNull: false},
            {name: 'displayName', type: 'string', mapping:'DisplayName'},
            {name: 'preferredCurrency', type: 'string', allowNull: false},
            {name: 'cCType', type: 'string', mapping:'CCType', allowNull: false},
            {name: 'cCNumber', type: 'string', mapping:'CCNumber', allowNull: false},
            {name: 'entryReference', type: 'string', mapping:'EntryReference', allowNull: false}
            ],
        associations: [
            {type:'hasMany', model: 'Personify.model.jsonp.user.Address', storeName: 'userAddress', name: 'ProfileAddresses', associationKey: 'ProfileAddresses', reader: {type: 'json', rootProperty: 'ProfileAddresses'}},
            {type:'hasMany', model: 'Personify.model.jsonp.user.Role', storeName: 'userRole', name: 'ProfileRoles', associationKey: 'ProfileRoles', reader: {type: 'json', rootProperty: 'ProfileRoles'}},
            {type:'hasMany', model: 'Personify.model.jsonp.user.Email', storeName: 'userEmail', name: 'ProfileEmails', associationKey: 'ProfileEmails', reader: {type: 'json', rootProperty: 'ProfileEmails'}},
            {type:'hasMany', model: 'Personify.model.jsonp.user.Name', storeName: 'userName', name: 'ProfileName', associationKey: 'ProfileName', reader: {type: 'json', rootProperty: 'ProfileName'}}
        ]
    }
});

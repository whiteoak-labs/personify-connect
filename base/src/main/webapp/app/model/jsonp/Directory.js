Ext.define('Personify.model.jsonp.Directory', {
    extend: 'Personify.model.base.Directory',
    requires: [],
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            
            {name: 'address', type: 'string', mapping: 'Address', allowNull: false},
            {name: 'employerName', type: 'string', mapping: 'EmployerName', allowNull: false},
            {name: 'firstName', type: 'string', mapping: 'FirstName', allowNull: false},
            {name: 'imageURL', type: 'string', mapping: 'ImageURL', allowNull: false},
            {name: 'isMember', type: 'boolean', mapping: 'IsMember', allowNull: false},
            {name: 'lastName', type: 'string', mapping: 'LastName', allowNull: false},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerID', allowNull: false},
            {name: 'preferredName', type: 'string', mapping: 'PreferredName', allowNull: false},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerID', allowNull: false},
            {name: 'type', type: 'string', mapping: 'Type'},
            
            {name: 'employeeResultsList', type: 'string', mapping: 'EmployeeResultsList'},
            {name: 'meetingRegistrantsList', type: 'string', mapping: 'MeetingRegistrantsList'},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'}
        ],
        associations: [
            { 
                type: 'hasOne', 
                model: 'Personify.model.base.Reference' ,
                autoLoad: true,
                associationKey: 'DirectoryResultsList',
                name: 'DirectoryResultsList'
            }
        ]
    }
});
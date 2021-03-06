Ext.define('Personify.model.base.Attendee', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'recordId', type: 'string'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'address', type: 'string'},
            {name: 'employerName', type: 'string'},
            {name: 'firstName', type: 'string'},
            {name: 'imageURL', type: 'string'},
            {name: 'isMember', type: 'string'},
            {name: 'lastName', type: 'string'},
            {name: 'masterCustomerID', type: 'string'},
            {name: 'preferredName', type: 'string'},
            {name: 'subCustomerID', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'directoryResultsList', type: 'string'},
            {name: 'employeeResultsList', type: 'string'}
        ]
    }
});
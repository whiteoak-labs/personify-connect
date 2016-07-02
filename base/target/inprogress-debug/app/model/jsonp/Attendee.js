Ext.define('Personify.model.jsonp.Attendee', {
    extend: 'Personify.model.base.Attendee',
    requires: ['Personify.model.jsonp.Reference'],
    config: {
        fields: [
            {name: 'recordId', type: 'string',mapping: '$id'},
            {name: 'internalKey', type: 'string',mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string',mapping: 'NavigationKey'},
            {name: 'address', type: 'string',mapping: 'Address'},
            {name: 'employerName', type: 'string',mapping: 'EmployerName'},
            {name: 'firstName', type: 'string',mapping: 'FirstName'},
            {name: 'imageURL', type: 'string',mapping: 'ImageURL'},
            {name: 'isMember', type: 'string',mapping: 'IsMember'},
            {name: 'lastName', type: 'string',mapping: 'LastName'},
            {name: 'masterCustomerID', type: 'string',mapping: 'MasterCustomerID'},
            {name: 'preferredName', type: 'string',mapping: 'PreferredName'},
            {name: 'subCustomerID', type: 'string',mapping: 'SubCustomerID'},
            {name: 'type', type: 'string',mapping: 'Type'},
            {name: 'directoryResultsList', type: 'string',mapping: 'DirectoryResultsList'},
            {name: 'employeeResultsList', type: 'string',mapping: 'EmployeeResultsList'}
        ],
        associations: {
            type: 'hasOne',
            model: 'Personify.model.jsonp.Reference',
            autoLoad: true,
            associationKey: 'MeetingRegistrantsList',
            name: 'MeetingRegistrantsList'
        }
    }
});
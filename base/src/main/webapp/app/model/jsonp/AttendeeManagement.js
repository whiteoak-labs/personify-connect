Ext.define('Personify.model.jsonp.AttendeeManagement', {
    extend: 'Personify.model.base.AttendeeManagement',
    config: {
        fields: [
            {name: 'recordId', type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', type: 'string', mapping: 'InternalKey'},
            {name: 'navigationKey', type: 'string', mapping: 'NavigationKey'},
            {name: 'pageSize', type: 'string', mapping: 'PageSize'},
            {name: 'totalResults', type: 'string', mapping: 'TotalResults'},
            {name: 'startIndex', type: 'string', mapping: 'StartIndex'}
        ],
        associations: [
            {
                type: 'hasMany',
                model: 'Personify.model.jsonp.Attendee',
                associationKey: 'MeetingRegistrantsList',
                name: 'MeetingRegistrantsList',
                storeName: 'AttendeeStore',
                reader: {
                    type: 'json',
                    rootProperty: 'MeetingRegistrantsList'
                }
            }
        ]
    }
});
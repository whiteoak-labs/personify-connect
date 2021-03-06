Ext.define('Personify.model.jsonp.CustomerMeetingAgenda', {
    extend: 'Personify.base.Model',
    config: {
        useCache: false,
        fields: [
            {name: 'entityGUID', type: 'string', mapping: 'EntityGUID'},
            {name: 'appointmentId', type: 'string', mapping: 'AppointmentId'},
            {name: 'organizationId', type: 'string', mapping: 'OrganizationId'},
            {name: 'organizationUnitId', type: 'string', mapping: 'OrganizationUnitId'},
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId'},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId'},
            {name: 'addedBy', type: 'string', mapping: 'AddedBy'},
            {name: 'changedBy', type: 'string', mapping: 'ChangedBy'},
            {name: 'addedOn', type: 'string', mapping: 'AddedOn'},
            {name: 'appointmentDescription', type: 'string', mapping: 'AppointmentDescription'},
            {name: 'description', type: 'string', mapping: 'AppointmentDescription'},
            {name: 'appointmentEndDateTime', type: 'string', mapping: 'AppointmentEndDateTime'},
            {name: 'endDateTime', type: 'string', mapping: 'AppointmentEndDateTime',convert: function(value) {
                var d = null;
                if (value) {
                    return Ext.Date.parse(value, "c");
                }
                return d;
            }},
            {name: 'appointmentStartDateTime', type: 'string', mapping: 'AppointmentStartDateTime'},
            {name: 'startDateTime', type: 'string', mapping: 'AppointmentStartDateTime',convert: function(value) {
                var d = null;
                if (value) {
                    return Ext.Date.parse(value, "c");
                }
                return d;
            }},
            {name: 'appointmentTitle', type: 'string', mapping: 'AppointmentTitle'},
            {name: 'title', type: 'string', mapping: 'AppointmentTitle'},
            {name: 'appointmentTypeCodeString', type: 'string', mapping: 'AppointmentTypeCodeString'},
            {name: 'type', type: 'string', mapping: 'AppointmentTypeCodeString'},
            {name: 'availableToOrders', type: 'boolean', mapping: 'AvailableToOrders'},
            {name: 'changedOn', type: 'string', mapping: 'ChangedOn'},
            {name: 'concurrencyId', type: 'string', mapping: 'ConcurrencyId'},
            {name: 'meetingParentProductCode', type: 'string', mapping: 'MeetingParentProductCode'},
            {name: 'meetingProductCode', type: 'string', mapping: 'MeetingProductCode'},
            {name: 'meetingProductId', type: 'string', mapping: 'MeetingProductId'},
            {name: 'sessionFee', type: 'float', mapping: 'SessionFee'},
            {name: 'sessionLocation', type: 'string', mapping: 'SessionLocation'},
            {name: 'location', type: 'string', mapping: 'SessionLocation'},
            {name: 'sessionParentProductCode', type: 'string', mapping: 'SessionParentProductCode'},
            {name: 'sessionProductCode', type: 'string', mapping: 'SessionProductCode'},
            {name: 'sessionProductId', type: 'string', mapping: 'SessionProductId'},
            {name: 'sessionTrackCode', type: 'string', mapping: 'SessionTrackCode'},
            {name: 'sessionTypeCode', type: 'string', mapping: 'SessionTypeCode'},
            {name: 'speakerName', type: 'string', mapping: 'SpeakerName'}
            
        ]
    }
});
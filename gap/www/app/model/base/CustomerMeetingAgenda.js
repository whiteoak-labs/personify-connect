Ext.define('Personify.model.base.CustomerMeetingAgenda', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'entityGUID', type: 'string'},
            {name: 'appointmentId', type: 'string'},
            {name: 'organizationId', type: 'string'},
            {name: 'organizationUnitId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'addedBy', type: 'string'},
            {name: 'changedBy', type: 'string'},
            {name: 'addedOn', type: 'string'},
            {name: 'appointmentDescription', type: 'string'},
            {name: 'appointmentEndDateTime', type: 'string'},
            {name: 'appointmentStartDateTime', type: 'string'},
            {name: 'appointmentTitle', type: 'string'},
            {name: 'appointmentTypeCodeString', type: 'string'},
            {name: 'availableToOrders', type: 'boolean'},
            {name: 'changedOn', type: 'string'},
            {name: 'concurrencyId', type: 'string'},
            {name: 'meetingParentProductCode', type: 'string'},
            {name: 'meetingProductCode', type: 'string'},
            {name: 'meetingProductId', type: 'string'},
            {name: 'sessionFee', type: 'float'},
            {name: 'sessionLocation', type: 'string'},
            {name: 'sessionParentProductCode', type: 'string'},
            {name: 'sessionProductCode', type: 'string'},
            {name: 'sessionProductId', type: 'string'},
            {name: 'sessionTrackCode', type: 'string'},
            {name: 'sessionTypeCode', type: 'string'},
            {name: 'speakerName', type: 'string'}
        ]
    }
});
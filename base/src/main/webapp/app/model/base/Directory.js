Ext.define('Personify.model.base.Directory', {
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
            {name: 'isMember', type: 'boolean'},
            {name: 'lastName', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'preferredName', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'type', type: 'string'},
            {name: 'entityKey', type: 'string'},
            {name: 'employeeResultsList', type: 'string'},
            {name: 'meetingRegistrantsList', type: 'string'},
            'details'
        ]
        
//        associations: [
//            { 
//                type: 'hasOne', 
//                model: 'Personify.model.base.Reference' ,
//                autoLoad: true,
//                associationKey: 'directoryResultsList',
//                name: 'directoryResultsList'
//            }
//        ]
    }
});
Ext.define('Personify.model.base.CustomerBiography', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'entityGUID', type: 'string'},
            {name: 'customerBiographyId', type: 'string'},
            {name: 'addedBy', type: 'string'},
            {name: 'changedBy', type: 'string'},
            
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'biographyText', type: 'string'}
        ],
        associations: [
//            { 
//                type: 'hasOne', 
//                model: 'Personify.model.base.notification.MetaData' ,
//                autoLoad: true,
//                associationKey: '__metadata',
//                name: '__metadata'
//            }
        ]
    }
});
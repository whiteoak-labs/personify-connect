Ext.define('Personify.model.jsonp.CustomerBiography', {
    extend: 'Personify.model.base.CustomerBiography',
    config: {
        fields: [
            {name: 'entityGUID', type: 'string', mapping: 'EntityGUID'},
            {name: 'customerBiographyId', type: 'string', mapping: 'CustomerBiographyId'},
            {name: 'addedBy', type: 'string', mapping: 'AddedBy'},
            {name: 'changedBy', type: 'string', mapping: 'ChangedBy'},
            
            {name: 'masterCustomerId', type: 'string', mapping: 'MasterCustomerId'},
            {name: 'subCustomerId', type: 'string', mapping: 'SubCustomerId'},
            {name: 'biographyText', type: 'string', mapping: 'BiographyText'}
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
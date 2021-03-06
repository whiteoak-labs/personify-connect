Ext.define('Personify.model.base.Participation', {
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'membershipList', type: 'string'}
        ],
        associations: [
            {
                type: 'hasMany', 
                model: 'Personify.model.base.participation.Committee' ,
                autoLoad: true,
                associationKey: 'committeeList',
                name: 'committeeList'
            },
            {
                type: 'hasMany', 
                model: 'Personify.model.base.participation.Committee' ,
                autoLoad: true,
                associationKey: 'pastCommitteeList',
                name: 'pastCommitteeList'
            }
        ]
    }
});
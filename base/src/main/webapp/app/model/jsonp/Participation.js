Ext.define('Personify.model.jsonp.Participation', {
    extend: 'Personify.model.base.Participation',
    requires: ['Personify.proxy.RestService','Personify.model.jsonp.participation.Committee'],
    config: {
        fields: [
            {name: 'membershipList', type: 'string', mapping: 'MembershipList', allowNull: false}
        ],
        associations: [
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.participation.Committee' ,
                autoLoad: true,
                associationKey: 'CommitteeList',
                name: 'CommitteeList',
                storeName: 'CommitteeParticipation',
                reader: {
                    type:'json',
                    rootProperty: 'CommitteeList'
                }
            },
            { 
                type: 'hasMany', 
                model: 'Personify.model.jsonp.participation.Committee' ,
                autoLoad: true,
                associationKey: 'PastCommitteeList',
                name: 'PastCommitteeList',
                storeName: 'PastCommitteeParticipation',
                reader: {
                    type:'json',
                    rootProperty: 'PastCommitteeList'
                }
            }
        ]
    }
});
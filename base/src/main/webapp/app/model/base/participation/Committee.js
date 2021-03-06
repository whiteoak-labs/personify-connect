Ext.define('Personify.model.base.participation.Committee', {
    extend: 'Personify.base.Model',
    
    config: {
        belongsTo: 'Personify.model.base.Participation',
        fields: [
            {name: 'committeeMcid', type: 'string'},
            {name: 'committeeName', type: 'string'},
            {name: 'committeeScid', type: 'string'},
            {name: 'position', type: 'string'},
            {name: 'startDate', type: 'string'},
            {name: 'endDate', type: 'string'},
            {name: 'votingStatus', type: 'string'},
            {name: 'committeeListReference', type: 'string'},
            {name: 'pastCommitteeListReference', type: 'string'}
        ]
    }
});
Ext.define('Personify.model.jsonp.participation.Committee', {
    extend: 'Personify.model.base.participation.Committee',
    config: {
        belongsTo: 'Personify.model.jsonp.Participation',
        fields: [
            {name: 'recordId', type: 'string', mapping:'$id', allowNull: false},
            {name: 'interNalKey', type: 'string', mapping:'InterNalKey', allowNull: false},
            {name: 'navigationKey', type: 'string', mapping:'NavigationKey', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey', allowNull: false},
            {name: 'committeeMcid', type: 'string', mapping: 'CommitteeMcid', allowNull: false},
            {name: 'committeeName', type: 'string', mapping: 'CommitteeName', allowNull: false},
            {name: 'committeeScid', type: 'string', mapping: 'CommitteeScid', allowNull: false},
            {name: 'position', type: 'string', mapping: 'Position', allowNull: false},
            {name: 'startDate', type: 'datetime', mapping: 'StartDate', allowNull: false, convert: function(value) {
                var d = null;
                if (value) {
                    var bits = value.split(/[-T:]/g);
                    d = new Date(bits[0], bits[1]-1, bits[2]);
                    d.setHours(bits[3], bits[4], bits[5]);
                }
                return d;
            }},
            {name: 'endDate', type: 'datetime', mapping: 'EndDate', allowNull: false, convert: function(value) {
                var d = null;
                if (value) {
                    var bits = value.split(/[-T:]/g);
                    d = new Date(bits[0], bits[1]-1, bits[2]);
                    d.setHours(bits[3], bits[4], bits[5]);
                }
                return d;
            }},
            {name: 'votingStatus', type: 'string', mapping: 'VotingStatus', allowNull: false},
            {name: 'committeeListReference', type: 'string', mapping: 'CommitteeListReference', allowNull: false},
            {name: 'pastCommitteeListReference', type: 'string', mapping: 'PastCommitteeList', allowNull: false}
        ]
    }
});
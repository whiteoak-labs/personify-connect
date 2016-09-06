Ext.define('Personify.model.jsonp.Agenda', {
    extend: 'Personify.model.base.Agenda',
    requires: ['Personify.model.jsonp.Reference'],
    config: {
        fields: [
            {name: 'recordId',type: 'string', mapping: '$id', allowNull: false},
            {name: 'internalKey', mapping: 'InternalKey'},
            {name: 'navigationKey', mapping: 'NavigationKey'},
            {name: 'description', type: 'string', mapping: 'Description', allowNull: false},
            {name: 'appointmentId', type: 'string', mapping: 'ID', allowNull: false},
            {name: 'endDateTimeString', type: 'string', mapping: 'EndDate', allowNull: false},
            {name: 'endDateTime', type: 'date', mapping: 'EndDate', allowNull: false, convert: function(value) {
                var d = null;
                if (value) {
                    var bits = value.split(/[-T:]/g);
                    d = new Date(bits[0], bits[1]-1, bits[2]);
                    d.setHours(bits[3], bits[4], bits[5]);
                }
                return d;
            }},
            {name: 'location', type: 'string', mapping: 'Location', allowNull: false, convert: function(location){
                if(location){
                    var localtionText = location.split('\\').join('');
                    return localtionText.split(' ,').join(',').replace(',', ' ');
                }else{
                    return '';
                } 
            }},
            {name: 'locationDescription', type: 'string', mapping: 'LocationDescription', allowNull: false},
            {name: 'sessionID', type: 'string', mapping: 'SessionID'},
            {name: 'type', type: 'string', mapping: 'Type', allowNull: false},
            {name: 'startDateTimeString', type: 'string', mapping: 'StartDate', allowNull: false},
            {name: 'startDateTime', type: 'date', mapping: 'StartDate', allowNull: false, convert: function(value) {
                var d = null;
                if (value) {
                    var bits = value.split(/[-T:]/g);
                    d = new Date(bits[0], bits[1]-1, bits[2]);
                    d.setHours(bits[3], bits[4], bits[5]);
                }
                return d;
            }},
            {name: 'speakerName', type: 'string', mapping: 'SpeakerName', allowNull: false},
            {name: 'title', type: 'string', mapping: 'Title', allowNull: false},
            {name: 'meetingId', type: 'string', mapping: 'MeetingId', allowNull: false},
            {name: 'entityKey', type: 'string', mapping: 'EntityKey'},
            {name: 'timeZoneCode', type: 'string'}
        ],
        associations: {
            type: 'hasOne',
            model: 'Personify.model.jsonp.Reference',
            autoLoad: true,
            associationKey: 'AgendaList',
            name: 'AgendaList'
        }
    }
});
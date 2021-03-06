Ext.define('Personify.model.jsonp.calendar.eventList.SponsorImageList', {
    extend: 'Personify.model.jsonp.calendar.eventList.SponsorList',
    config: {
        fields: [
            {name: 'tabletImageURL', type: 'string'},
            {name: 'phoneImageURL', type: 'string'},
            {name: 'redirectURL', type: 'string'},
            {name: 'sponsorName', type: 'string', mapping: 'sponsorName'}
        ]
    }
});
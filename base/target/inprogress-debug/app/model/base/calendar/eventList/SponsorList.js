Ext.define('Personify.model.base.calendar.eventList.SponsorList', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            {name: 'recordId', type: 'int'},
            {name: 'internalKey', type: 'string'},
            {name: 'navigationKey', type: 'string'},
            {name: 'masterCustomerId', type: 'string'},
            {name: 'subCustomerId', type: 'string'},
            {name: 'sponsorName', type: 'string'},
            {name: 'imageURL', type: 'string'}
        ]
    }
});
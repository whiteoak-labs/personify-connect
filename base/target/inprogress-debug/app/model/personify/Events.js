Ext.define('Personify.model.personify.Events', {
    extend: 'Personify.base.Model',

    config: {
        fields: [
            { name: 'mobileRegistration', type: 'boolean', defaultValue: true },
            { name: 'types' },
            { name: 'mapData' },
            { name: 'conferenceImageWidth', type: 'int', defaultValue: 150 },
            { name: 'conferenceImageHeight', type: 'int', defaultValue: 50 },
            { name: 'rateTitleBar', type: 'string'},
            { name: 'featuredEvents' },
            { name: 'featuredEventsRotation', type: 'int', defaultValue: '15' },
            { name: 'sponsorEvents' },
            { name: 'sponsorRotation', type: 'int', defaultValue: '15' }
        ],
        associations: [
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Personify',
               autoLoad: true,
               associationKey: 'events',
               name: 'Events'
           }
       ]
    }
});
